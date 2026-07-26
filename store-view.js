/**
 * Store View Module (FIXED & RESPONSIVE)
 * Handles store data loading, product display, and sorting logic
 */

let currentStore = null;
let storeProducts = [];

// Helper to get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

window.addEventListener('load', async () => {
  console.log('Store view page loading...');
  await loadStoreData();
  
  if (window.firebaseApp && window.firebaseApp.auth) {
    window.firebaseApp.auth.onAuthStateChanged(user => {
      // 1. Owner Check: Show owner actions and hide follow button
      if (user && currentStore && user.uid === currentStore.uid) {
        document.getElementById('ownerActions')?.classList.remove('hidden');
        document.getElementById('ownerAddFirst')?.classList.remove('hidden');
        document.getElementById('followBtn')?.classList.add('hidden');
      }
      // 2. Check if the current visitor is already following
      checkIfFollowing();
    });
  }
});

async function loadStoreData() {
  try {
    const slug = getUrlParameter('storeSlug');
    const id = getUrlParameter('storeId');
    
    if (!slug && !id) {
      console.error('No store identifier provided');
      return;
    }

    let doc;
    if (slug) {
      const snap = await window.firebaseApp.db.collection('users').where('storeSlug', '==', slug).limit(1).get();
      if (snap.empty) { 
        console.error('Store not found by slug');
        window.location.href = 'index.html'; 
        return; 
      }
      doc = snap.docs[0];
    } else {
      doc = await window.firebaseApp.db.collection('users').doc(id).get();
      if (!doc.exists) {
        console.error('Store not found by ID');
        window.location.href = 'index.html';
        return;
      }
    }

    currentStore = { uid: doc.id, ...doc.data() };
    displayStoreInfo(currentStore);
    await loadStoreProducts(currentStore.uid);
  } catch (e) { 
    console.error('Error loading store data:', e); 
  }
}

function displayStoreInfo(store) {
  if (document.getElementById('storeName')) document.getElementById('storeName').textContent = store.storeName || 'Store';
  if (document.getElementById('storeCategory')) document.getElementById('storeCategory').textContent = store.storeCategory || 'Other';
  if (document.getElementById('storeDescription')) document.getElementById('storeDescription').textContent = store.storeDescription || 'No description available.';
  
  const storeLogo = document.getElementById('storeLogo');
  if (storeLogo) {
    if (store.storeProfileImage) {
      storeLogo.innerHTML = `<img src="${store.storeProfileImage}" class="w-full h-full object-cover rounded-2xl">`;
    } else {
      storeLogo.textContent = store.storeInitial || (store.storeName || 'S').charAt(0).toUpperCase();
    }
  }
  
  if (document.getElementById('totalProducts')) document.getElementById('totalProducts').textContent = store.totalProducts || 0;
  if (document.getElementById('followers')) document.getElementById('followers').textContent = store.followers || 0;
}

async function loadStoreProducts(ownerId) {
  try {
    const snap = await window.firebaseApp.db.collection('listings').where('ownerId', '==', ownerId).get();
    const allProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    // BACKWARD-COMPATIBLE: Show all products that are marked as live
    // Legacy products (before payment system) don't have paymentStatus, so they should show if isLive is true
    storeProducts = allProducts.filter(item => {
      // If product has isLive field, check it along with payment status
      if ('isLive' in item) {
        // If it has payment status, check it; otherwise assume it's approved (legacy product)
        if ('paymentStatus' in item) {
          const paymentApproved = item.paymentStatus === 'successful' || item.paymentStatus === 'not-required' || item.paymentStatus === 'free' || item.paymentStatus === 'points';
          return item.isLive === true && paymentApproved;
        } else {
          // Legacy product without paymentStatus - show if isLive is true
          return item.isLive === true;
        }
      }
      // Very old products without isLive field - show them
      return true;
    });
    
    updateProductBreakdown();
    applyFilters(); 
  } catch (e) { 
    console.error('Error loading products:', e); 
  }
}

function updateProductBreakdown() {
  const storeCount = storeProducts.filter(p => p.uploadSource === 'store').length;
  const homepageCount = storeProducts.filter(p => p.uploadSource === 'homepage' || !p.uploadSource).length;
  
  const storeCountElem = document.getElementById('storeCount');
  const homepageCountElem = document.getElementById('homepageCount');
  
  if (storeCountElem) storeCountElem.textContent = storeCount;
  if (homepageCountElem) homepageCountElem.textContent = homepageCount;
}

/**
 * FIXED: Sorting logic
 */
