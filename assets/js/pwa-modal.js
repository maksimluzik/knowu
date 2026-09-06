/**
 * KnowU PWA Installation Modal Controller
 */
(function() {
  'use strict';

  var activeTrigger = null;

  function initPwaModal() {
    var modal = document.getElementById('pwa-modal');
    if (!modal) return;

    var tabIos = document.getElementById('tab-ios');
    var tabAndroid = document.getElementById('tab-android');
    var panelIos = document.getElementById('panel-ios');
    var panelAndroid = document.getElementById('panel-android');

    function switchTab(platform) {
      var isIos = platform === 'ios';
      if (tabIos) {
        tabIos.classList.toggle('active', isIos);
        tabIos.setAttribute('aria-selected', isIos ? 'true' : 'false');
      }
      if (tabAndroid) {
        tabAndroid.classList.toggle('active', !isIos);
        tabAndroid.setAttribute('aria-selected', !isIos ? 'true' : 'false');
      }
      if (panelIos) {
        panelIos.classList.toggle('active', isIos);
      }
      if (panelAndroid) {
        panelAndroid.classList.toggle('active', !isIos);
      }
    }

    function openModal(platform, triggerEl) {
      activeTrigger = triggerEl || document.activeElement;
      switchTab(platform || 'ios');
      modal.style.display = 'flex';
      document.body.classList.add('pwa-modal-open');

      // Trigger CSS transition
      requestAnimationFrame(function() {
        modal.classList.add('is-open');
        var closeBtn = modal.querySelector('.pwa-modal__close');
        if (closeBtn) closeBtn.focus();
      });
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('pwa-modal-open');
      setTimeout(function() {
        modal.style.display = 'none';
        if (activeTrigger && typeof activeTrigger.focus === 'function') {
          activeTrigger.focus();
        }
      }, 250);
    }

    // Global click delegation for open/close and tabs
    document.addEventListener('click', function(e) {
      var openBtn = e.target.closest('[data-open-pwa]');
      if (openBtn) {
        e.preventDefault();
        var platform = openBtn.getAttribute('data-open-pwa') || 'ios';
        openModal(platform, openBtn);
        return;
      }

      var closeBtn = e.target.closest('[data-close-pwa]');
      if (closeBtn) {
        e.preventDefault();
        closeModal();
        return;
      }

      var tabBtn = e.target.closest('.pwa-tab');
      if (tabBtn && modal.contains(tabBtn)) {
        e.preventDefault();
        var p = tabBtn.getAttribute('data-tab');
        switchTab(p);
        return;
      }
    });

    // Keyboard support: Escape to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPwaModal);
  } else {
    initPwaModal();
  }
})();
