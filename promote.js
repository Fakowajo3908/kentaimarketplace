window.promoteModule = {
    selectedPlanType: null,
    selectedPlanAmountNGN: null,
    selectedPlanDurationDays: null,
    currentUser: null,
    productImages: [null, null, null],
    currentSliderIndex: 0,
    paymentInProgress: false, // Track if payment is in progress

    init() {
        window.firebaseApp.auth.onAuthStateChanged(async user => {
            if (!user) { window.location.href = 'auth.html'; return; }
            this.currentUser = user;
            
            // Fetch and display user points
            try {
                const userDoc = await window.firebaseApp.db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const points = userData.points || 0;
                    const pointsDisplay = document.getElementById('userPoints');
                    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
            }
        });
    },

    handleHeaderBack() {
        if (document.getElementById('detailStep').classList.contains('hidden')) {
            window.location.href = 'index.html';
        } else {
            this.goBackToPlans();
        }
    },

    selectPlan(type, amountNGN, durationDays) {
        this.selectedPlanType = type;
        this.selectedPlanAmountNGN = amountNGN;
        this.selectedPlanDurationDays = durationDays;
        document.getElementById('planStep').classList.add('hidden');
        document.getElementById('detailStep').classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    goBackToPlans() {
        document.getElementById('detailStep').classList.add('hidden');
        document.getElementById('planStep').classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    calculateDiscount() {
        const priceInput = document.getElementById('productPrice');
        const discountInput = document.getElementById('productDiscount');
        const previewDiv = document.getElementById('discountPreview');
        
        if (!priceInput || !discountInput || !previewDiv) return;

        const price = parseFloat(priceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        
        const currency = document.getElementById('productCurrency').value || 'NGN';
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
                    <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-bold text-slate-500 uppercase">Original Price</span>
                            <span class="text-sm font-bold text-slate-400 line-through">${symbol}${price.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-bold text-slate-500 uppercase">Discount (${discount}%)</span>
                            <span class="text-sm font-bold text-red-500">-${symbol}${discountAmount.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center pt-1 border-t border-slate-200">
                            <span class="text-xs font-black text-slate-900 uppercase">Final Price</span>
                            <span class="text-lg font-black text-[#f68b1e]">${symbol}${finalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                `;
            } else {
                previewDiv.innerHTML = `
                    <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                        <span class="text-xs font-black text-slate-900 uppercase">Total Price</span>
                        <span class="text-lg font-black text-[#f68b1e]">${symbol}${price.toLocaleString()}</span>
                    </div>
                `;
            }
        } else {
            previewDiv.classList.add('hidden');
        }
    },

    moveSlider(direction) {
        const validImages = this.productImages.filter(img => img !== null);
        if (validImages.length <= 1) return;
        
        this.currentSliderIndex = (this.currentSliderIndex + direction + validImages.length) % validImages.length;
        const slider = document.getElementById('imageSlider');
        if (slider) slider.style.transform = `translateX(-${this.currentSliderIndex * 100}%)`;
    },

    handleUrl(index, url) { 
        this.productImages[index-1] = url.trim() || null; 
        this.updateSlider(); 
    },

    handleFile(index, event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => { 
            this.productImages[index-1] = e.target.result; 
            this.updateSlider(); 
        };
        reader.readAsDataURL(file);
    },

    updateSlider() {
        const slider = document.getElementById('imageSlider');
        if (!slider) return;
        const validImages = this.productImages.filter(img => img !== null);
        if (validImages.length === 0) {
            slider.innerHTML = '<div class="min-w-full h-full flex items-center justify-center text-slate-300 font-black text-[10px] sm:text-xs uppercase tracking-widest">No Images Added</div>';
        } else {
            slider.innerHTML = validImages.map(img => `<div class="min-w-full h-full"><img src="${img}" class="w-full h-full object-contain"></div>`).join('');
        }
        this.currentSliderIndex = 0;
        slider.style.transform = 'translateX(0)';
    },

    addSocialField() {
        const container = document.getElementById('socialLinksContainer');
        if (!container) return;
        const newInput = document.createElement('div');
        newInput.className = 'flex gap-2';
        newInput.innerHTML = `<input type="url" placeholder="Social Media Link ${container.children.length + 1}" class="social-link-input flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm">`;
        container.appendChild(newInput);
    },

    async handleSubmit() {
        const submitBtn = document.getElementById('submitBtn');
        const originalPrice = parseFloat(document.getElementById('productPrice').value);
        const discountPercentage = parseFloat(document.getElementById('productDiscount').value) || 0;
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const phone = document.getElementById('productPhone').value;
        const address = document.getElementById('productAddress').value;
        const validImages = this.productImages.filter(img => img !== null);

        if (!name || isNaN(originalPrice) || !category || !phone || !address || validImages.length === 0) {
            alert("Please fill all required fields and add at least one image!");
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing...";
        }

        const finalPrice = originalPrice - (originalPrice * discountPercentage / 100);
        const promotionDurationMs = (this.selectedPlanDurationDays || 0) * 24 * 60 * 60 * 1000;
        const promotionEndDate = Date.now() + promotionDurationMs;

        const socialLinks = Array.from(document.querySelectorAll('.social-link-input'))
            .map(input => input.value.trim())
            .filter(link => link !== "");

        const productData = {
            title: name,
            description: document.getElementById('productDescription').value,
            price: finalPrice,
            originalPrice: originalPrice,
            discountPercentage: discountPercentage,
            currency: document.getElementById('productCurrency').value,
            category: category,
            address: address,
            phone: document.getElementById('phoneCode').value + phone.trim().replace(/^0+/, ''),
            whatsapp: document.getElementById('productWhatsApp').value ? document.getElementById('whatsappCode').value + document.getElementById('productWhatsApp').value.trim().replace(/^0+/, '') : null,
            bankDetails: {
                bankName: document.getElementById('bankName').value,
                currency: document.getElementById('bankCurrency').value,
                accountNumber: document.getElementById('accountNumber').value,
                accountName: document.getElementById('accountName').value
            },
            socialLinks: socialLinks,
            imageUrl: validImages[0],
            images: validImages,
            ownerId: this.currentUser.uid,
            ownerName: this.currentUser.displayName || this.currentUser.email.split('@')[0],
            createdAt: Date.now(),
            isLive: false,
            paymentStatus: (this.selectedPlanType === 'paid' || this.selectedPlanType === 'flash') ? 'pending' : 'free',
            isPromoted: true,
            isFlashSale: this.selectedPlanType === 'flash',
            planType: this.selectedPlanType,
            promotionEndDate: promotionEndDate,
            tx_ref: 'PROMO-' + Date.now() + '-' + this.currentUser.uid
        };

        try {
            if (this.selectedPlanType === 'paid' || this.selectedPlanType === 'flash') {
                const docRef = await window.firebaseApp.db.collection('listings').add(productData);
                productData.id = docRef.id;
                this.payWithFlutterwave(this.selectedPlanAmountNGN, productData);
            } else {
                productData.isLive = true;
                productData.paymentStatus = 'free';
                await window.firebaseApp.db.collection('listings').add(productData);
                alert("Product is now live!");
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("Failed to post product. Please try again.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Confirm & Post";
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
            payment_options: "card, banktransfer, ussd",
            customer: {
                email: this.currentUser.email,
                name: this.currentUser.displayName || "Customer",
            },
            callback: async (data) => {
                console.log("Flutterwave callback data:", data);
                
                const flutterwaveStatus = data.status ? data.status.toLowerCase().trim() : '';
                const possibleSuccessStatuses = ['successful', 'success', 'completed'];
                const isSuccessful = possibleSuccessStatuses.includes(flutterwaveStatus);

                if (isSuccessful) {
                    this.paymentInProgress = false;
                    
                    try {
                        const sanitizedData = JSON.parse(JSON.stringify(data));

                        await window.firebaseApp.db.collection('listings').doc(productData.id).update({
                            isLive: true,
                            paymentStatus: 'successful',
                            paymentDetails: sanitizedData,
                            paymentCompletedAt: Date.now()
                        });

                        if (productData.ownerId) {
                            const userRef = window.firebaseApp.db.collection("users").doc(productData.ownerId);
                            const increment = (window.firebase && window.firebase.firestore) 
                                ? window.firebase.firestore.FieldValue.increment(1)
                                : 1;
                                
                            await userRef.update({
                                totalProducts: increment,
                            });
                        }

                        alert("✅ Payment Successful! Your product is now live.");
                        window.location.href = 'index.html';
                    } catch (firebaseError) {
                        console.error("Firebase update error after successful payment:", firebaseError);
                        alert(`Payment was successful, but there was an error updating your product. Please contact support if it doesn't appear soon.`);
                        window.location.href = 'index.html';
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
                    window.location.href = 'index.html';
                }
            },
            onclose: async () => {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Confirm & Post";
                }
                
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
document.addEventListener('DOMContentLoaded', () => window.promoteModule.init());
