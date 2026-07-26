/**
 * Full Functional Detail Module - Kentai Marketplace
 * Complete version with Edit, Reply, Delete, and Store Rating Sync
 */

let currentItem = null, currentUser = null, currentImageIndex = 0, itemImages = [], replyToId = null; 

async function initializeDetailPage() {
  window.firebaseApp.auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = 'auth.html'; return; }
    currentUser = user;
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    if (!itemId) { window.location.href = 'index.html'; return; }

    try {
      const doc = await window.firebaseApp.db.collection('listings').doc(itemId).get();
      if (!doc.exists) { window.location.href = 'index.html'; return; }
      currentItem = { id: doc.id, ...doc.data() };
      
      if (user.uid === currentItem.ownerId) renderOwnerTools();
      
      renderProductHeader();
      renderImageGallery();
      renderPricingAndContact();
      renderSocialHub();
      renderDescriptionAndSafety();
      loadConversations();
      loadReviews();
      loadRatingsSummary();
      startCountdown();
    } catch (e) { console.error(e); }
  });
}

function renderProductHeader() {
    document.getElementById('itemTitle').textContent = currentItem.title;
    document.getElementById('itemCategory').textContent = currentItem.category;
}

function renderImageGallery() {
  itemImages = currentItem.images && currentItem.images.length > 0 ? currentItem.images : [currentItem.imageUrl];
  const mainImage = document.getElementById('itemImage');
  const thumbContainer = document.getElementById('thumbnailGallery');
  if (mainImage) mainImage.src = itemImages[0];
  if (thumbContainer && itemImages.length > 1) {
    thumbContainer.classList.remove('hidden');
    thumbContainer.innerHTML = itemImages.map((img, idx) => `
      <div onclick="updateMainImage(${idx})" class="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === 0 ? 'border-orange-500 scale-105' : 'border-slate-200 hover:border-orange-300'}">
        <img src="${img}" class="w-full h-full object-cover">
      </div>`).join('');
  }
}

function updateMainImage(idx) {
    currentImageIndex = idx;
    const mainImage = document.getElementById('itemImage');
    mainImage.src = itemImages[idx];
    document.querySelectorAll('#thumbnailGallery > div').forEach((thumb, i) => {
        thumb.className = `cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? 'border-orange-500 scale-105' : 'border-slate-200 hover:border-orange-300'}`;
    });
}

function getCurrencySymbol(code) {
    return { 'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦', 'GHS': '₵', 'ZAR': 'R', 'KES': 'Sh', 'UGX': 'Sh' }[code] || '₦';
}

function renderPricingAndContact() {
    const priceDisplay = document.getElementById('itemPrice');
    const currency = getCurrencySymbol(currentItem.currency || currentItem.currencyCode);
    const price = currentItem.price || 0, original = currentItem.originalPrice || price;
    const discount = (currentItem.discountPercentage > 0 && currentItem.promotionEndDate > Date.now()) ? currentItem.discountPercentage : 0;

    if (priceDisplay) {
        if (discount > 0) {
            priceDisplay.innerHTML = `<div class="flex flex-col gap-1">
                <span class="text-sm font-bold text-slate-400 line-through">${currency}${original.toLocaleString()}</span>
                <div class="flex items-center gap-3">
                    <span class="text-4xl font-black text-red-600">${currency}${price.toLocaleString()}</span>
                    <span class="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded">-${discount}% OFF</span>
                </div></div>`;
        } else {
            priceDisplay.innerHTML = `<span class="text-4xl font-black text-slate-900">${currency}${price.toLocaleString()}</span>`;
        }
    }

    if (currentItem.phone) {
        document.getElementById('callBtn').href = `tel:${currentItem.phone}`;
        document.getElementById('callBtn').innerHTML = `<span>CALL ${currentItem.phone}</span>`;
    }
    if (currentItem.whatsapp) {
        document.getElementById('whatsappBtn').classList.remove('hidden');
        document.getElementById('whatsappBtn').href = `https://wa.me/${currentItem.whatsapp.replace(/\D/g,'' )}?text=Interested in ${currentItem.title}`;
    }
}

function startCountdown() {
    const timerElem = document.getElementById('detailCountdown');
    if (!timerElem || !currentItem.promotionEndDate) return;
    setInterval(() => {
        const diff = currentItem.promotionEndDate - Date.now();
        if (diff <= 0) { timerElem.textContent = "EXPIRED"; return; }
        const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
        timerElem.textContent = `${h}h ${m}m ${s}s`;
    }, 1000);
}

function renderSocialHub() {
    const hub = document.getElementById('socialHub');
    if (!hub || !currentItem.socialLinks) return;
    hub.innerHTML = `<div class="grid grid-cols-1 gap-3 mt-4">` + currentItem.socialLinks.map((link, idx) => `
        <a href="${link}" target="_blank" class="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition">
            <span class="text-xs font-bold text-slate-600 truncate">${link}</span>
        </a>`).join('') + `</div>`;
}

