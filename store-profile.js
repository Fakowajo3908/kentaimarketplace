/**
 * Store Profile Module
 * Handles store management and settings
 */

let currentUser = null;
let currentStore = null;
let socialLinksCount = 0;
let profileImageBase64 = null;

function updateInitial(val) {
  const display = document.getElementById('initialDisplay');
  if (display) display.textContent = val || (currentStore ? (currentStore.storeName || 'S').charAt(0).toUpperCase() : 'S');
}

async function handleProfileImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const base64 = await compressImage(file);
    profileImageBase64 = base64;
    const preview = document.getElementById('profilePreview');
    preview.innerHTML = `<img src="${base64}" class="w-full h-full object-cover">`;
  } catch (e) {
    alert("Error processing image: " + e.message);
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
        const max = 400;
        if (width > max) { height = Math.round((height * max) / width); width = max; }
        if (height > max) { width = Math.round((width * max) / height); height = max; }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

// Initialize on page load
window.updateInitial = updateInitial;
window.handleProfileImageSelect = handleProfileImageSelect;
window.handleUpdateStore = handleUpdateStore;
window.addSocialLink = addSocialLink;
window.removeSocialLink = removeSocialLink;
window.copyStoreLink = copyStoreLink;
window.viewStore = viewStore;
window.deleteStore = deleteStore;
window.handleLogout = handleLogout;
window.goBack = goBack;

window.addEventListener('load', async () => {
  console.log('Store profile page loading...');
  
  // Wait for Firebase auth to be ready
  window.firebaseApp.auth.onAuthStateChanged(async (user) => {
    console.log('Auth state changed. User:', user ? user.uid : 'null');
    
    if (!user) {
      console.log('No user logged in, redirecting to auth');
      window.location.href = 'auth.html';
      return;
    }

    currentUser = user;
    console.log('Loading store data for user:', currentUser.uid);
    
    // Load store data
    await loadStoreData();
    displayStoreStats();
    await loadFollowers();
  });
});

/**
 * Load store data from Firestore
 */
async function loadStoreData() {
  try {
    console.log('Fetching store data from Firestore...');
    const userDoc = await window.firebaseApp.db.collection('users').doc(currentUser.uid).get();
    
    if (!userDoc.exists) {
      console.log('User document does not exist');
      alert('Error: User data not found. Please log in again.');
      window.location.href = 'auth.html';
      return;
    }

    const userData = userDoc.data();
    console.log('User data:', userData);
    
    if (!userData.storeCreated) {
      console.log('Store not created, redirecting to setup');
      window.location.href = 'store-setup.html';
      return;
    }

    currentStore = userData;
    console.log('Store data loaded:', currentStore);
    populateForm();

  } catch (e) {
    console.error('Error loading store:', e);
    alert('Error loading store: ' + e.message);
  }
}

/**
 * Populate form with current store data
 */
function populateForm() {
  console.log('Populating form with store data...');
  
  const storeName = document.getElementById('storeName');
  const storeSlugDisplay = document.getElementById('storeSlugDisplay');
  const storeDescription = document.getElementById('storeDescription');
  const storeCategory = document.getElementById('storeCategory');
  const storeCategoryCustom = document.getElementById('storeCategoryCustom');
  const storeEmail = document.getElementById('storeEmail');
  const storePhoneCountry = document.getElementById('storePhoneCountry');
  const storePhone = document.getElementById('storePhone');
  const storeAddress = document.getElementById('storeAddress');
  const storeWebsite = document.getElementById('storeWebsite');

  if (storeName) storeName.value = currentStore.storeName || '';
  if (storeSlugDisplay) storeSlugDisplay.value = currentStore.storeSlug || '';
  if (storeDescription) storeDescription.value = currentStore.storeDescription || '';
  
  // Handle category - check if it's in the list or custom
  if (storeCategory) {
    const categoryOptions = Array.from(storeCategory.options).map(opt => opt.value);
    if (categoryOptions.includes(currentStore.storeCategory)) {
      storeCategory.value = currentStore.storeCategory || '';
      if (storeCategoryCustom) storeCategoryCustom.value = '';
    } else {
      storeCategory.value = '';
      if (storeCategoryCustom) storeCategoryCustom.value = currentStore.storeCategory || '';
    }
  }
  
  if (storeEmail) storeEmail.value = currentStore.storeEmail || '';
  
  // Handle phone - split country code and number
  if (currentStore.storePhone) {
    const phoneParts = currentStore.storePhone.split(' ');
    if (phoneParts.length >= 2) {
      const countryCode = phoneParts[0];
      const phoneNumber = phoneParts.slice(1).join(' ');
      if (storePhoneCountry) storePhoneCountry.value = countryCode;
      if (storePhone) storePhone.value = phoneNumber;
    }
  }
  
  if (storeAddress) storeAddress.value = currentStore.storeAddress || '';
  if (storeWebsite) storeWebsite.value = currentStore.storeWebsite || '';
  
  // Populate profile customization
  const initialDisplay = document.getElementById('initialDisplay');
  const profilePreview = document.getElementById('profilePreview');
  const storeInitialInput = document.getElementById('storeInitial');
  
  if (storeInitialInput) storeInitialInput.value = currentStore.storeInitial || (currentStore.storeName || 'S').charAt(0).toUpperCase();
  if (initialDisplay) initialDisplay.textContent = currentStore.storeInitial || (currentStore.storeName || 'S').charAt(0).toUpperCase();
  
  if (currentStore.storeProfileImage && profilePreview) {
    profilePreview.innerHTML = `<img src="${currentStore.storeProfileImage}" class="w-full h-full object-cover">`;
    profileImageBase64 = currentStore.storeProfileImage;
  }

  // Populate social links
  const container = document.getElementById('socialLinksContainer');
  if (container) {
    container.innerHTML = '';
    if (currentStore.storeSocialLinks && currentStore.storeSocialLinks.length > 0) {
      currentStore.storeSocialLinks.forEach((link, index) => {
        socialLinksCount++;
        const linkDiv = document.createElement('div');
        linkDiv.className = 'mb-3 flex gap-2';
        linkDiv.id = `socialLink-${socialLinksCount}`;
        linkDiv.innerHTML = `
          <input type="url" value="${link}" placeholder="https://facebook.com/yourpage" 
            class="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm social-link-input">
          <button type="button" onclick="removeSocialLink(${socialLinksCount})" 
            class="px-3 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition text-sm">
            Remove
          </button>
        `;
        container.appendChild(linkDiv);
      });
    }
  }
  
  console.log('Form populated successfully');
}

/**
 * Display store statistics
 */
function displayStoreStats() {
  const statProducts = document.getElementById('statProducts');
  const statFollowers = document.getElementById('statFollowers');
  const statRating = document.getElementById('statRating');
  const statReviews = document.getElementById('statReviews');

  if (statProducts) statProducts.textContent = currentStore.totalProducts || 0;
  if (statFollowers) statFollowers.textContent = currentStore.followers || 0;
  if (statRating) statRating.textContent = (currentStore.storeRating || 0).toFixed(1);
  if (statReviews) statReviews.textContent = currentStore.storeReviews || 0;
}

/**
 * Get initials from a name
 */
function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Load and display followers
 */
async function loadFollowers() {
  try {
    const followersList = document.getElementById('followersList');
    if (!followersList) return;

    // Query all followers for this store
    const snap = await window.firebaseApp.db.collection('storeFollowers')
      .where('storeId', '==', currentUser.uid)
      .get();

    if (snap.empty) {
      followersList.innerHTML = '<p class="text-slate-500 text-center py-8">No followers yet. Share your store to get followers!</p>';
      return;
    }

    // Get follower details
    const followers = [];
    for (const doc of snap.docs) {
      const followerData = doc.data();
      
      // Try to get additional follower info from users collection
      try {
        const followerDoc = await window.firebaseApp.db.collection('users').doc(followerData.followerId).get();
        if (followerDoc.exists) {
          followers.push({
            name: followerDoc.data().displayName || followerData.followerName || 'Anonymous',
            email: followerDoc.data().email || followerData.followerEmail || 'N/A',
            followedAt: followerData.at || Date.now()
          });
        } else {
          followers.push({
            name: followerData.followerName || 'Anonymous',
            email: followerData.followerEmail || 'N/A',
            followedAt: followerData.at || Date.now()
          });
        }
      } catch (e) {
        followers.push({
          name: followerData.followerName || 'Anonymous',
          email: followerData.followerEmail || 'N/A',
          followedAt: followerData.at || Date.now()
        });
      }
    }

    // Sort by most recent first
    followers.sort((a, b) => b.followedAt - a.followedAt);

    // Display followers
    followersList.innerHTML = followers.map((follower, index) => `
      <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
        <div class="flex-1">
          <p class="font-bold text-slate-900">${follower.name}</p>
          <p class="text-sm text-slate-600">${follower.email}</p>
          <p class="text-xs text-slate-500 mt-1">Followed on ${new Date(follower.followedAt).toLocaleDateString()}</p>
        </div>
        <div class="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">
          ${getInitials(follower.name)}
        </div>
      </div>
    `).join('');

  } catch (e) {
    console.error('Error loading followers:', e);
    const followersList = document.getElementById('followersList');
    if (followersList) {
      followersList.innerHTML = '<p class="text-red-600 text-center py-8">Error loading followers</p>';
    }
  }
}

/**
 * Add a social media link input field
 */
function addSocialLink() {
  socialLinksCount++;
  const container = document.getElementById('socialLinksContainer');
  const linkDiv = document.createElement('div');
  linkDiv.className = 'mb-3 flex gap-2';
  linkDiv.id = `socialLink-${socialLinksCount}`;
  linkDiv.innerHTML = `
    <input type="url" placeholder="https://facebook.com/yourpage" 
      class="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm social-link-input">
    <button type="button" onclick="removeSocialLink(${socialLinksCount})" 
      class="px-3 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition text-sm">
      Remove
    </button>
  `;
  container.appendChild(linkDiv);
}

/**
 * Remove a social media link input field
 */
function removeSocialLink(id) {
  const element = document.getElementById(`socialLink-${id}`);
  if (element) {
    element.remove();
  }
}

/**
 * Copy store link to clipboard
 */
function copyStoreLink() {
  if (!currentStore) return;

  const storeLink = getStoreLink();
  
  navigator.clipboard.writeText(storeLink).then(() => {
    alert('Store link copied to clipboard!');
  }).catch(err => {
    console.error('Error copying link:', err);
    alert('Could not copy link. Please try again.');
  });
}

/**
 * Get the full store link with correct path
 */
function getStoreLink() {
  if (!currentStore) return '';
  
  // Get the path of the current page directory
  const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
  return `${window.location.origin}${path}store-view.html?storeSlug=${encodeURIComponent(currentStore.storeSlug)}`;
}

/**
 * View store in same tab to ensure back button works
 */
function viewStore() {
  if (!currentStore) {
    alert('Store data not loaded yet');
    return;
  }
  
  const storeLink = getStoreLink();
  // Navigating in same tab allows history.back() to work correctly
  window.location.href = storeLink;
}

/**
 * Validate store slug format
 */
function validateStoreSlug(slug) {
  if (!slug) return 'Store URL cannot be empty';
  if (slug.length < 3) return 'Store URL must be at least 3 characters';
  if (slug.length > 50) return 'Store URL must be 50 characters or less';
  if (!/^[a-z0-9-]+$/.test(slug)) return 'Store URL can only contain lowercase letters, numbers, and hyphens';
  if (slug.startsWith('-') || slug.endsWith('-')) return 'Store URL cannot start or end with a hyphen';
  return null;
}

/**
 * Check if store slug is available (not taken by another store)
 */
async function isStoreSlugAvailable(slug, currentStoreSlug) {
  if (slug === currentStoreSlug) return true; // Current slug is always available
  
  try {
    const snap = await window.firebaseApp.db.collection('users').where('storeSlug', '==', slug).limit(1).get();
    return snap.empty; // Available if no other store uses this slug
  } catch (e) {
    console.error('Error checking slug availability:', e);
    return false;
  }
}

/**
 * Update all listings with new store slug
 */
async function updateListingsWithNewSlug(userId, oldSlug, newSlug) {
  try {
    const snap = await window.firebaseApp.db.collection('listings').where('ownerId', '==', userId).get();
    const batch = window.firebaseApp.db.batch();
    
    snap.docs.forEach(doc => {
      batch.update(doc.ref, { storeSlug: newSlug });
    });
    
    await batch.commit();
    console.log(`Updated ${snap.docs.length} listings with new slug: ${newSlug}`);
  } catch (e) {
    console.error('Error updating listings:', e);
    throw new Error('Failed to update store listings: ' + e.message);
  }
}

/**
 * Handle store profile update
 */
async function handleUpdateStore(event) {
  event.preventDefault();

  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';

  try {
    // Get form values
    const storeName = document.getElementById('storeName').value.trim();
    const newStoreSlug = document.getElementById('storeSlugDisplay').value.trim().toLowerCase();
    const storeDescription = document.getElementById('storeDescription').value.trim();
    
    // Get category - use custom if provided, otherwise use selected
    const storeCategory = document.getElementById('storeCategory').value;
    const storeCategoryCustom = document.getElementById('storeCategoryCustom').value.trim();
    const finalCategory = storeCategoryCustom || storeCategory || 'Other';
    
    const storeEmail = document.getElementById('storeEmail').value.trim();
    const storePhoneCountry = document.getElementById('storePhoneCountry').value;
    const storePhoneNumber = document.getElementById('storePhone').value.trim();
    if (!storePhoneNumber || storePhoneNumber.length < 5) {
      alert('Please enter a valid store contact phone number.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Changes';
      return;
    }
    const storePhone = storePhoneCountry + ' ' + storePhoneNumber;
    
    const storeAddress = document.getElementById('storeAddress').value.trim();
    const storeWebsite = document.getElementById('storeWebsite').value.trim();

    // Validation
    if (!storeName) {
      alert('Store name is required');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Changes';
      return;
    }

    if (storeDescription.length > 500) {
      alert('Store description must be 500 characters or less');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Changes';
      return;
    }

    // Validate store slug
    const slugError = validateStoreSlug(newStoreSlug);
    if (slugError) {
      alert('Store URL Error: ' + slugError);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Changes';
      return;
    }

    // Check if slug is available
    const slugAvailable = await isStoreSlugAvailable(newStoreSlug, currentStore.storeSlug);
    if (!slugAvailable) {
      alert('This Store URL is already taken. Please choose a different one.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Changes';
      return;
    }

    // Collect social links
    const socialLinks = [];
    document.querySelectorAll('.social-link-input').forEach(input => {
      if (input.value.trim()) {
        socialLinks.push(input.value.trim());
      }
    });

    // Check if slug changed
    const slugChanged = newStoreSlug !== currentStore.storeSlug;
    const oldSlug = currentStore.storeSlug;

    // Update store data
    const updateData = {
      storeName: storeName,
      storeSlug: newStoreSlug,
      storeDescription: storeDescription,
      storeCategory: finalCategory,
      storeEmail: storeEmail,
      storePhone: storePhone,
      storeAddress: storeAddress,
      storeWebsite: storeWebsite,
      storeSocialLinks: socialLinks,
      storeProfileImage: profileImageBase64,
      storeInitial: document.getElementById('storeInitial').value.trim() || storeName.charAt(0).toUpperCase()
    };

    // Update user document
    await window.firebaseApp.db.collection('users').doc(currentUser.uid).update(updateData);

    // If slug changed, update all listings
    if (slugChanged) {
      await updateListingsWithNewSlug(currentUser.uid, oldSlug, newStoreSlug);
    }

    // Update local store data
    currentStore = { ...currentStore, ...updateData };

    const message = 'Store information updated successfully!' + (slugChanged ? '\nAll your listings have been updated with the new Store URL.' : '');
    alert(message);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Changes';

  } catch (error) {
    console.error('Error updating store:', error);
    alert('Error updating store: ' + error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Changes';
  }
}

/**
 * Delete store
 */
async function deleteStore() {
  if (!confirm('Are you sure you want to delete your store? This action cannot be undone.')) {
    return;
  }

  if (!confirm('This will delete your store but keep your products. Are you absolutely sure?')) {
    return;
  }

  try {
    // Reset store fields
    await window.firebaseApp.db.collection('users').doc(currentUser.uid).update({
      storeCreated: false,
      storeName: '',
      storeSlug: '',
      storeDescription: '',
      storeCategory: '',
      storeEmail: '',
      storePhone: '',
      storeAddress: '',
      storeWebsite: '',
      storeSocialLinks: [],
      totalProducts: 0,
      followers: 0,
      storeRating: 0,
      storeReviews: 0,
      storeProfileImage: null,
      storeInitial: ''
    });

    alert('Store deleted successfully. Redirecting...');
    window.location.href = 'index.html';

  } catch (error) {
    console.error('Error deleting store:', error);
    alert('Error deleting store: ' + error.message);
  }
}

/**
 * Handle logout
 */
async function handleLogout() {
  try {
    await window.firebaseApp.auth.signOut();
    window.location.replace('auth.html');
  } catch (e) {
    console.error('Logout error:', e);
    window.location.replace('auth.html');
  }
}

/**
 * Go back to the previous page
 */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}
