/**
 * KnowU High-Performance YouTube Facade
 * Lazy-loads YouTube player on user interaction, eliminating 800+ KiB of blocking scripts on page load.
 */
(function() {
  let preconnected = false;

  function preconnectYouTube() {
    if (preconnected) return;
    preconnected = true;
    const origins = ['https://www.youtube.com', 'https://i.ytimg.com', 'https://googleads.g.doubleclick.net'];
    origins.forEach(function(origin) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  function activateFacade(facade) {
    const videoId = facade.getAttribute('data-video-id');
    if (!videoId) return;

    const originalHtml = facade.innerHTML;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3&playsinline=1');
    iframe.setAttribute('title', facade.getAttribute('data-video-title') || 'KnowU Introduction Video');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';

    facade.innerHTML = '';
    facade.appendChild(iframe);
    iframe.focus();

    // Listen for video ended event to restore facade and prevent YouTube's end-screen "More videos" grid
    function onMessage(e) {
      if (!e.origin.includes('youtube')) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'onStateChange' && data.info === 0) {
          window.removeEventListener('message', onMessage);
          facade.innerHTML = originalHtml;
        }
      } catch (err) {}
    }
    window.addEventListener('message', onMessage);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const facades = document.querySelectorAll('.youtube-facade');
    facades.forEach(function(facade) {
      // Warm up network connection on hover or touchstart
      facade.addEventListener('pointerenter', preconnectYouTube, { once: true, passive: true });
      facade.addEventListener('touchstart', preconnectYouTube, { once: true, passive: true });

      // Click to play
      facade.addEventListener('click', function(e) {
        e.preventDefault();
        activateFacade(facade);
      });

      // Keyboard accessible play
      facade.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateFacade(facade);
        }
      });
    });
  });
})();