function renderDescriptionAndSafety() {
    document.getElementById('itemDescription').textContent = currentItem.description;
    document.getElementById('itemAddress').textContent = currentItem.address || 'Address not specified';
}

function renderOwnerTools() {
    const tools = document.getElementById('ownerTools');
    if (tools) tools.innerHTML = `
        <div class="flex gap-2 mb-8">
            <button onclick="location.href='edit.html?id=${currentItem.id}'" class="flex-1 bg-amber-50 text-amber-700 py-4 rounded-2xl font-black uppercase text-[10px] border border-amber-200">Edit Product</button>
            <button onclick="deleteListing()" class="px-8 bg-red-50 text-red-600 py-4 rounded-2xl font-black uppercase text-[10px] border border-red-200">Delete</button>
        </div>`;
}

async function deleteListing() {
    if (confirm("Delete this product permanently?")) {
        await window.firebaseApp.db.collection('listings').doc(currentItem.id).delete();
        window.location.href = 'index.html';
    }
}

async function loadConversations() {
    const container = document.getElementById('conversationsContainer');
    if (!container) return;
    window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        if (snapshot.empty) { container.innerHTML = '<p class="text-slate-400 text-center py-8 text-xs font-bold uppercase">No questions yet.</p>'; return; }
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data(), isMe = data.senderId === currentUser.uid, isOwner = currentUser.uid === currentItem.ownerId;
            return `<div class="flex ${isMe ? 'justify-end' : 'justify-start'} mb-4">
                <div class="max-w-[80%] ${isMe ? 'bg-orange-500 text-white' : 'bg-white text-slate-800 border border-slate-100'} p-3 rounded-2xl shadow-sm">
                    <p class="text-[9px] font-black uppercase opacity-80">${data.senderEmail || 'User'}</p>
                    ${data.replyToText ? `<div class="bg-black/5 p-2 rounded-lg mb-2 text-[10px] italic">Replying to: "${data.replyToText}"</div>` : ''}
                    <p id="msg-text-${doc.id}" class="text-sm">${data.text}</p>
                    <div class="flex gap-2 mt-1">
                        <button onclick="setReply('${doc.id}', '${data.text.replace(/'/g, "\\'")}', 'message')" class="text-[8px] font-black uppercase opacity-60">Reply</button>
                        ${isMe ? `<button onclick="editMessage('${doc.id}')" class="text-[8px] font-black uppercase opacity-60">Edit</button>` : ''}
                        ${(isMe || isOwner) ? `<button onclick="deleteMessage('${doc.id}')" class="text-[8px] font-black uppercase text-red-400">Delete</button>` : ''}
                    </div>
                </div>
            </div>`;
        }).join('');
    });
}

async function editMessage(msgId) {
    const textElem = document.getElementById(`msg-text-${msgId}`);
    const newText = prompt("Edit your message:", textElem.textContent);
    if (newText && newText.trim() !== "" && newText !== textElem.textContent) {
        try {
            await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('messages').doc(msgId).update({ text: newText.trim(), editedAt: Date.now() });
        } catch (e) { alert(e.message); }
    }
}

async function deleteMessage(msgId) {
    if (confirm("Delete this message?")) {
        try {
            await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('messages').doc(msgId).delete();
        } catch (e) { alert(e.message); }
    }
}

function setReply(id, text, type) {
    replyToId = id;
    const indicator = document.getElementById(type === 'message' ? 'messageReplyIndicator' : 'reviewReplyIndicator');
    if (indicator) {
        indicator.innerHTML = `<div class="flex items-center justify-between bg-slate-100 p-2 rounded-lg mb-2 text-[10px] font-bold">
            <span class="truncate">Replying to: "${text}"</span>
            <button onclick="cancelReply('${type}')" class="text-red-500">✕</button>
        </div>`;
        indicator.classList.remove('hidden');
    }
    document.getElementById(type === 'message' ? 'messageInput' : 'reviewInput').focus();
}

function cancelReply(type) {
    replyToId = null;
    const indicator = document.getElementById(type === 'message' ? 'messageReplyIndicator' : 'reviewReplyIndicator');
    if (indicator) indicator.classList.add('hidden');
}

async function submitMessage() {
    const input = document.getElementById('messageInput'), text = input.value.trim();
    if (!text) return;
    let replyData = {};
    if (replyToId) {
        const doc = await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('messages').doc(replyToId).get();
        if (doc.exists) replyData = { replyToId, replyToText: doc.data().text };
    }
    try {
        await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('messages').add({
            text, senderId: currentUser.uid, senderEmail: currentUser.email, timestamp: Date.now(), ...replyData
        });
        input.value = ''; cancelReply('message');
    } catch (e) { alert(e.message); }
}

