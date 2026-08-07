/**
 * Firebase Configuration Module (Compat Version)
 * STORE FEATURE: Added Store helper functions
 */
// 1. Your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyAmuzErHIOkV_OFiJOZit2DQGne2AL4fsA",
  authDomain: "swap-shop-df97c.firebaseapp.com",
  projectId: "swap-shop-df97c",
  storageBucket: "swap-shop-df97c.firebasestorage.app",
  messagingSenderId: "524221863641",
  appId: "1:524221863641:web:05160cdb8a6358bf5790c8"
};

// 2. Initialize Firebase
// This works because we are using the -compat.js scripts in our HTML
firebase.initializeApp(firebaseConfig);

// 3. Initialize Services
const auth = firebase.auth();
const db = firebase.firestore();

// 4. Export to window so auth.js and other files can see them
window.firebaseApp = {
  auth: auth,
  db: db,
  getCurrentUser: () => auth.currentUser,
  isUserAuthenticated: () => auth.currentUser !== null,
  signOutUser: () => auth.signOut()
};

// Flush any pending metrics stored in localStorage when a user becomes available
window.flushPendingMetrics = async function() {
  try {
    if (!window.localStorage) return;
    const raw = localStorage.getItem('pendingMetrics');
    if (!raw) return;
    const pending = JSON.parse(raw || '[]');
    if (!Array.isArray(pending) || pending.length === 0) return;
    const toKeep = [];
    for (const m of pending) {
      try {
        const field = (m.type === 'click' ? 'clicks' : (m.type === 'impression' ? 'impressions' : m.type + 's'));
        // 1) update aggregate counter on the listing
        await db.collection('listings').doc(m.itemId).update({
          [field]: firebase.firestore.FieldValue.increment(m.count || 1)
        });
        // 2) Also record a per-day metric document under listings/{id}/metrics/{YYYY-MM-DD}
        try {
          const d = new Date(m.ts || Date.now());
          const dateKey = d.toISOString().slice(0,10); // YYYY-MM-DD
          const metricsRef = db.collection('listings').doc(m.itemId).collection('metrics').doc(dateKey);
          // Use set with merge so we create the doc if missing and increment the counter
          await metricsRef.set({ [field]: firebase.firestore.FieldValue.increment(m.count || 1) }, { merge: true });
        } catch (e) {
          // don't fail the whole operation if per-day logging fails
          console.error('Failed writing per-day metric', m, e);
        }
      } catch (e) {
        console.error('Failed sending pending metric', m, e);
        toKeep.push(m);
      }
    }
    if (toKeep.length) localStorage.setItem('pendingMetrics', JSON.stringify(toKeep));
    else localStorage.removeItem('pendingMetrics');
  } catch (e) {
    console.error('flushPendingMetrics error', e);
  }
};

// Helper: get listing impressions/clicks totals for last `days` days
window.firebaseApp.getListingImpressions = async function(listingId, days = 7) {
  try {
    const results = { impressions: 0, clicks: 0 };
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dateKey = d.toISOString().slice(0,10);
      try {
        const doc = await db.collection('listings').doc(listingId).collection('metrics').doc(dateKey).get();
        if (doc.exists) {
          const data = doc.data();
          results.impressions += Number(data.impressions || 0);
          results.clicks += Number(data.clicks || 0);
        }
      } catch (e) {
        console.error('Error reading per-day metric', listingId, dateKey, e);
      }
    }
    return results;
  } catch (e) {
    console.error('getListingImpressions error', e);
    return { impressions: 0, clicks: 0 };
  }
};

// Daily reward helpers
const DAILY_REWARD_POINTS = 10;

function dailyRewardDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

function dailyRewardWeekDates(referenceDate) {
  const date = new Date(referenceDate);
  const mondayOffset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(date);
    day.setDate(date.getDate() + index);
    return dailyRewardDateKey(day);
  });
}

function dailyRewardReclaimableDates(claimedDates, referenceDate) {
  const todayKey = dailyRewardDateKey(referenceDate);
  return dailyRewardWeekDates(referenceDate)
    .filter(dateKey => dateKey < todayKey && !claimedDates[dateKey])
    .reduce((result, dateKey) => {
      result[dateKey] = true;
      return result;
    }, {});
}

window.firebaseApp.getDailyRewardState = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  const snapshot = await db.collection('users').doc(user.uid).get();
  const data = snapshot.exists ? snapshot.data() : {};
  const claimedDates = (data.dailyRewards && data.dailyRewards.claimedDates) || {};
  const uploadedDates = (data.dailyRewards && data.dailyRewards.uploadedDates) || {};
  return {
    points: Number(data.points || 0),
    claimedDates,
    uploadedDates,
    reclaimableDates: dailyRewardReclaimableDates(claimedDates, new Date())
  };
};

