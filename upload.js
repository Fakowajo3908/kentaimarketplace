/**
 * Enhanced Upload Module
 * Handles multiple file uploads (up to 3) and image URLs with real-time previews
 * Includes discount calculation functionality and social media links
 * STORE FEATURE: Added store reference logic
 */

let userLocation = { latitude: 0, longitude: 0 };
let selectedFilesBase64 = { 1: null, 2: null, 3: null };
let socialCount = 1;

async function initializeUploadPage() {
  window.firebaseApp.auth.onAuthStateChanged((user) => {
    if (!user) { window.location.href = 'auth.html'; return; }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { userLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }; },
        () => console.log("Location skipped")
      );
    }
    const form = document.getElementById('uploadForm');
    if (form) form.addEventListener('submit', handleFormSubmit);
    
    const priceInput = document.getElementById('itemPrice');
    const discountInput = document.getElementById('itemDiscount');
    const currencySelect = document.getElementById('itemCurrency');
    if (priceInput) priceInput.addEventListener('input', calculateDiscountedPrice);
    if (discountInput) discountInput.addEventListener('input', calculateDiscountedPrice);
    if (currencySelect) currencySelect.addEventListener('change', calculateDiscountedPrice);
  });
}

function addSocialField() {
    if (socialCount >= 10) {
        alert("Maximum 10 social media links allowed.");
        return;
    }
    socialCount++;
    const container = document.getElementById('socialLinksContainer');
    const div = document.createElement('div');
    div.className = "flex gap-2";
    div.innerHTML = `<input type="url" placeholder="Social Media Link ${socialCount}" class="social-link-input w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition text-sm">`;
    container.appendChild(div);
}

function calculateDiscountedPrice() {
  const priceInput = document.getElementById('itemPrice');
  const discountInput = document.getElementById('itemDiscount');
  const previewDiv = document.getElementById('discountPreview');
  
  const price = parseFloat(priceInput.value) || 0;
  const discount = parseFloat(discountInput.value) || 0;
  
  const currency = document.getElementById('itemCurrency').value || 'NGN';
  const currencySymbols = {
    'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦',
    'GHS': '₵', 'ZAR': 'R', 'KES': 'Sh', 'UGX': 'Sh',
    'INR': '₹', 'JPY': '¥', 'CNY': '¥', 'AUD': 'A$', 'CAD': 'C$',
    'CHF': 'CHF', 'AED': 'د.إ', 'SAR': 'ر.с', 'BRL': 'R$', 'RUB': '₽',
    'TRY': '₺', 'KWD': 'د.ك', 'QAR': 'ر.ق', 'PKR': 'Rs', 'IDR': 'Rp', 'MYR': 'RM'
  };
  const symbol = currencySymbols[currency] || '₦';
  
  if (previewDiv) {
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
  }
}

async function handleFileSelect(imageIndex) {
  const fileInput = document.getElementById(`file${imageIndex}`);
  const urlInput = document.getElementById(`url${imageIndex}`);
  const file = fileInput.files[0];
  if (!file) return;
  
  // Clear URL input if file is selected
  if (urlInput) urlInput.value = '';
  
  const preview = document.getElementById(`imagePreview${imageIndex}`);
  preview.innerHTML = '<p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Compressing...</p>';
  
  try {
    const base64 = await compressImage(file);
    selectedFilesBase64[imageIndex] = base64;
    const img = document.createElement('img');
    img.src = base64;
    img.className = 'w-full h-full object-cover';
    preview.innerHTML = '';
    preview.appendChild(img);
  } catch (e) {
    alert("Error processing image " + imageIndex + ": " + e.message);
    preview.innerHTML = '<p class="text-red-500 text-[10px] font-bold uppercase tracking-widest">Failed</p>';
  }
}

function previewImage(imageIndex) {
  const urlInput = document.getElementById(`url${imageIndex}`);
  const fileInput = document.getElementById(`file${imageIndex}`);
  const url = urlInput.value.trim();
  const preview = document.getElementById(`imagePreview${imageIndex}`);
  
  if (!url) {
    preview.innerHTML = `<p class="text-slate-400 text-[10px] text-center uppercase tracking-widest font-bold">Preview ${imageIndex}</p>`;
    selectedFilesBase64[imageIndex] = null;
    return;
  }
  
  // Clear file selection if URL is entered
  if (fileInput) fileInput.value = '';
  selectedFilesBase64[imageIndex] = null;
  
  const img = document.createElement('img');
  img.src = url;
  img.className = 'w-full h-full object-cover';
  img.onload = function() { 
    preview.innerHTML = ''; 
    preview.appendChild(img); 
  };
  img.onerror = function() { 
    preview.innerHTML = '<p class="text-red-500 text-[10px] font-black text-center uppercase tracking-widest">Invalid URL</p>'; 
  };
  preview.innerHTML = '<p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Loading...</p>';
}