async function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        if (snapshot.empty) { container.innerHTML = '<p class="text-slate-400 text-center py-8 text-xs font-bold uppercase">No reviews yet.</p>'; return; }
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data(), isMe = data.senderId === currentUser.uid;
            return `<div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                <div class="flex justify-between mb-2">
                    <span class="text-[10px] font-black uppercase text-slate-400">${data.senderEmail || 'User'}</span>
                    <div class="text-yellow-400">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</div>
                </div>
                ${data.replyToText ? `<div class="bg-black/5 p-2 rounded-lg mb-2 text-[10px] italic">Replying to: "${data.replyToText}"</div>` : ''}
                <p id="rev-text-${doc.id}" class="text-sm text-slate-700">${data.text}</p>
                <div class="flex gap-2 mt-2">
                    <button onclick="setReply('${doc.id}', '${data.text.replace(/'/g, "\\'")}', 'review')" class="text-[8px] font-black uppercase text-slate-400">Reply</button>
                    ${isMe ? `<button onclick="editReview('${doc.id}')" class="text-[8px] font-black uppercase text-slate-400">Edit</button>` : ''}
                    ${isMe ? `<button onclick="deleteReview('${doc.id}')" class="text-[8px] font-black uppercase text-red-400">Delete</button>` : ''}
                </div>
            </div>`;
        }).join('');
        loadRatingsSummary();
    });
}

async function editReview(revId) {
    const textElem = document.getElementById(`rev-text-${revId}`);
    const newText = prompt("Edit your review:", textElem.textContent);
    if (newText) {
        const newRating = parseInt(prompt("Update rating (1-5):", "5"));
        if (newRating >= 1 && newRating <= 5) {
            try {
                await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').doc(revId).update({ text: newText.trim(), rating: newRating, editedAt: Date.now() });
                await syncStoreRating();
                alert("✓ Review updated!");
            } catch (e) { alert(e.message); }
        }
    }
}

async function deleteReview(revId) {
    if (confirm("Delete this review?")) {
        try {
            await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').doc(revId).delete();
            await syncStoreRating();
            alert("✓ Review deleted!");
        } catch (e) { alert(e.message); }
    }
}

async function submitReview() {
    const input = document.getElementById('reviewInput'), text = input.value.trim();
    const rating = parseInt(document.getElementById('ratingValue').value);
    if (!text || rating === 0) { alert("Please enter review and rating."); return; }
    let replyData = {};
    if (replyToId) {
        const doc = await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').doc(replyToId).get();
        if (doc.exists) replyData = { replyToId, replyToText: doc.data().text };
    }
    try {
        await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').add({
            text, rating, senderId: currentUser.uid, senderEmail: currentUser.email, timestamp: Date.now(), ...replyData
        });
        await syncStoreRating();
        alert("✓ Review posted!");
        input.value = ''; document.getElementById('ratingValue').value = '0';
        cancelReply('review');
    } catch (e) { alert(e.message); }
}

async function syncStoreRating() {
    const listingsSnap = await window.firebaseApp.db.collection('listings').where('ownerId', '==', currentItem.ownerId).get();
    let allRatings = [];
    for (const listDoc of listingsSnap.docs) {
        const revSnap = await listDoc.ref.collection('reviews').get();
        revSnap.forEach(r => { if (r.data().rating) allRatings.push(r.data().rating); });
    }
    const total = allRatings.length, avg = total > 0 ? (allRatings.reduce((a, b) => a + b, 0) / total) : 0;
    await window.firebaseApp.db.collection('users').doc(currentItem.ownerId).update({ storeRating: avg, storeReviews: total });
}

async function loadRatingsSummary() {
    try {
        const snapshot = await window.firebaseApp.db.collection('listings').doc(currentItem.id).collection('reviews').get();
        if (snapshot.empty) {
            document.getElementById('averageRating').textContent = "0.0";
            document.getElementById('reviewCount').textContent = "0 reviews";
            // Reset breakdown to 0
            for (let i = 1; i <= 5; i++) {
                const elem = document.getElementById(`breakdown${i}`);
                if (elem) elem.textContent = '0';
            }
            return;
        }
        const reviews = snapshot.docs.map(doc => doc.data());
        const total = reviews.length, avg = (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total).toFixed(1);
        document.getElementById('averageRating').textContent = avg;
        document.getElementById('reviewCount').textContent = `${total} review${total !== 1 ? 's' : ''}`;
        
        // Calculate rating breakdown
        const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(r => {
            const rating = parseInt(r.rating) || 0;
            if (rating >= 1 && rating <= 5) {
                breakdown[rating]++;
            }
        });
        
        // Update breakdown elements
        for (let i = 1; i <= 5; i++) {
            const elem = document.getElementById(`breakdown${i}`);
            if (elem) elem.textContent = breakdown[i];
        }
    } catch (e) { console.error(e); }
}

window.submitMessage = submitMessage;
window.submitReview = submitReview;
window.editMessage = editMessage;
window.deleteMessage = deleteMessage;
window.editReview = editReview;
window.deleteReview = deleteReview;
window.setReply = setReply;
window.cancelReply = cancelReply;
window.deleteListing = deleteListing;
window.updateMainImage = updateMainImage;
window.addEventListener('load', initializeDetailPage);
