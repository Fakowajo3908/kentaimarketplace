/**
 * Store Setup Module
 * Handles store creation and initialization
 */

let socialLinksCount = 0;
let profileImageBase64 = null;
const rewardDate = new URLSearchParams(window.location.search).get('rewardDate');

window.addEventListener('load', async () => {
  console.log('Store setup page loading...');

  // Wait for Firebase auth to be ready
  if (window.firebaseApp && window.firebaseApp.auth) {
    window.firebaseApp.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = 'auth.html';
        return;
      }

      // Check if user already has a store
      try {
        const userDoc = await window.firebaseApp.db.collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().storeCreated) {
          window.location.href = rewardDate
            ? `store-upload.html?rewardDate=${encodeURIComponent(rewardDate)}`
            : 'store-profile.html';
          return;
        }
      } catch (e) {
        console.error('Error checking store status:', e);
      }

      // Pre-fill email
      const emailInput = document.getElementById('storeEmail');
      if (emailInput) emailInput.value = user.email;
    });
  }
});

/**
 * Adds a new social link input row
 */
function addSocialLink() {
  const container = document.getElementById('socialLinksContainer');
  const id = `social-${++socialLinksCount}`;

  const div = document.createElement('div');
  div.className = 'flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300';
  div.id = id;

  div.innerHTML = `
    <select class="social-platform px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-sm">
      <option value="instagram">Instagram</option>
      <option value="twitter">Twitter</option>
      <option value="facebook">Facebook</option>
      <option value="tiktok">TikTok</option>
      <option value="whatsapp">WhatsApp</option>
    </select>
    <input type="text" placeholder="Username or link"
      class="social-value flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-base">
    <button type="button" onclick="removeSocialLink('${id}')" class="p-3 text-slate-400 hover:text-red-500 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  `;

  container.appendChild(div);
}

/**
 * Removes a social link row
 */
function removeSocialLink(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * Handle store setup form submission
 */
function updateInitial(val) {
  const display = document.getElementById('initialDisplay');
  if (display) display.textContent = val || 'S';
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

window.updateInitial = updateInitial;
window.handleProfileImageSelect = handleProfileImageSelect;

async function handleStoreSetup(event) {
  event.preventDefault();

  if (!window.firebaseApp || !window.firebaseApp.auth) {
    alert('Firebase not initialized');
    return;
  }

  const user = window.firebaseApp.auth.currentUser;
  if (!user) {
    alert('Please log in first');
    window.location.href = 'auth.html';
    return;
  }

  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Creating Store...
  `;

  try {
    // Get form values
    const storeName = document.getElementById('storeName').value.trim();
    const storeSlug = document.getElementById('storeSlug').value.trim().toLowerCase();
    const storeDescription = document.getElementById('storeDescription').value.trim();

    let storeCategory = document.getElementById('storeCategoryCustom').value.trim();
    if (!storeCategory) {
      storeCategory = document.getElementById('storeCategory').value;
    }

    const storeEmail = document.getElementById('storeEmail').value.trim();
    const phoneCountry = document.getElementById('storePhoneCountry').value;
    const phoneNumber = document.getElementById('storePhone').value.trim();
    if (!phoneNumber || phoneNumber.length < 5) {
      alert('Please enter a valid store contact phone number.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create My Store';
      return;
    }
    const storePhone = phoneCountry + ' ' + phoneNumber;

    const storeAddress = document.getElementById('storeAddress') ? document.getElementById('storeAddress').value.trim() : '';

    // Collect social links
    const socialLinks = [];
    document.querySelectorAll('#socialLinksContainer > div').forEach(div => {
      const platform = div.querySelector('.social-platform').value;
      const value = div.querySelector('.social-value').value.trim();
      if (value) {
        socialLinks.push({ platform, value });
      }
    });

    // Create store data object
    const storeData = {
      storeCreated: true,
      storeName: storeName,
      storeSlug: storeSlug,
      storeDescription: storeDescription,
      storeCategory: storeCategory || 'Other',
      storeEmail: storeEmail,
      storePhone: storePhone,
      storeAddress: storeAddress,
      socialLinks: socialLinks,
      totalProducts: 0,
      followers: 0,
      storeRating: 0,
      storeReviews: 0,
      storeCreatedAt: firebase.firestore.Timestamp.now(),
      storeProfileImage: profileImageBase64,
      storeInitial: document.getElementById('storeInitial').value.trim() || storeName.charAt(0).toUpperCase()
    };

    // Update user document in Firestore
    await window.firebaseApp.db.collection('users').doc(user.uid).update(storeData);

    alert(rewardDate
      ? '🎉 Store created successfully! Redirecting to paid product upload...'
      : '🎉 Store created successfully! Redirecting to your profile...');

    setTimeout(() => {
      window.location.href = rewardDate
        ? `store-upload.html?rewardDate=${encodeURIComponent(rewardDate)}`
        : 'store-profile.html';
    }, 1000);

  } catch (error) {
    console.error('Error creating store:', error);
    alert('Error creating store: ' + error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create My Store';
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
    window.location.replace('auth.html');
  }
}