function displayProducts(products = storeProducts) {
  const container = document.getElementById('productsContainer');
  const empty = document.getElementById('emptyState');
  
  if (!container) return;

  if (products.length === 0) { 
    container.innerHTML = ''; 
    empty?.classList.remove('hidden'); 
    return; 
  }

  empty?.classList.add('hidden');
  
  container.innerHTML = products.map(p => {
    // FIX: Support both legacy (images array) and new (imageUrl) image formats
    const displayImage = (p.images && p.images.length > 0) ? p.images[0] : (p.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image');
    const sourceColor = p.uploadSource === 'store' ? 'bg-blue-600' : 'bg-purple-600';
    const sourceLabel = p.uploadSource === 'store' ? 'Store' : 'Uploaded in Homepage';
    return `
    <div onclick="location.href='item-detail.html?id=${p.id}'" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 group relative">
      <div class="aspect-square bg-slate-100 overflow-hidden">
        <img src="${displayImage}" 
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
             onerror="this.src='https://via.placeholder.com/400x400?text=Error+Loading'">
      </div>
      <div class="absolute top-2 right-2 px-2 py-1 rounded-lg text-white text-[9px] font-black uppercase tracking-widest ${sourceColor}">${sourceLabel}</div>
      <div class="p-3 sm:p-4">
        <p class="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">${p.category || 'Item'}</p>
        <h3 class="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-orange-600 transition-colors">${p.title}</h3>
        <div class="flex items-center justify-between mt-2 sm:mt-3">
            <p class="text-base sm:text-lg font-black text-slate-900">${p.currency || '₦'}${Number(p.price).toLocaleString()}</p>
            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/**
 * FIXED: Filter/Sort implementation
 */
function applyFilters() {
  const sortBy = document.getElementById('sortBy')?.value || 'newest';
  let filtered = [...storeProducts];

  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'price-desc':
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case 'newest':
    default:
      // Sort by createdAt timestamp if available, otherwise by ID
      filtered.sort((a, b) => {
        const timeA = a.createdAt?.seconds || a.at || 0;
        const timeB = b.createdAt?.seconds || b.at || 0;
        return timeB - timeA;
      });
      break;
  }

  displayProducts(filtered);
}

/**
 * Toggle Follow Store
 */
async function toggleFollowStore() {
  const user = window.firebaseApp.auth.currentUser;
  
  if (!user) {
    alert('Please log in to follow this store.');
    window.location.href = 'auth.html';
    return;
  }
  
  if (user.uid === currentStore.uid) {
    alert("You cannot follow your own store!");
    return;
  }
  
  const docId = `${currentStore.uid}_${user.uid}`;
  const docRef = window.firebaseApp.db.collection('storeFollowers').doc(docId);
  const doc = await docRef.get();
  const btn = document.getElementById('followBtn');

  try {
    if (doc.exists) {
      await docRef.delete();
      btn.textContent = 'Follow Store';
      btn.classList.remove('bg-green-600');
      btn.classList.add('bg-orange-600');
      await window.firebaseApp.db.collection('users').doc(currentStore.uid).update({
        followers: firebase.firestore.FieldValue.increment(-1)
      });
    } else {
      await docRef.set({ 
        storeId: currentStore.uid, 
        followerId: user.uid, 
        followerName: user.displayName || user.email.split('@')[0],
        followerEmail: user.email,
        at: Date.now() 
      });
      btn.textContent = 'Following ✓';
      btn.classList.remove('bg-orange-600');
      btn.classList.add('bg-green-600');
      await window.firebaseApp.db.collection('users').doc(currentStore.uid).update({
        followers: firebase.firestore.FieldValue.increment(1)
      });
    }
    
    // Refresh stats UI
    const updated = await window.firebaseApp.db.collection('users').doc(currentStore.uid).get();
    if (document.getElementById('followers')) {
      document.getElementById('followers').textContent = updated.data().followers || 0;
    }
  } catch (e) { 
    alert('Error: ' + e.message); 
  }
}

async function checkIfFollowing() {
  const user = window.firebaseApp.auth.currentUser;
  if (!user || !currentStore) return;
  const doc = await window.firebaseApp.db.collection('storeFollowers').doc(`${currentStore.uid}_${user.uid}`).get();
  if (doc.exists) {
    const btn = document.getElementById('followBtn');
    if (btn) {
      btn.textContent = 'Following ✓';
      btn.classList.remove('bg-orange-600');
      btn.classList.add('bg-green-600');
    }
  }
}

function getFullStoreLink() {
  const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
  return `${window.location.origin}${path}store-view.html?storeSlug=${currentStore.storeSlug}`;
}

function shareStore() {
  if (!currentStore) return;
  const link = getFullStoreLink();
  const text = `Check out ${currentStore.storeName} on Kentai Marketplace!`;
  
  if (navigator.share) {
    navigator.share({ title: currentStore.storeName, text, url: link })
      .catch(console.error);
  } else {
    // Fallback to WhatsApp
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`);
  }
}

function goBack() {
  if (window.history.length > 1) window.history.back();
  else window.location.href = 'index.html';
}
