let currentListingId = null;
let currentListingData = null;
let socialCount = 0;
let productImages = [null, null, null];

async function initializeEditPage() {
    window.firebaseApp.auth.onAuthStateChanged(async (user) => {
        if (!user) { window.location.href = 'auth.html'; return; }
        
        const params = new URLSearchParams(window.location.search);
        currentListingId = params.get('id');
        if (!currentListingId) { window.location.href = 'index.html'; return; }

        try {
            const doc = await window.firebaseApp.db.collection('listings').doc(currentListingId).get();
            if (!doc.exists) { window.location.href = 'index.html'; return; }
            currentListingData = doc.data();

            // Security check
            if (currentListingData.ownerId !== user.uid) {
                alert("You don't have permission to edit this product.");
                window.location.href = 'index.html';
                return;
            }

            // Fill basic info
            document.getElementById('editTitle').value = currentListingData.title || '';
            document.getElementById('editCurrency').value = currentListingData.currency || currentListingData.currencyCode || 'NGN';
            document.getElementById('editPrice').value = currentListingData.originalPrice || currentListingData.price || 0;
            document.getElementById('editDiscount').value = currentListingData.discountPercentage || 0;
            document.getElementById('editCategory').value = currentListingData.category || '';
            document.getElementById('editDescription').value = currentListingData.description || '';
            document.getElementById('editAddress').value = currentListingData.address || '';

            // Fill bank details
            document.getElementById('editBankName').value = currentListingData.bankName || '';
            document.getElementById('editBankCurrency').value = currentListingData.bankCurrency || 'NGN';
            document.getElementById('editAccountNumber').value = currentListingData.accountNumber || '';
            document.getElementById('editAccountName').value = currentListingData.accountName || '';

            // Fill contact details
            if (currentListingData.phoneCode) document.getElementById('editPhoneCode').value = currentListingData.phoneCode;
            if (currentListingData.phoneNumber) document.getElementById('editPhone').value = currentListingData.phoneNumber;
            if (currentListingData.whatsappCode) document.getElementById('editWhatsappCode').value = currentListingData.whatsappCode;
            if (currentListingData.whatsappNumber) document.getElementById('editWhatsapp').value = currentListingData.whatsappNumber;

            // Initial Discount Preview
            calculateDiscount();

            // Fill social links
            const socialLinks = currentListingData.socialLinks || [];
            const container = document.getElementById('socialLinksContainer');
            container.innerHTML = '';
            socialCount = 0;
            
            if (socialLinks.length === 0) {
                addSocialField();
            } else {
                socialLinks.forEach(link => {
                    addSocialField(link);
                });
            }

            // Fill images
            const images = currentListingData.images || [currentListingData.imageUrl];
            images.forEach((img, idx) => {
                if (idx < 3 && img) {
                    productImages[idx] = img;
                    const urlInput = document.getElementById(`url${idx + 1}`);
                    const preview = document.getElementById(`preview${idx + 1}`);
                    const placeholder = document.getElementById(`placeholder${idx + 1}`);
                    if (urlInput) urlInput.value = img;
                    if (preview) {
                        preview.src = img;
                        preview.classList.remove('hidden');
                        if (placeholder) placeholder.classList.add('hidden');
                    }
                }
            });

        } catch (e) { console.error('Error loading product:', e); }
    });
}

function handleUrl(index, url) {
    productImages[index-1] = url.trim() || null;
    const preview = document.getElementById(`preview${index}`);
    const placeholder = document.getElementById(`placeholder${index}`);
    if (preview) {
        if (url.trim()) {
            preview.src = url.trim();
            preview.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
        } else {
            preview.classList.add('hidden');
            if (placeholder) placeholder.classList.remove('hidden');
        }
    }
}

function handleFile(index, event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        productImages[index-1] = dataUrl;
        const preview = document.getElementById(`preview${index}`);
        const placeholder = document.getElementById(`placeholder${index}`);
        const urlInput = document.getElementById(`url${index}`);
        if (preview) {
            preview.src = dataUrl;
            preview.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
        }
        if (urlInput) urlInput.value = ""; // Clear URL input if file is uploaded
    };
    reader.readAsDataURL(file);
}

function addSocialField(value = '') {
    if (socialCount >= 10) {
        alert("Maximum 10 social media links allowed.");
        return;
    }
    socialCount++;
    const container = document.getElementById('socialLinksContainer');
    const div = document.createElement('div');
    div.className = "flex gap-2";
    div.innerHTML = `<input type="url" value="${value}" placeholder="Social Media Link ${socialCount}" class="social-link-input w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-sm">`;
    container.appendChild(div);
}

