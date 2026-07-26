window.storeUploadModule = {
    currentUser: null,
    userStore: null,
    productImages: [null, null, null],
    paymentInProgress: false, // Track if payment is in progress

    init() {
        window.firebaseApp.auth.onAuthStateChanged(async user => {
            if (!user) { window.location.href = 'auth.html'; return; }
            this.currentUser = user;
            const userDoc = await window.firebaseApp.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) this.userStore = userDoc.data();
        });

        document.getElementById('storeUploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add listeners for URL inputs
        [1, 2, 3].forEach(i => {
            const urlInput = document.getElementById(`url${i}`);
            if (urlInput) {
                urlInput.addEventListener('input', (e) => {
                    this.handleUrl(i, e.target.value);
                });
            }
            const fileInput = document.getElementById(`file${i}`);
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    this.handleFile(i, e);
                });
            }
        });

        // Add listeners for Price and Discount
        const priceInput = document.getElementById('itemPrice');
        const discountInput = document.getElementById('itemDiscount');
        const currencyInput = document.getElementById('itemCurrency');
        
        if (priceInput) priceInput.addEventListener('input', () => this.calculateDiscount());
        if (discountInput) discountInput.addEventListener('input', () => this.calculateDiscount());
        if (currencyInput) currencyInput.addEventListener('change', () => this.calculateDiscount());
    },

    calculateDiscount() {
        const priceInput = document.getElementById('itemPrice');
        const discountInput = document.getElementById('itemDiscount');
        const previewDiv = document.getElementById('discountPreview');
        
        if (!priceInput || !discountInput || !previewDiv) return;

        const price = parseFloat(priceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        
        const currency = document.getElementById('itemCurrency').value || 'NGN';
        const currencySymbols = {
            'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦'
        };
        const symbol = currencySymbols[currency] || '₦';
        
        if (price > 0) {
            previewDiv.classList.remove('hidden');
            if (discount > 0) {
                const discountAmount = (price * discount) / 100;
                const finalPrice = price - discountAmount;
                previewDiv.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original</span>
                        <span class="text-xs font-bold text-slate-400 line-through">${symbol}${price.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount (${discount}%)</span>
                        <span class="text-xs font-bold text-red-500">-${symbol}${discountAmount.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-slate-200">
                        <span class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Final Price</span>
                        <span class="text-lg font-black text-[#f68b1e]">${symbol}${finalPrice.toLocaleString()}</span>
                    </div>
                `;
            } else {
                previewDiv.innerHTML = `
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Total Price</span>
                        <span class="text-lg font-black text-[#f68b1e]">${symbol}${price.toLocaleString()}</span>
                    </div>
                `;
            }
        } else {
            previewDiv.classList.add('hidden');
        }
    },

    updatePreview(index, src) {
        const preview = document.getElementById(`preview${index}`);
        if (!preview) return;
        if (src) {
            preview.innerHTML = `<img src="${src}" class="w-full h-full object-cover">`;
        } else {
            preview.innerHTML = `<span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Image ${index}</span>`;
        }
    },

    handleUrl(index, url) {
        this.productImages[index-1] = url.trim() || null;
        this.updatePreview(index, this.productImages[index-1]);
    },

    handleFile(index, event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            this.productImages[index-1] = e.target.result;
            this.updatePreview(index, e.target.result);
        };
        reader.readAsDataURL(file);
    },

    async handleSubmit() {
        const title = document.getElementById('itemTitle').value;
        const price = parseFloat(document.getElementById('itemPrice').value);
        const discountPercentage = parseFloat(document.getElementById('itemDiscount').value) || 0;
        const validImages = this.productImages.filter(img => img !== null);

        if (!title || isNaN(price) || validImages.length === 0) { 
            alert("Please fill all required fields and add at least one image!"); 
            return; 
        }

        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing...";
        }

        const finalPrice = price - (price * discountPercentage / 100);
        const tx_ref = "STORE-" + Date.now() + "-" + this.currentUser.uid;

        const productData = {
            title: title,
            description: document.getElementById('itemDescription').value,
            price: finalPrice,
            originalPrice: price,
            discountPercentage: discountPercentage,
            currency: document.getElementById('itemCurrency').value,
            category: document.getElementById('itemCategory').value,
            imageUrl: validImages[0],
            images: validImages,
            ownerId: this.currentUser.uid,
            storeId: this.currentUser.uid,
            storeName: this.userStore ? this.userStore.storeName : "My Store",
            storeSlug: this.userStore ? this.userStore.storeSlug : "",
            createdAt: Date.now(),
            isLive: false,
            paymentStatus: 'pending',
            uploadSource: 'store',
            tx_ref: tx_ref
        };

        try {
            const docRef = await window.firebaseApp.db.collection('listings').add(productData);
            productData.id = docRef.id;
            this.payWithFlutterwave(100, productData);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong. Please try again.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Kindly Pay";
            }
        }
    },

    payWithFlutterwave(amount, productData) {
        this.paymentInProgress = true;
        
        FlutterwaveCheckout({
            public_key: "FLWPUBK-25a0431a9d73a1d16113134a9c627276-X",
            tx_ref: productData.tx_ref,
            amount: amount,
            currency: "NGN",
            customer: {
                email: this.currentUser.email,
                name: this.currentUser.displayName || "Store Owner",
            },
            callback: async (data) => {
                console.log("Flutterwave callback data:", data);
                
                const flutterwaveStatus = data.status ? data.status.toLowerCase().trim() : '';
                const possibleSuccessStatuses = ['successful', 'success', 'completed'];
                const isSuccessful = possibleSuccessStatuses.includes(flutterwaveStatus);

                if (isSuccessful) {
                    // CRITICAL: Set this to false immediately to prevent onclose race condition
                    this.paymentInProgress = false;
                    
                    try {
                        // Sanitize data for Firestore (remove undefined values)
                        const sanitizedData = JSON.parse(JSON.stringify(data));

                        // 1. Mark listing as live
                        await window.firebaseApp.db.collection('listings').doc(productData.id).update({
                            isLive: true,
                            paymentStatus: 'successful',
                            paymentDetails: sanitizedData,
                            paymentCompletedAt: Date.now()
                        });

                        // 2. Increment totalProducts count
                        if (productData.ownerId) {
                            const userRef = window.firebaseApp.db.collection("users").doc(productData.ownerId);
                            // Use window.firebase to ensure it's available
                            const increment = (window.firebase && window.firebase.firestore) 
                                ? window.firebase.firestore.FieldValue.increment(1)
                                : 1;
                                
                            await userRef.update({
                                totalProducts: increment,
                            });
                        }

                        alert("✅ Payment Successful! Your product is now live.");
                        window.location.href = 'store-profile.html';
                    } catch (firebaseError) {
                        console.error("Firebase update error after successful payment:", firebaseError);
                        alert(`Payment was successful, but there was an error updating your product. Please contact support if it doesn't appear soon.`);
                        window.location.href = 'store-profile.html';
                    }
                } else {
                    this.paymentInProgress = false;
                    console.warn("Payment failed or was cancelled by Flutterwave:", data);
                    
                    try {
                        await window.firebaseApp.db.collection('listings').doc(productData.id).update({
                            paymentStatus: 'failed',
                            isLive: false
                        });
                    } catch (firebaseError) {
                        console.error("Firebase update error after failed payment:", firebaseError);
                    }
                    
                    alert(`Payment failed or cancelled. Status: ${data.status || 'unknown'}. Please try again.`);
                    location.reload();
                }
            },
            onclose: async () => {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Kindly Pay";
                }
                
                // Only mark as failed if payment wasn't successful (paymentInProgress still true)
                if (this.paymentInProgress) {
                    console.log("Payment modal closed without completion.");
                    this.paymentInProgress = false;
                    
                    try {
                        await window.firebaseApp.db.collection('listings').doc(productData.id).update({
                            paymentStatus: 'cancelled',
                            isLive: false
                        });
                    } catch (firebaseError) {
                        console.error("Firebase update error after payment close:", firebaseError);
                    }
                    
                    alert("Payment was cancelled. Your product was not posted.");
                }
            }
        });
    }
};
document.addEventListener('DOMContentLoaded', () => window.storeUploadModule.init());