window.firebaseApp.claimDailyReward = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const dateKey = dailyRewardDateKey(new Date());
  const userRef = db.collection('users').doc(user.uid);
  let result;

  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(userRef);
    const data = snapshot.exists ? snapshot.data() : {};
    const dailyRewards = data.dailyRewards || {};
    const claimedDates = { ...(dailyRewards.claimedDates || {}) };
    const currentPoints = Number(data.points || 0);

    if (claimedDates[dateKey]) {
      result = {
        alreadyClaimed: true,
        points: currentPoints,
        claimedDates,
        uploadedDates: (dailyRewards.uploadedDates || {}),
        reclaimableDates: dailyRewardReclaimableDates(claimedDates, new Date())
      };
      return;
    }

    claimedDates[dateKey] = true;
    const points = currentPoints + DAILY_REWARD_POINTS;
    transaction.set(userRef, {
      points,
      dailyRewards: {
        claimedDates,
        lastClaimedDate: dateKey,
        updatedAt: firebase.firestore.Timestamp.now()
      }
    }, { merge: true });
    result = {
      alreadyClaimed: false,
      points,
      claimedDates,
      uploadedDates: dailyRewards.uploadedDates || {},
      reclaimableDates: dailyRewardReclaimableDates(claimedDates, new Date())
    };
  });

  return result;
};

// Call this only after a product has been successfully written to `listings`.
// This unlocks the exact missed date selected by the user; it does not award points yet.
window.firebaseApp.markMissedDailyRewardUploaded = async function(dateKey) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const now = new Date();
  const todayKey = dailyRewardDateKey(now);
  if (!dailyRewardWeekDates(now).includes(dateKey) || dateKey >= todayKey) {
    throw new Error('Invalid missed reward date');
  }

  const userRef = db.collection('users').doc(user.uid);
  let result;
  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(userRef);
    const data = snapshot.exists ? snapshot.data() : {};
    const dailyRewards = data.dailyRewards || {};
    const claimedDates = { ...(dailyRewards.claimedDates || {}) };
    const uploadedDates = { ...(dailyRewards.uploadedDates || {}) };

    if (claimedDates[dateKey]) {
      result = { uploaded: false, alreadyClaimed: true };
      return;
    }

    uploadedDates[dateKey] = true;
    transaction.set(userRef, {
      dailyRewards: {
        ...dailyRewards,
        uploadedDates,
        updatedAt: firebase.firestore.Timestamp.now()
      }
    }, { merge: true });
    result = { uploaded: true, dateKey, uploadedDates };
  });
  return result;
};

// Awards the exact missed date only after that date has been unlocked by upload.
window.firebaseApp.claimMissedDailyRewardForDate = async function(dateKey) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const now = new Date();
  const todayKey = dailyRewardDateKey(now);
  if (!dailyRewardWeekDates(now).includes(dateKey) || dateKey >= todayKey) {
    throw new Error('Invalid missed reward date');
  }

  const userRef = db.collection('users').doc(user.uid);
  let result;
  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(userRef);
    const data = snapshot.exists ? snapshot.data() : {};
    const dailyRewards = data.dailyRewards || {};
    const claimedDates = { ...(dailyRewards.claimedDates || {}) };
    const uploadedDates = { ...(dailyRewards.uploadedDates || {}) };
    const currentPoints = Number(data.points || 0);

    if (claimedDates[dateKey]) {
      result = { alreadyClaimed: true, points: currentPoints, claimedDates, uploadedDates };
      return;
    }
    if (!uploadedDates[dateKey]) throw new Error('Upload a product for this day first');

    claimedDates[dateKey] = true;
    delete uploadedDates[dateKey];
    const points = currentPoints + DAILY_REWARD_POINTS;
    transaction.set(userRef, {
      points,
      dailyRewards: {
        ...dailyRewards,
        claimedDates,
        uploadedDates,
        lastReclaimedDate: dateKey,
        updatedAt: firebase.firestore.Timestamp.now()
      }
    }, { merge: true });
    result = {
      alreadyClaimed: false,
      points,
      claimedDates,
      uploadedDates,
      reclaimableDates: dailyRewardReclaimableDates(claimedDates, new Date())
    };
  });
  return result;
};

// ============================================
// STORE FEATURE: Store Helper Functions (NEW)
// ============================================

// Create or update a store for the current user
window.firebaseApp.createStore = async function(storeData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const storeSlug = storeData.storeName.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 9);
    
    const storeInfo = {
      storeCreated: true,
      storeName: storeData.storeName,
      storeSlug: storeSlug,
      storeDescription: storeData.storeDescription || '',
      storeCategory: storeData.storeCategory || '',
      storePhone: storeData.storePhone || '',
      storeEmail: storeData.storeEmail || '',
      storeAddress: storeData.storeAddress || '',
      storeWebsite: storeData.storeWebsite || '',
      storeSocialLinks: storeData.storeSocialLinks || [],
      totalProducts: 0,
      followers: 0,
      storeRating: 0,
      storeReviews: 0,
      storeCreatedAt: firebase.firestore.Timestamp.now(),
      storeUpdatedAt: firebase.firestore.Timestamp.now()
    };
    
    await db.collection('users').doc(user.uid).update(storeInfo);
    return storeInfo;
  } catch (e) {
    console.error('Error creating store:', e);
    throw e;
  }
};

