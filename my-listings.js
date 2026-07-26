/**
 * Professional Listings Management Module
 * KentaiMIA - Dashboard Controller
 * STORE FEATURE: Added store info display
 */

const ListingManager = {
    listings: [],
    currentUser: null,
    storeInfo: null,
    
    async init() {
        window.firebaseApp.auth.onAuthStateChanged(async (user) => {
            if (!user) {
                console.warn("[Auth] No user session found, redirecting...");
                window.location.href = 'auth.html';
                return;
            }
            this.currentUser = user;
            console.log(`[Dashboard] Initializing for user: ${user.uid}`);
            
            // STORE FEATURE: Load store info (NEW)
            await this.loadStoreInfo();
            
            this.toggleLoader(true);
            await this.refreshData();
            this.toggleLoader(false);
        });
    },

    // STORE FEATURE: Load store information (NEW)
    async loadStoreInfo() {
        try {
            const userDoc = await window.firebaseApp.db.collection('users').doc(this.currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.storeCreated) {
                    this.storeInfo = userData;
                    console.log(`[Store] User has store: ${userData.storeName}`);
                } else {
                    console.log(`[Store] User does not have a store yet`);
                    this.storeInfo = null;
                }
            }
        } catch (e) {
            console.error('Error loading store info:', e);
        }
    },

    async refreshData() {
        try {
            // 1. Fetch products owned by the current user
            // We use a clean query to ensure maximum compatibility
            const listingsRef = window.firebaseApp.db.collection('listings');
            const snapshot = await listingsRef.where('ownerId', '==', this.currentUser.uid).get();
            
            console.log(`[Firestore] Found ${snapshot.size} products for this user.`);
            
            if (snapshot.empty) {
                this.listings = [];
                this.render();
                return;
            }

            // 2. Map data and prepare for display
            // STRICT FOR NEW PRODUCTS, BACKWARD-COMPATIBLE FOR EXISTING:
            let listings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(item => {
                // For NEW products (have isLive field): must be paid
                if ('isLive' in item) {
                    const paymentApproved = item.paymentStatus === 'successful' || item.paymentStatus === 'not-required' || item.paymentStatus === 'free' || item.paymentStatus === 'points';
                    return item.isLive === true && paymentApproved;
                }
                // For LEGACY products: show as usual
                return true;
            });
            
            // 3. Enrich with average ratings
            this.listings = await Promise.all(listings.map(async (item) => {
                try {
                    const reviewsSnapshot = await window.firebaseApp.db.collection('listings')
                        .doc(item.id).collection('reviews').get();
                    
                    if (!reviewsSnapshot.empty) {
                        const reviews = reviewsSnapshot.docs.map(doc => doc.data());
                        const avgRating = (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1);
                        return { ...item, avgRating, reviewCount: reviews.length };
                    }
                    return { ...item, avgRating: 0, reviewCount: 0 };
                } catch (e) {
                    return { ...item, avgRating: 0, reviewCount: 0 };
                }
            }));
            
            // 4. Fetch total UNREAD Q&A messages count (matching questions-replies.html logic)
            let totalUnreadMessages = 0;
            await Promise.all(this.listings.map(async (item) => {
                try {
                    const messagesSnapshot = await window.firebaseApp.db.collection('listings')
                        .doc(item.id).collection('messages').get();
                    if (!messagesSnapshot.empty) {
                        const messages = messagesSnapshot.docs.map(m => m.data());
                        const unread = messages.filter(m => !m.isRead).length;
                        totalUnreadMessages += unread;
                    }
                } catch (e) {
                    console.error("Error fetching message count for item:", item.id, e);
                }
            }));
            this.totalUnreadMessages = totalUnreadMessages;

            // 5. Sort by newest first
            this.listings.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            
            this.render();
        } catch (error) {
            console.error("[Dashboard Error] Failed to refresh data:", error);
            this.showError("An error occurred while loading your products. Please refresh the page.");
        }
    },

    render() {
        const table = document.getElementById('listingsTable');
        const emptyState = document.getElementById('emptyState');
        const activeCount = document.getElementById('activeCount');
        const qaMessageCount = document.getElementById('qaMessageCount');
        
        if (!table) return;

        // STORE FEATURE: Display store info banner if user has a store (NEW)
        let storeInfoHtml = '';
        if (this.storeInfo && this.storeInfo.storeCreated) {
            storeInfoHtml = `
                <div style="padding: 16px 24px; background-color: #f0f9ff; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Your Store</p>
                        <p style="font-size: 16px; color: #1e293b; font-weight: 700;">${this.storeInfo.storeName}</p>
                        <p style="font-size: 12px; color: #64748b; margin-top: 4px;">📦 ${this.storeInfo.totalProducts || 0} Products | 👥 ${this.storeInfo.followers || 0} Followers</p>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="window.open('store-view.html?storeSlug=${encodeURIComponent(this.storeInfo.storeSlug)}', '_blank')" style="padding: 8px 16px; background-color: #3b82f6; color: white; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer; border: none;">View Store</button>
                        <button onclick="location.href='store-profile.html'" style="padding: 8px 16px; background-color: #10b981; color: white; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer; border: none;">Edit Store</button>
                    </div>
                </div>
            `;
        }

        // Update Counter
        if (activeCount) activeCount.textContent = this.listings.length;
        if (qaMessageCount) {
            const indicator = document.getElementById('qaIndicatorContainer');
            const notificationText = document.getElementById('qaNotificationText');
            const colorIndicatorEl = indicator ? indicator.querySelector('.color-indicator') : null;
            
            qaMessageCount.style.display = 'inline-flex';
            if (indicator) indicator.style.display = 'flex';
            
            qaMessageCount.textContent = this.totalUnreadMessages || 0;
            
            if (this.totalUnreadMessages > 0) {
                qaMessageCount.classList.remove('bg-slate-100', 'text-slate-500');
                qaMessageCount.classList.add('bg-red-500', 'text-white');
                
                // Show notification text and animate the circle
                if (notificationText) notificationText.classList.remove('hidden');
                if (colorIndicatorEl) colorIndicatorEl.classList.add('has-messages');
            } else {
                qaMessageCount.classList.add('bg-slate-100', 'text-slate-500');
                qaMessageCount.classList.remove('bg-red-500', 'text-white');
                
                // Hide notification text and stop animation when no unread messages
                if (notificationText) notificationText.classList.add('hidden');
                if (colorIndicatorEl) colorIndicatorEl.classList.remove('has-messages');
            }
            
            // Reset qaCleared flag if new unread messages arrive
            const isQACleared = localStorage.getItem('qaCleared') === 'true';
            if (this.totalUnreadMessages > 0 && isQACleared) {
                localStorage.removeItem('qaCleared');
            }
        }

        // Sync unread count to sessionStorage for cross-page consistency
        if (window.firebaseApp && window.firebaseApp.auth && window.firebaseApp.auth.currentUser) {
            sessionStorage.setItem('unreadMessageCount', this.totalUnreadMessages || 0);
        }

        // Handle Empty State
        if (this.listings.length === 0) {
            table.innerHTML = storeInfoHtml;
            emptyState?.classList.remove('hidden');
            return;
        }

        emptyState?.classList.add('hidden');
        
        // Generate Professional Table Rows
        const listingsHtml = this.listings.map(item => {
            const symbol = this.getCurrencySymbol(item.currency || item.currencyCode);
            const date = new Date(item.createdAt).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
            });
            const price = (item.price || 0).toLocaleString();
            const avgRating = item.avgRating || 0;
            const ratingStars = '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating));

            return `
            <div class="grid grid-cols-12 px-3 sm:px-6 py-3 sm:py-4 items-center hover:bg-slate-50 transition-colors group border-b border-slate-100">
                <!-- Product Thumbnail & Info -->
                <div class="col-span-5 sm:col-span-4 flex items-center gap-2 sm:gap-4">
                    <div class="w-10 h-8 sm:w-12 sm:h-10 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                        <img src="${item.imageUrl || 'https://via.placeholder.com/100'}" 
                             class="w-full h-full object-cover" 
                             onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
                    </div>
                    <div class="min-w-0">
                        <h3 class="text-xs sm:text-sm font-bold text-slate-800 truncate hover:text-orange-600 cursor-pointer" 
                            onclick="location.href='item-detail.html?id=${item.id}'">
                            ${item.title}
                        </h3>
                        <p class="text-[8px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest truncate">${item.category || 'Uncategorized'}</p>
                    </div>
                </div>
                
                <!-- Rating Column -->
                <div class="col-span-2 text-center">
                    <div class="flex items-center justify-center gap-0.5">
                        <span class="text-xs sm:text-lg text-yellow-500 font-black">${ratingStars}</span>
                    </div>
                    <p class="text-[8px] sm:text-[9px] text-slate-400 font-bold">${avgRating > 0 ? avgRating : '-'}</p>
                </div>
                
                <!-- Date Posted Column (Hidden on mobile) -->
                <div class="col-span-2 text-center text-[8px] sm:text-[10px] font-bold text-slate-600 hidden sm:block">${date}</div>
                
                <!-- Financial Column -->
                <div class="col-span-2 sm:col-span-1 text-center text-[10px] sm:text-sm font-black text-slate-900">${symbol}${price}</div>

                <!-- Professional Action Bar -->
                <div class="col-span-3 flex justify-end gap-0.5 sm:gap-1 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="location.href='edit.html?id=${item.id}'" class="p-1 sm:p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit Product">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="ListingManager.openDeleteConfirm('${item.id}')" class="p-1 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Product">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                    <button onclick="location.href='item-detail.html?id=${item.id}'" class="p-1 sm:p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition" title="View Product Page">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                </div>
            </div>`;
        }).join('');
        
        table.innerHTML = storeInfoHtml + listingsHtml;
    },

    getCurrencySymbol(code) {
        const symbols = {
            'USD': '$', 'EUR': '€', 'GBP': '£', 'NGN': '₦',
            'GHS': '₵', 'ZAR': 'R', 'KES': 'Sh', 'UGX': 'Sh',
            'EGP': 'E£', 'INR': '₹', 'JPY': '¥', 'CNY': '¥',
            'AED': 'د.إ', 'SAR': 'ر.س', 'PKR': 'Rs'
        };
        return symbols[code] || '₦';
    },

    toggleLoader(show) {
        const loader = document.getElementById('loadingState');
        if (loader) loader.classList.toggle('hidden', !show);
    },

    showError(msg) {
        alert(msg);
    },

    openDeleteConfirm(listingId) {
        this.listingToDelete = listingId;
        const modal = document.getElementById('deleteModal');
        if (modal) modal.classList.remove('hidden');
    },

    cancelDelete() {
        this.listingToDelete = null;
        const modal = document.getElementById('deleteModal');
        if (modal) modal.classList.add('hidden');
    },

    async confirmDelete() {
        if (!this.listingToDelete) return;
        try {
            await window.firebaseApp.db.collection('listings').doc(this.listingToDelete).delete();
            this.cancelDelete();
            await this.refreshData();
        } catch (error) {
            console.error("[Delete Error]", error);
            this.showError("Could not delete product. Please try again.");
        }
    }
};

// Global Exposure for HTML compatibility
window.renderListings = () => ListingManager.refreshData();
window.openDeleteConfirm = (id) => ListingManager.openDeleteConfirm(id);
window.cancelDelete = () => ListingManager.cancelDelete();
window.confirmDelete = () => ListingManager.confirmDelete();

// Initialize on Load
window.addEventListener('load', () => ListingManager.init());