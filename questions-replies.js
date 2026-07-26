/**
 * Questions & Replies Management Module
 * Allows sellers to view and reply to buyer questions
 */

let currentUser = null;

async function loadAllQuestions() {
  const user = window.firebaseApp.auth.currentUser;
  if (!user) {
    console.log("No user found in loadAllQuestions");
    return;
  }
  
  currentUser = user;
  const container = document.getElementById('questionsContainer');
  
  try {
    // 1. Get all items owned by current user
    const itemsSnapshot = await window.firebaseApp.db
      .collection('listings')
      .where('ownerId', '==', user.uid)
      .get();

    if (itemsSnapshot.empty) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">No items yet</h3>
          <p class="text-slate-500">Post an item to start receiving questions from buyers.</p>
          <button onclick="location.href='promote.html'" class="mt-6 px-6 py-2 jumia-orange text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">Sell Something</button>
        </div>
      `;
      return;
    }

    // 2. Fetch messages for each item
    // Since messages are in a sub-collection 'listings/{itemId}/messages',
    // we must fetch them per item.
    let allItemData = [];

    for (const doc of itemsSnapshot.docs) {
      const itemId = doc.id;
      const itemData = doc.data();
      
      const messagesSnapshot = await window.firebaseApp.db
        .collection('listings')
        .doc(itemId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .get();
      
      if (!messagesSnapshot.empty) {
        const messages = messagesSnapshot.docs.map(mDoc => ({
          id: mDoc.id,
          ...mDoc.data()
        }));
        
        allItemData.push({
          item: { id: itemId, ...itemData },
          messages: messages
        });
      }
    }

    if (allItemData.length === 0) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">No questions yet</h3>
          <p class="text-slate-500">When buyers ask about your items, they will appear here.</p>
        </div>
      `;
      return;
    }

    // Sort items by the latest message timestamp
    allItemData.sort((a, b) => {
      const timeA = a.messages[0].timestamp?.toMillis ? a.messages[0].timestamp.toMillis() : (a.messages[0].timestamp || 0);
      const timeB = b.messages[0].timestamp?.toMillis ? b.messages[0].timestamp.toMillis() : (b.messages[0].timestamp || 0);
      return timeB - timeA;
    });

    // 3. Render
    let html = '';
    allItemData.forEach(data => {
      const item = data.item;
      const messages = data.messages;
      
      html += `
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div class="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                <img src="${item.images ? item.images[0] : 'https://via.placeholder.com/100'}" class="w-full h-full object-cover">
              </div>
              <div>
                <h3 class="font-bold text-slate-900 leading-tight">${item.title}</h3>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${messages.length} MESSAGES</p>
              </div>
            </div>
            <button onclick="location.href='item-detail.html?id=${item.id}'" class="p-2 text-slate-400 hover:text-orange-500 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </button>
          </div>
          <div class="divide-y divide-slate-50">
            ${messages.map(m => {
              const isOwner = m.senderId === item.ownerId;
              const isReply = !!m.replyToId;
              
              return `
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 ${isOwner ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'} rounded-full flex items-center justify-center font-bold text-xs">
                        ${m.senderName ? m.senderName.charAt(0).toUpperCase() : (m.senderEmail ? m.senderEmail.charAt(0).toUpperCase() : 'U')}
                      </div>
                      <div>
                        <p class="text-sm font-bold text-slate-900">${m.senderName || m.senderEmail || 'User'}</p>
                        <p class="text-[10px] text-slate-400 font-medium">${formatRelativeTime(m.timestamp)}</p>
                      </div>
                    </div>
                    ${isOwner ? `
                      <span class="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">Your Reply</span>
                    ` : `
                      <span class="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">Question</span>
                    `}
                  </div>
                  
                  <div class="bg-slate-50 rounded-2xl p-4 mb-2 border border-slate-100">
                    ${m.replyToText ? `
                      <div class="bg-white/50 p-2 rounded-lg mb-2 border-l-4 border-orange-200 italic text-[10px] text-slate-400">
                        Replying to: ${m.replyToText.substring(0, 60)}${m.replyToText.length > 60 ? '...' : ''}
                      </div>
                    ` : ''}
                    <p class="text-slate-700 text-sm leading-relaxed">${m.text}</p>
                  </div>
                  
                  ${!isOwner ? `
                    <button onclick="openReplyModal('${m.id}', '${m.text.replace(/'/g, "\\'")}', '${item.id}')" class="text-xs font-bold text-orange-500 hover:text-orange-600 transition flex items-center gap-1 mt-2">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                      Reply to this message
                    </button>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (e) {
    console.error('Error loading questions:', e);
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-red-100 shadow-sm">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-1">Failed to load</h3>
        <p class="text-slate-500 mb-2">Technical Detail: ${e.message}</p>
        <button onclick="loadAllQuestions()" class="mt-4 px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Try Again</button>
      </div>
    `;
  }
}

// Global functions for modal (called from HTML)
function openReplyModal(msgId, msgText, itemId) {
  document.getElementById('replyQuestionId').value = msgId;
  // We'll store itemId in a hidden field too
  let itemInput = document.getElementById('replyItemId');
  if (!itemInput) {
    itemInput = document.createElement('input');
    itemInput.type = 'hidden';
    itemInput.id = 'replyItemId';
    document.getElementById('replyForm').appendChild(itemInput);
  }
  itemInput.value = itemId;
  
  document.getElementById('modalQuestionText').textContent = `"${msgText}"`;
  const modal = document.getElementById('replyModal');
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('div').classList.remove('scale-95');
  }, 10);
}

async function handleReplySubmit(event) {
  event.preventDefault();
  const msgId = document.getElementById('replyQuestionId').value;
  const itemId = document.getElementById('replyItemId').value;
  const replyText = document.getElementById('replyText').value;
  
  try {
    const user = window.firebaseApp.auth.currentUser;
    const msgRef = window.firebaseApp.db.collection('listings').doc(itemId).collection('messages');
    
    await msgRef.add({
      text: replyText,
      senderId: user.uid,
      senderEmail: user.email,
      senderName: user.displayName || 'Seller',
      timestamp: firebase.firestore.Timestamp.now(),
      replyToId: msgId,
      replyToText: document.getElementById('modalQuestionText').textContent.replace(/"/g, '')
    });
    
    closeReplyModal();
    loadAllQuestions();
  } catch (error) {
    console.error("Error replying:", error);
    alert("Failed to send reply: " + error.message);
  }
}