// Get store by slug
window.firebaseApp.getStoreBySlug = async function(storeSlug) {
  try {
    const snapshot = await db.collection('users').where('storeSlug', '==', storeSlug).limit(1).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  } catch (e) {
    console.error('Error fetching store:', e);
    return null;
  }
};

// Get all products from a store
window.firebaseApp.getStoreProducts = async function(storeSlug) {
  try {
    const store = await window.firebaseApp.getStoreBySlug(storeSlug);
    if (!store) return [];
    
    const snapshot = await db.collection('listings').where('storeSlug', '==', storeSlug).get();
    const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // STRICT FOR NEW PRODUCTS, BACKWARD-COMPATIBLE FOR EXISTING:
    return allProducts.filter(item => {
      // For NEW products (have isLive field): must be paid
      if ('isLive' in item) {
        const paymentApproved = item.paymentStatus === 'successful' || item.paymentStatus === 'not-required' || item.paymentStatus === 'free' || item.paymentStatus === 'points';
        return item.isLive === true && paymentApproved;
      }
      // For LEGACY products: show as usual
      return true;
    });
  } catch (e) {
    console.error('Error fetching store products:', e);
    return [];
  }
};

// Follow a store
window.firebaseApp.followStore = async function(storeSlug) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const store = await window.firebaseApp.getStoreBySlug(storeSlug);
    if (!store) throw new Error('Store not found');
    
    const followId = user.uid + '_' + store.id;
    
    await db.collection('storeFollowers').doc(followId).set({
      followerId: user.uid,
      storeId: store.id,
      storeSlug: storeSlug,
      followedAt: firebase.firestore.Timestamp.now()
    });
    
    // Increment followers count
    await db.collection('users').doc(store.id).update({
      followers: firebase.firestore.FieldValue.increment(1)
    });
    
    return true;
  } catch (e) {
    console.error('Error following store:', e);
    throw e;
  }
};

// Unfollow a store
window.firebaseApp.unfollowStore = async function(storeSlug) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const store = await window.firebaseApp.getStoreBySlug(storeSlug);
    if (!store) throw new Error('Store not found');
    
    const followId = user.uid + '_' + store.id;
    
    await db.collection('storeFollowers').doc(followId).delete();
    
    // Decrement followers count
    await db.collection('users').doc(store.id).update({
      followers: firebase.firestore.FieldValue.increment(-1)
    });
    
    return true;
  } catch (e) {
    console.error('Error unfollowing store:', e);
    throw e;
  }
};

// Check if user is following a store
window.firebaseApp.isFollowingStore = async function(storeSlug) {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    
    const store = await window.firebaseApp.getStoreBySlug(storeSlug);
    if (!store) return false;
    
    const followId = user.uid + '_' + store.id;
    const doc = await db.collection('storeFollowers').doc(followId).get();
    
    return doc.exists;
  } catch (e) {
    console.error('Error checking follow status:', e);
    return false;
  }
};

// Get store followers count
window.firebaseApp.getStoreFollowers = async function(storeSlug) {
  try {
    const store = await window.firebaseApp.getStoreBySlug(storeSlug);
    if (!store) return 0;
    
    const snapshot = await db.collection('storeFollowers').where('storeId', '==', store.id).get();
    return snapshot.size;
  } catch (e) {
    console.error('Error fetching followers:', e);
    return 0;
  }
};

// Update store information
window.firebaseApp.updateStore = async function(storeData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const updateData = {
      storeName: storeData.storeName || '',
      storeDescription: storeData.storeDescription || '',
      storeCategory: storeData.storeCategory || '',
      storePhone: storeData.storePhone || '',
      storeEmail: storeData.storeEmail || '',
      storeAddress: storeData.storeAddress || '',
      storeWebsite: storeData.storeWebsite || '',
      storeSocialLinks: storeData.storeSocialLinks || [],
      storeUpdatedAt: firebase.firestore.Timestamp.now()
    };
    
    await db.collection('users').doc(user.uid).update(updateData);
    return updateData;
  } catch (e) {
    console.error('Error updating store:', e);
    throw e;
  }
};

auth.onAuthStateChanged(user => {
  if (user) {
    // Try flushing queued metrics when a user is present
    try { window.flushPendingMetrics(); } catch (e) { console.error(e); }
  }
});

console.log("✓ Firebase initialized successfully with Store features");
