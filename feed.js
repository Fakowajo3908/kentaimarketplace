// STORE FEATURE: Updated feed.js with Store link integration, Priority Sorting, 90-day visibility, Image filtering, and Normalized Categories
window.feedModule = {
  currentCategory: 'All',
  currentPriceFilter: 'all',
  currentSort: 'newest',
  searchQuery: '',
  allListings: [],
  pageSize: 10,
  currentPage: 1,
  timerIntervalId: null,

  async fetchAndRender() {
    try {
      document.getElementById('loadingState').classList.remove('hidden');
      
      // Check for missing phone number if user has a store
      const user = window.firebaseApp.auth.currentUser;
      if (user) {
        const userDoc = await window.firebaseApp.db.collection("users").doc(user.uid).get();
        const userData = userDoc.data();
        if (userData && userData.storeCreated) {
          const phone = userData.storePhone ? userData.storePhone.trim() : '';
          const hasRealPhone = phone.length > 5 && phone.split(' ').some(part => part.length > 2);
          if (!hasRealPhone) {
            setTimeout(() => {
              if (confirm('Your store is missing a contact phone number. Stores without phone numbers will not be featured on the homepage. Would you like to add it now?')) {
                window.location.href = 'store-profile.html';
              }
            }, 2000);
          }
        }
      }

      const snapshot = await window.firebaseApp.db.collection('listings').get();
      
      // Normalize category names to prevent duplicates like "Electronics" and "electronics"
      this.allListings = snapshot.docs.map(doc => {
          const data = doc.id ? { id: doc.id, ...doc.data() } : doc.data();
          if (data.category) {
              data.category = data.category.trim();
              // Capitalize first letter of each word for consistency
              data.category = data.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
          }
          return data;
      });

      this.currentPage = 1;

      this.renderCategoryTabs();
      this.renderFeed();
      this.startGlobalTimers();
      
      const currentUser = window.firebaseApp.auth.currentUser;
      if (currentUser) {
          const userDoc = await window.firebaseApp.db.collection("users").doc(currentUser.uid).get();
          const points = (userDoc.data() && userDoc.data().points) || 0;
          const display = document.getElementById("navPoints");
          if (display) display.textContent = points;
      }

      document.getElementById('loadingState').classList.add('hidden');
      
      // Fetch stores in the background (non-blocking)
      this.fetchAndRenderStores().catch(e => console.error('Error loading stores:', e));
    } catch (e) { 
      console.error('Error:', e);
      document.getElementById('loadingState').classList.add('hidden');
    }
  },

  handleSearch(val) {
    this.searchQuery = val;
    this.currentPage = 1;
    this.renderFeed();
  },

  renderFeed() {
    let listings = this.allListings;
    
    // Track daily impressions
    const todayKey = (id) => `lastDailyImpression_${id}`;
    listings.forEach(item => {
      try {
        const last = localStorage.getItem(todayKey(item.id));
        const today = new Date().toISOString().slice(0,10);
        if (last !== today) {
          try {
            const pending = JSON.parse(localStorage.getItem('pendingMetrics') || '[]');
            pending.push({ type: 'impression', itemId: item.id, count: 5, ts: Date.now() });
            localStorage.setItem('pendingMetrics', JSON.stringify(pending));
            localStorage.setItem(todayKey(item.id), today);
          } catch (e) { console.error('Error queueing daily impression:', e); }
        }
      } catch (e) { /* localStorage may be unavailable; skip */ }
    });

    if (this.currentCategory !== 'All') {
      listings = listings.filter(item => item.category === this.currentCategory);
    }
    if (this.currentPriceFilter !== 'all') {
      let min = 0;
      let max = Number.POSITIVE_INFINITY;
      if (this.currentPriceFilter.includes('+')) {
        min = Number(this.currentPriceFilter.replace('+', '')) || 0;
      } else {
        [min, max] = this.currentPriceFilter.split('-').map(v => Number(v) || 0);
      }
      listings = listings.filter(item => {
        const price = Number(item.price || 0);
        return price >= min && price <= max;
      });
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      listings = listings.filter(item => (item.title||'').toLowerCase().includes(q));
    }

    const now = Date.now();
    const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

    // Visibility Rules
    const activeListings = listings.filter(item => {
        if (!item.imageUrl || item.imageUrl.trim() === "" || item.imageUrl.includes("placeholder")) {
            return false;
        }

        const createdAt = item.createdAt?.seconds ? item.createdAt.seconds * 1000 : (item.createdAt || 0);
        const isWithin90Days = (now - createdAt) <= NINETY_DAYS_MS;
        
        const isNotExpired = (item.promotionEndDate === 0 || !item.promotionEndDate || this.normalizePromotionEnd(item.promotionEndDate) > now);
        
        if ('isLive' in item) {
            const paymentApproved = item.paymentStatus === 'successful' || item.paymentStatus === 'not-required' || item.paymentStatus === 'free' || item.paymentStatus === 'points';
            return item.isLive === true && paymentApproved && isWithin90Days;
        }
        
        return isWithin90Days;
    });

    const flashSales = activeListings.filter(item => item.isFlashSale && this.normalizePromotionEnd(item.promotionEndDate) > now);
    
    let regular = activeListings.filter(item => !item.isFlashSale);

    regular.sort((a, b) => {
        const aPromoEnd = this.normalizePromotionEnd(a.promotionEndDate);
        const bPromoEnd = this.normalizePromotionEnd(b.promotionEndDate);
        const aIsActive = aPromoEnd > now;
        const bIsActive = bPromoEnd > now;

        if (aIsActive && !bIsActive) return -1;
        if (!aIsActive && bIsActive) return 1;

        const aTime = a.createdAt?.seconds || a.createdAt || 0;
        const bTime = b.createdAt?.seconds || b.createdAt || 0;
        return bTime - aTime;
    });

    const flashContainer = document.getElementById('flashSaleContainer');
    if (flashContainer) {
        flashContainer.innerHTML = flashSales.map(item => this.renderFlashCard(item)).join('');
        document.getElementById('flashSaleSection').classList.toggle('hidden', flashSales.length === 0);
    }

    const promoted = regular.filter(item => item.isPromoted && this.normalizePromotionEnd(item.promotionEndDate) > now);
    const promotedContainer = document.getElementById('promotedContainer');
    if (promotedContainer) {
        promotedContainer.innerHTML = promoted.map(item => this.renderCard(item, true)).join('');
        document.getElementById('promotedSection').classList.toggle('hidden', promoted.length === 0);
    }

    if (!this.searchQuery) {
        regular = this.applySorting(regular);
    }

    const feedContainer = document.getElementById('feedContainer');
    const totalPages = Math.max(1, Math.ceil(regular.length / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;
    const start = (this.currentPage - 1) * this.pageSize;
    const pageItems = regular.slice(start, start + this.pageSize);
    
    feedContainer.innerHTML = pageItems.map(item => this.renderCard(item, item.isPromoted)).join('');
    this.renderPagination(totalPages);

    document.getElementById('emptyState').classList.toggle('hidden', pageItems.length > 0 || promoted.length > 0 || flashSales.length > 0);
  },

  normalizePromotionEnd(val) {
      if (!val) return 0;
      if (val.toMillis) return val.toMillis();
      if (val.seconds) return val.seconds * 1000;
      return val;
  },

  renderPagination(totalPages) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    
    let html = `
      <button onclick="window.feedModule.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''} class="nav-btn">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
        <span class="hidden sm:inline">Prev</span>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        html += `<button onclick="window.feedModule.goToPage(${i})" class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        html += `<span class="px-2 text-slate-400 font-black">...</span>`;
      }
    }

    html += `
      <button onclick="window.feedModule.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''} class="nav-btn">
        <span class="hidden sm:inline">Next</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M9 5l7 7-7 7"/></svg>
      </button>
    `;

    container.innerHTML = html;
  },

  goToPage(page) {
    this.currentPage = page;
    this.renderFeed();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  getCurrencySymbol(code) {
    const symbols = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦',
      'GHS': '₵', 'ZAR': 'R', 'KES': 'Sh', 'UGX': 'Sh',
      'EGP': 'E£', 'INR': '₹', 'JPY': '¥', 'CNY': '¥',
      'AUD': 'A$', 'CAD': 'C$', 'CHF': 'CHF', 'AED': 'د.إ',
      'SAR': 'ر.س', 'BRL': 'R$', 'RUB': '₽', 'TRY': '₺',
      'KWD': 'د.ك', 'QAR': 'ر.ق', 'PKR': 'Rs', 'IDR': 'Rp',
      'MYR': 'RM'
    };
    return symbols[code] || '₦';
  },

  renderCard(item, isPromoted) {
    const symbol = this.getCurrencySymbol(item.currency || item.currencyCode);
    const now = Date.now();
    const promotionEnd = this.normalizePromotionEnd(item.promotionEndDate);
    const isActuallyPromoted = isPromoted && promotionEnd > now;
    
    const originalPrice = item.originalPrice || 0;
    const currentPrice = item.price || 0;
    const hasDiscount = originalPrice > currentPrice;
    const discountPercent = item.discountPercentage || (hasDiscount ? Math.round((1 - currentPrice/originalPrice) * 100) : 0);
    
    const storeLink = item.storeSlug ? `store-view.html?storeSlug=${encodeURIComponent(item.storeSlug)}` : null;
    const storeName = item.storeName || 'Unknown Store';
    
    return `
      <div class="bg-white rounded shadow-sm p-2 cursor-pointer hover:shadow-md transition" onclick="window.feedModule.trackClick('${item.id}')">
        <div class="aspect-square mb-2 bg-slate-50 flex items-center justify-center overflow-hidden relative">
            <img src="${item.imageUrl}" class="w-full h-full object-contain" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
            ${hasDiscount ? `<span class="absolute top-1 right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">-${discountPercent}%</span>` : ''}
        </div>
        <h3 class="text-[10px] font-bold truncate uppercase text-slate-800">${item.title}</h3>
        <div class="mt-1 flex flex-col">
            ${hasDiscount ? `<p class="text-[9px] text-slate-400 line-through font-bold">${symbol}${originalPrice.toLocaleString()}</p>` : ''}
            <p class="font-black text-sm ${hasDiscount ? 'text-red-600' : 'text-slate-900'}">${symbol}${currentPrice.toLocaleString()}</p>
        </div>
        ${storeLink ? `
          <div class="mt-2 pt-2 border-t border-slate-100">
            <a href="${storeLink}" onclick="event.stopPropagation()" class="text-[8px] text-blue-600 font-bold hover:text-blue-800 hover:underline flex items-center gap-1">
              🏪 ${storeName}
            </a>
          </div>
        ` : ''}
        ${isActuallyPromoted ? `
          <div class="mt-1 flex items-center justify-between">
            <span class="text-[7px] bg-orange-500 text-white px-1 py-0.5 rounded font-black uppercase">Promoted</span>
            <span class="text-[8px] font-black text-slate-400 countdown-timer" data-end="${promotionEnd}"></span>
          </div>
        ` : ''}
      </div>`;
  },

  renderFlashCard(item) {
    const symbol = this.getCurrencySymbol(item.currency || item.currencyCode);
    const now = Date.now();
    const promotionEnd = this.normalizePromotionEnd(item.promotionEndDate);
    const isActive = promotionEnd > now;
    
    const originalPrice = item.originalPrice || 0;
    const currentPrice = item.price || 0;
    const hasDiscount = originalPrice > currentPrice;
    const discountPercent = item.discountPercentage || (hasDiscount ? Math.round((1 - currentPrice/originalPrice) * 100) : 0);
    
    const storeLink = item.storeSlug ? `store-view.html?storeSlug=${encodeURIComponent(item.storeSlug)}` : null;
    const storeName = item.storeName || 'Unknown Store';
    
    return `
      <div class="min-w-[120px] bg-white rounded p-2 border hover:shadow-sm transition" onclick="window.feedModule.trackClick('${item.id}')">
        <div class="aspect-square mb-1 relative">
            <img src="${item.imageUrl}" class="w-full h-full object-contain">
            ${hasDiscount ? `<span class="absolute top-0 right-0 bg-red-600 text-white text-[7px] font-black px-1 py-0.5 rounded">-${discountPercent}%</span>` : ''}
        </div>
        <p class="text-[9px] font-bold truncate text-slate-700 uppercase">${item.title}</p>
        <div class="flex flex-col">
            ${hasDiscount ? `<p class="text-[8px] text-slate-400 line-through font-bold">${symbol}${originalPrice.toLocaleString()}</p>` : ''}
            <p class="text-xs font-black text-red-600">${symbol}${currentPrice.toLocaleString()}</p>
        </div>
        ${storeLink ? `
          <div class="mt-1 pt-1 border-t border-slate-100">
            <a href="${storeLink}" onclick="event.stopPropagation()" class="text-[7px] text-blue-600 font-bold hover:text-blue-800 hover:underline">
              🏪 ${storeName}
            </a>
          </div>
        ` : ''}
        <div class="mt-1">
            <span class="text-[8px] font-black text-red-500 countdown-timer" data-end="${promotionEnd}"></span>
        </div>
      </div>`;
  },



  renderCategoryTabs() {
    const categories = ['All', ...new Set(this.allListings.map(item => item.category).filter(Boolean))];

    const select = document.getElementById('categoryFilter');
    const mobileSelect = document.getElementById('mobileCategoryFilter');
    const options = categories.map(cat => `
      <option value="${cat}">${cat}</option>
    `).join('');
    if (select) {
      select.innerHTML = options;
      select.value = this.currentCategory;
    }
    if (mobileSelect) {
      mobileSelect.innerHTML = options;
      mobileSelect.value = this.currentCategory;
    }
  },

  filterByCategory(cat) {
    this.currentCategory = cat;
    this.currentPage = 1;

    this.renderCategoryTabs();
    this.renderFeed();
  },

  handleCategoryFilter(cat) {
    this.filterByCategory(cat);
  },

  handlePriceFilter(value) {
    this.currentPriceFilter = value;
    this.currentPage = 1;
    this.renderFeed();
  },

  handleSort(value) {
    this.currentSort = value;
    this.currentPage = 1;
    this.renderFeed();
  },

  applySorting(listings) {
    const sorted = [...listings];
    switch (this.currentSort) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'popularity':
        return sorted.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));
      case 'newest':
      default:
        return sorted.sort((a, b) => (b.createdAt?.seconds || b.createdAt || 0) - (a.createdAt?.seconds || a.createdAt || 0));
    }
  },

  async trackClick(itemId) {
    const detailUrl = `item-detail.html?id=${itemId}`;
    try {
      if (window.localStorage) {
        try {
          const pending = JSON.parse(localStorage.getItem('pendingMetrics') || '[]');
          pending.push({ type: 'click', itemId, count: 1, ts: Date.now() });
          localStorage.setItem('pendingMetrics', JSON.stringify(pending));
        } catch (e) {
          console.error('Error queueing pending metric:', e);
        }
      }
      window.firebaseApp.db.collection('listings').doc(itemId).update({
        clicks: firebase.firestore.FieldValue.increment(1)
      }).catch(e => console.error("Error tracking click:", e));
    } catch (e) { console.error("Error in trackClick:", e); }
    window.location.href = detailUrl;
  },

  async fetchAndRenderStores() {
    try {
      const storesContainer = document.getElementById('storesContainer');
      const featuredStoresSection = document.getElementById('featuredStoresSection');
      if (!storesContainer || !featuredStoresSection) return;

      const snapshot = await window.firebaseApp.db.collection('users')
        .where('storeCreated', '==', true)
        .limit(12)
        .get();

      if (snapshot.empty) {
        featuredStoresSection.classList.add('hidden');
        return;
      }

      const stores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(store => {
          const phone = store.storePhone ? store.storePhone.trim() : '';
          const hasRealPhone = phone.length > 5 && phone.split(' ').some(part => part.length > 2);
          return store.storeName && store.storeEmail && hasRealPhone;
        });

      if (stores.length === 0) {
        featuredStoresSection.classList.add('hidden');
        return;
      }

      featuredStoresSection.classList.remove('hidden');
      storesContainer.innerHTML = stores.map(store => this.renderStoreCard(store)).join('');
    } catch (e) {
      console.error('Error fetching stores:', e);
      const featuredStoresSection = document.getElementById('featuredStoresSection');
      if (featuredStoresSection) {
        featuredStoresSection.classList.add('hidden');
      }
    }
  },

  renderStoreCard(store) {
    const initials = store.storeInitial || (store.storeName || 'S').charAt(0).toUpperCase();
    const storeLink = `store-view.html?storeSlug=${encodeURIComponent(store.storeSlug)}`;
    
    return `
      <div class="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:shadow-md transition cursor-pointer" onclick="location.href='${storeLink}'">
        <div class="flex items-center gap-4 mb-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl overflow-hidden flex-shrink-0 shadow-sm">
            ${store.storeProfileImage ? `<img src="${store.storeProfileImage}" class="w-full h-full object-cover">` : initials}
          </div>
          <div class="min-w-0">
            <h3 class="font-black text-slate-900 truncate uppercase text-sm">${store.storeName}</h3>
            <p class="text-[10px] text-blue-600 font-bold uppercase tracking-widest">${store.storeCategory || 'General Store'}</p>
          </div>
        </div>
        
        <div class="space-y-1.5 border-t border-slate-200 pt-3">
          <div class="flex items-center gap-2 text-slate-600">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="text-[10px] font-bold truncate">${store.storeEmail}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-600">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span class="text-[10px] font-bold">${store.storePhone}</span>
          </div>
        </div>
        
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center gap-1">
            <span class="text-xs font-black text-slate-900">${store.totalProducts || 0}</span>
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Items</span>
          </div>
          <button class="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Store →</button>
        </div>
      </div>
    `;
  },

  startGlobalTimers() {
    if (this.timerIntervalId) clearInterval(this.timerIntervalId);
    this.timerIntervalId = setInterval(() => {
        document.querySelectorAll('.countdown-timer').forEach(el => {
            const end = parseInt(el.getAttribute('data-end'));
            const diff = end - Date.now();
            if (diff <= 0) { el.textContent = "EXPIRED"; return; }
            const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
            el.textContent = `${h}h ${m}m ${s}s`;
        });
    }, 1000);
  }
};

window.feedModule.fetchAndRender();
