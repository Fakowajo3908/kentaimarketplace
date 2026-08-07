/**
 * Daily reward popup for registered users.
 *
 * Current-day rewards can be claimed normally. A missed day first shows
 * Upload. After a successful product upload, that exact day changes to Claim.
 * The 10-point reward is added only when that specific missed day is claimed.
 */
(function () {
  'use strict';

  const DAILY_REWARD_POINTS = 10;
  const SESSION_POPUP_KEY_PREFIX = 'kentaiDailyRewardPopupShown:';
  const WEEKDAYS = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  let latestRewardState = null;
  let loadingClaimDate = null;

  function toDateKey(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
  }

  function getToday() {
    const date = new Date();
    const dayIndex = (date.getDay() + 6) % 7;
    return { date, dateKey: toDateKey(date), dayIndex, weekday: WEEKDAYS[dayIndex] };
  }

  function getDateKeyForDay(dayIndex, referenceDate) {
    const date = new Date(referenceDate);
    const currentDayIndex = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() + (dayIndex - currentDayIndex));
    return toDateKey(date);
  }

  function getModalElements() {
    return {
      modal: document.getElementById('dailyRewardModal'),
      days: document.getElementById('dailyRewardDays'),
      title: document.getElementById('dailyRewardTitle'),
      claimButton: document.getElementById('dailyRewardClaimButton'),
      closeButton: document.getElementById('dailyRewardCloseButton'),
      openButton: document.getElementById('dailyRewardOpenButton'),
      openControl: document.getElementById('dailyRewardControl'),
      status: document.getElementById('dailyRewardStatus')
    };
  }

  function getSessionKey(userId) {
    return `${SESSION_POPUP_KEY_PREFIX}${userId}`;
  }

  function hasShownAutomatically(userId) {
    try {
      return window.sessionStorage.getItem(getSessionKey(userId)) === '1';
    } catch (error) {
      return false;
    }
  }

  function markShownAutomatically(userId) {
    try {
      window.sessionStorage.setItem(getSessionKey(userId), '1');
    } catch (error) {
      // The popup still works if browser storage is unavailable.
    }
  }

  function openModal() {
    const { modal } = getModalElements();
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    const { modal } = getModalElements();
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  async function goToUpload(dateKey) {
    const user = window.firebaseApp && window.firebaseApp.auth.currentUser;
    if (!user || !window.firebaseApp.db) return;

    try {
      const userDoc = await window.firebaseApp.db.collection('users').doc(user.uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      const query = `?rewardDate=${encodeURIComponent(dateKey)}`;
      window.location.href = userData.storeCreated
        ? `store-upload.html${query}`
        : `store-setup.html${query}`;
    } catch (error) {
      console.error('Unable to route to store upload:', error);
      const query = `?rewardDate=${encodeURIComponent(dateKey)}`;
      window.location.href = `store-setup.html${query}`;
    }
  }

  function renderDays(claimedDates, reclaimableDates, uploadedDates) {
    const { days } = getModalElements();
    if (!days) return;

    const today = getToday();
    days.innerHTML = WEEKDAYS.map((day, index) => {
      const dateKey = getDateKeyForDay(index, today.date);
      const claimed = Boolean(claimedDates[dateKey]);
      const uploaded = Boolean(uploadedDates[dateKey]);
      const isToday = index === today.dayIndex;
      const isMissed = Boolean(reclaimableDates[dateKey]);
      const isLoading = loadingClaimDate === dateKey;
      const stateClass = claimed
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : isToday
          ? 'border-orange-400 bg-orange-50 text-orange-700 ring-2 ring-orange-200'
          : uploaded
            ? 'border-violet-300 bg-violet-50 text-violet-700 ring-1 ring-violet-200'
            : isMissed
              ? 'border-blue-200 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-slate-50 text-slate-400';
      const icon = claimed ? '✓' : isToday ? '10' : uploaded ? '10' : isMissed ? '↑' : '•';
      const stateText = claimed ? 'Claimed' : isToday ? 'Today' : uploaded ? 'Claim' : isMissed ? 'Upload' : 'Later';
      const action = uploaded
        ? `<button type="button" data-reward-claim-date="${dateKey}" class="mt-1 min-h-7 w-full rounded-lg bg-violet-600 px-1 text-[8px] font-black uppercase text-white transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60 sm:text-[9px]" ${isLoading ? 'disabled' : ''}>${isLoading ? '...' : 'Claim'}</button>`
        : isMissed
          ? `<button type="button" data-reward-upload-date="${dateKey}" class="mt-1 min-h-7 w-full rounded-lg bg-blue-600 px-1 text-[8px] font-black uppercase text-white transition hover:bg-blue-700 sm:text-[9px]">Upload</button>`
          : `<span class="mt-1 min-h-7 w-full text-center text-[8px] font-bold sm:text-[9px]">${stateText}</span>`;

      return `<div class="flex min-w-0 flex-col items-center gap-1 rounded-xl border px-1 py-2 ${stateClass}" title="${stateText}">
        <span class="text-[9px] font-black uppercase tracking-wide sm:text-[10px]">${day.label.slice(0, 3)}</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-black shadow-sm sm:text-xs">${icon}</span>
        ${action}
      </div>`;
    }).join('');

    days.querySelectorAll('[data-reward-upload-date]').forEach(button => {
      button.addEventListener('click', () => goToUpload(button.dataset.rewardUploadDate));
    });
    days.querySelectorAll('[data-reward-claim-date]').forEach(button => {
      button.addEventListener('click', () => claimMissedDay(button.dataset.rewardClaimDate));
    });
  }

  function renderState(state) {
    latestRewardState = state;
    const today = getToday();
    const todayClaimed = Boolean(state.claimedDates && state.claimedDates[today.dateKey]);
    const { title, claimButton, closeButton, openButton, openControl, status } = getModalElements();

    renderDays(state.claimedDates || {}, state.reclaimableDates || {}, state.uploadedDates || {});
    if (title) title.textContent = todayClaimed ? 'Today’s reward is already claimed' : `${today.weekday.label} reward is ready`;
    if (status) {
      const uploadedCount = Object.keys(state.uploadedDates || {}).length;
      const missedCount = Object.keys(state.reclaimableDates || {}).length;
      status.textContent = uploadedCount
        ? 'Your uploaded day is ready to claim.'
        : missedCount
          ? 'Upload a product from a missed day to unlock its 10 points.'
          : '';
    }
    if (claimButton) {
      claimButton.disabled = todayClaimed;
      claimButton.textContent = todayClaimed ? 'Claimed for today' : `Claim ${DAILY_REWARD_POINTS} points`;
      claimButton.onclick = claimToday;
    }
    if (closeButton) closeButton.onclick = closeModal;
    if (openButton) openButton.onclick = openModal;
    if (openControl) openControl.classList.remove('hidden');
  }

  async function claimToday() {
    const { claimButton, status } = getModalElements();
    const user = window.firebaseApp && window.firebaseApp.auth.currentUser;
    if (!user || !window.firebaseApp.claimDailyReward || !claimButton) return;

    claimButton.disabled = true;
    claimButton.textContent = 'Claiming...';
    if (status) status.textContent = '';

    try {
      const result = await window.firebaseApp.claimDailyReward();
      if (status) status.textContent = result.alreadyClaimed
        ? 'Today’s reward has already been claimed.'
        : `+${DAILY_REWARD_POINTS} points added to your balance.`;
      updateNavPoints(result.points);
      renderState(result);
      claimButton.textContent = 'Claimed for today';
      setTimeout(closeModal, 1100);
    } catch (error) {
      console.error('Daily reward claim failed:', error);
      if (status) status.textContent = 'Unable to claim right now. Please try again.';
      claimButton.disabled = false;
      claimButton.textContent = `Claim ${DAILY_REWARD_POINTS} points`;
    }
  }

  async function claimMissedDay(dateKey) {
    const { status } = getModalElements();
    if (!window.firebaseApp.claimMissedDailyRewardForDate || loadingClaimDate) return;

    loadingClaimDate = dateKey;
    renderState(latestRewardState || {});
    if (status) status.textContent = 'Claiming your missed-day reward...';

    try {
      const result = await window.firebaseApp.claimMissedDailyRewardForDate(dateKey);
      updateNavPoints(result.points);
      if (status) status.textContent = result.alreadyClaimed
        ? 'That missed-day reward has already been claimed.'
        : `+${DAILY_REWARD_POINTS} points added for ${dateKey}.`;
      renderState(result);
    } catch (error) {
      console.error('Missed-day reward claim failed:', error);
      if (status) status.textContent = 'Please upload a product for this day before claiming it.';
      renderState(latestRewardState || {});
    } finally {
      loadingClaimDate = null;
    }
  }

  function updateNavPoints(points) {
    const pointsElement = document.getElementById('navPoints');
    if (pointsElement && Number.isFinite(Number(points))) pointsElement.textContent = points;
  }

  async function initDailyReward() {
    const user = window.firebaseApp && window.firebaseApp.auth.currentUser;
    if (!user || !window.firebaseApp.getDailyRewardState) return;

    try {
      const state = await window.firebaseApp.getDailyRewardState();
      renderState(state);
      if (!hasShownAutomatically(user.uid)) {
        markShownAutomatically(user.uid);
        openModal();
      }
    } catch (error) {
      console.error('Daily reward initialization failed:', error);
    }
  }

  window.dailyReward = {
    init: initDailyReward,
    open: openModal,
    close: closeModal,
    getState: () => latestRewardState
  };
})();