// STORE FEATURE: Updated handleFormSubmit with Store reference logic (NEW)
async function handleFormSubmit(event) {
  event.preventDefault();
  const user = window.firebaseApp.auth.currentUser;
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Posting...';
  try {
    const phoneFull = document.getElementById('phoneCode').value + document.getElementById('itemPhone').value.trim().replace(/^0+/, '');
    const whatsappInput = document.getElementById('itemWhatsApp').value.trim();
    const whatsappFull = whatsappInput ? (document.getElementById('whatsappCode').value + whatsappInput.replace(/^0+/, '')) : '';
    const images = [];
    for (let i = 1; i <= 3; i++) {
      const fileBase64 = selectedFilesBase64[i];
      const urlInput = document.getElementById(`url${i}`).value.trim();
      if (fileBase64) images.push(fileBase64);
      else if (urlInput) images.push(urlInput);
    }
    const socialLinks = [];
    document.querySelectorAll('.social-link-input').forEach(input => {
        if (input.value.trim()) socialLinks.push(input.value.trim());
    });
    const originalPrice = parseFloat(document.getElementById('itemPrice').value) || 0;
    const discountPercentage = parseFloat(document.getElementById('itemDiscount').value) || 0;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    
    // STORE FEATURE: Fetch user's store information (NEW)
    let storeId = null;
    let storeName = null;
    let storeSlug = null;
    try {
      const userDoc = await window.firebaseApp.db.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.storeCreated) {
          storeId = user.uid;
          storeName = userData.storeName || null;
          storeSlug = userData.storeSlug || null;
        }
      }
    } catch (e) {
      console.error('Error fetching store info:', e);
    }
    
    const listingData = {
      title: document.getElementById('itemTitle').value.trim(),
      originalPrice: originalPrice,
      price: finalPrice,
      discountPercentage: discountPercentage,
      discountAmount: discountAmount,
      currency: document.getElementById('itemCurrency').value,
      currencyCode: document.getElementById('itemCurrency').value,
      category: document.getElementById('itemCategory').value.trim() || 'Other',
      description: document.getElementById('itemDescription').value.trim(),
      address: document.getElementById('itemAddress').value.trim(),
      bankName: document.getElementById('bankName').value.trim(),
      bankCurrency: document.getElementById('bankCurrency').value,
      accountNumber: document.getElementById('accountNumber').value.trim(),
      accountName: document.getElementById('accountName').value.trim(),
      imageUrl: images[0] || '',
      images: images,
      phone: phoneFull,
      whatsapp: whatsappFull,
      socialLinks: socialLinks,
      ownerId: user.uid,
      ownerName: user.displayName || user.email.split('@')[0],
      ownerEmail: user.email,
      location: new firebase.firestore.GeoPoint(userLocation.latitude, userLocation.longitude),
      createdAt: Date.now(),
      promotionEndDate: 0,
      isPromoted: false,
      isFlashSale: false,
      // STRICT: Mark as live (no payment required for regular upload)
      isLive: true,
      paymentStatus: 'not-required',
      // STORE FEATURE: Add store reference fields (NEW)
      storeId: storeId,
      storeName: storeName,
      storeSlug: storeSlug,
      uploadSource: 'homepage'
    };
    
    await window.firebaseApp.db.collection('listings').add(listingData);
    
    // STORE FEATURE: Increment store's totalProducts count (NEW)
    if (storeId) {
      try {
        await window.firebaseApp.db.collection('users').doc(storeId).update({
          totalProducts: firebase.firestore.FieldValue.increment(1)
        });
      } catch (e) {
        console.error('Error updating store product count:', e);
      }
    }
    
    alert("Listing posted successfully!");
    window.location.href = 'index.html';
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Post Item Now';
  }
}

async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > 1200) { height = Math.round((height * 1200) / width); width = 1200; }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

window.addEventListener('load', initializeUploadPage);
window.handleFileSelect = handleFileSelect;
window.previewImage = previewImage;
