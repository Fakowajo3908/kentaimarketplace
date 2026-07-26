// STORE FEATURE: Updated auth.js with Store initialization fields
async function signUpUser(email, password, displayName) {
    try {
        if (!window.firebaseApp) throw new Error("Firebase not initialized");
        const userCredential = await window.firebaseApp.auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // STORE FEATURE: Initialize store fields for new users (NEW)
        const storeSlug = displayName.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 9);
        
        // Initialize user with 200 points Welcome Bonus and Store fields
        await window.firebaseApp.db.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: email,
            displayName: displayName,
            points: 200, // 200 POINTS FOR NEW USERS
            createdAt: firebase.firestore.Timestamp.now(),
            // STORE FEATURE: Store initialization fields (NEW)
            storeCreated: false,
            storeName: null,
            storeSlug: null,
            storeDescription: null,
            storeCategory: null,
            storePhone: null,
            storeEmail: null,
            storeAddress: null,
            storeWebsite: null,
            storeSocialLinks: [],
            totalProducts: 0,
            followers: 0,
            storeRating: 0,
            storeReviews: 0,
            storeCreatedAt: null
        });
        return user;
    } catch (error) {
        console.error("Sign-up error:", error.message);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await window.firebaseApp.auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login error:", error.message);
        throw error;
    }
}

async function logoutUser() {
    await window.firebaseApp.auth.signOut();
    window.location.href = 'auth.html';
}

function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + 'Icon');
    if (input.type === 'password') {
        input.type = 'text';
        // Change to eye-slash icon
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>';
    } else {
        input.type = 'password';
        // Change back to eye icon
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
    }
}