function getCurrencySymbol(code) {
    const symbols = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦',
        'GHS': '₵', 'ZAR': 'R', 'KES': 'Sh', 'UGX': 'Sh',
        'EGP': 'E£', 'INR': '₹', 'JPY': '¥', 'CNY': '¥',
        'AUD': 'A$', 'CAD': 'C$', 'CHF': 'CHF', 'AED': 'د.إ',
        'SAR': 'ر.س', 'BRL': 'R$', 'RUB': '₽', 'TRY': '₺',
        'KWD': 'د.ك', 'QAR': 'ر.ق', 'PKR': 'Rs', 'IDR': 'Rp',
        'MYR': 'RM'
    };
    return symbols[code] || code;
}

function calculateDiscount() {
    const price = parseFloat(document.getElementById('editPrice').value) || 0;
    const discount = parseFloat(document.getElementById('editDiscount').value) || 0;
    const currencyCode = document.getElementById('editCurrency').value;
    const symbol = getCurrencySymbol(currencyCode);
    const preview = document.getElementById('discountPreview');

    if (price > 0 && discount > 0) {
        const discountAmount = (price * discount) / 100;
        const finalPrice = price - discountAmount;
        preview.innerHTML = `
            <div class="p-4 bg-orange-50 border border-orange-100 rounded-2xl space-y-2 mt-4">
                <div class="flex flex-col">
                    <span class="text-[10px] text-slate-500 uppercase font-black">Initial Price:</span>
                    <span class="text-xs text-slate-400 line-through font-bold">${symbol}${price.toLocaleString()}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] text-orange-600 uppercase font-black">Discounted Price:</span>
                    <span class="text-lg text-red-600 font-black">${symbol}${finalPrice.toLocaleString()}</span>
                    <span class="text-[10px] font-black text-red-500 uppercase">Save ${discount}%</span>
                </div>
            </div>
        `;
        preview.classList.remove('hidden');
    } else {
        preview.classList.add('hidden');
    }
}

async function saveChanges() {
    const saveBtn = document.querySelector('button[onclick="saveChanges()"]');
    const title = document.getElementById('editTitle').value;
    const currency = document.getElementById('editCurrency').value;
    const price = parseFloat(document.getElementById('editPrice').value);
    const discount = parseFloat(document.getElementById('editDiscount').value) || 0;
    const category = document.getElementById('editCategory').value;
    const description = document.getElementById('editDescription').value;
    const address = document.getElementById('editAddress').value;
    
    const bankName = document.getElementById('editBankName').value.trim();
    const bankCurrency = document.getElementById('editBankCurrency').value;
    const accountNumber = document.getElementById('editAccountNumber').value.trim();
    const accountName = document.getElementById('editAccountName').value.trim();

    const phoneCode = document.getElementById('editPhoneCode').value;
    const phoneNum = document.getElementById('editPhone').value.trim();
    const whatsappCode = document.getElementById('editWhatsappCode').value;
    const whatsappNum = document.getElementById('editWhatsapp').value.trim();

    const validImages = productImages.filter(img => img && img.trim() !== '');

    const socialLinks = [];
    document.querySelectorAll('.social-link-input').forEach(input => {
        if (input.value.trim()) socialLinks.push(input.value.trim());
    });

    if (!title || isNaN(price) || !category) {
        alert("Title, Price, and Category are required!");
        return;
    }

    if (validImages.length === 0) {
        alert("At least one product image is required!");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerText = "Saving...";

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    const updatedData = {
        title: title,
        currency: currency,
        currencyCode: currency,
        originalPrice: price,
        price: finalPrice,
        discountPercentage: discount,
        discountAmount: discountAmount,
        category: category,
        description: description,
        address: address,
        bankName: bankName,
        bankCurrency: bankCurrency,
        accountNumber: accountNumber,
        accountName: accountName,
        phoneCode: phoneCode,
        phoneNumber: phoneNum,
        phone: `${phoneCode}${phoneNum.replace(/^0+/, '')}`,
        whatsappCode: whatsappCode,
        whatsappNumber: whatsappNum,
        whatsapp: whatsappNum ? `${whatsappCode}${whatsappNum.replace(/^0+/, '')}` : "",
        imageUrl: validImages[0],
        images: validImages,
        socialLinks: socialLinks,
        updatedAt: Date.now()
    };

    try {
        await window.firebaseApp.db.collection('listings').doc(currentListingId).update(updatedData);
        alert("Product updated successfully!");
        window.location.href = `item-detail.html?id=${currentListingId}`;
    } catch (e) {
        console.error('Error updating product:', e);
        alert("Error updating product. Check console for details.");
        saveBtn.disabled = false;
        saveBtn.innerText = "Save Changes";
    }
}

window.saveChanges = saveChanges;
window.addSocialField = addSocialField;
window.calculateDiscount = calculateDiscount;
window.handleUrl = handleUrl;
window.handleFile = handleFile;
window.addEventListener('load', initializeEditPage);
