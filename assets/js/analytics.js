/**
 * KnowU Google Analytics Event Tracking Script
 * Automatically tracks user scrolls, CTA clicks, navigation clicks, social links, FAQ toggles, and form submissions.
 */

(function() {
  // Helper to safely send GA events
  function pushGaEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      // Diagnostic logging in development
      console.log('[Analytics Debug]', eventName, params);
    }
  }

  // 1. Scroll Depth Tracking
  const scrollPercentThresholds = [25, 50, 75, 100];
  const trackedThresholds = {};

  function trackScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);

    scrollPercentThresholds.forEach(threshold => {
      if (percent >= threshold && !trackedThresholds[threshold]) {
        trackedThresholds[threshold] = true;
        pushGaEvent('scroll', {
          'percent_scrolled': threshold,
          'page_path': window.location.pathname,
          'page_title': document.title
        });
      }
    });
  }

  let isScrolling = false;
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        trackScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // 2. DOM Structural Section Detection
  function getElementSection(el) {
    let current = el;
    while (current && current !== document.body) {
      if (current.tagName === 'NAV' || current.classList.contains('navbar')) {
        return 'navbar';
      }
      if (current.tagName === 'FOOTER' || current.classList.contains('site-footer') || current.classList.contains('footer')) {
        return 'footer';
      }
      if (current.classList.contains('hero') || current.classList.contains('business-hero')) {
        return 'hero';
      }
      if (current.classList.contains('audience-card')) {
        if (current.classList.contains('audience-card--personal')) return 'audience-card-personal';
        if (current.classList.contains('audience-card--professional')) return 'audience-card-professional';
        return 'audience-card';
      }
      if (current.classList.contains('pricing-card')) {
        const tier = current.querySelector('.pricing-card__tier');
        return 'pricing-card-' + (tier ? tier.innerText.toLowerCase().trim() : 'unknown');
      }
      if (current.classList.contains('usecase-card')) {
        if (current.classList.contains('usecase-card--relationship')) return 'usecase-relationship';
        if (current.classList.contains('usecase-card--career')) return 'usecase-career';
        return 'usecase-card';
      }
      if (current.classList.contains('platform-card')) {
        const header = current.querySelector('h4');
        return 'platform-card-' + (header ? header.innerText.toLowerCase().trim() : 'unknown');
      }
      if (current.id) {
        return current.id;
      }
      current = current.parentElement;
    }
    return 'general';
  }

  // 3. Document Click Listeners (Delegated)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    const button = e.target.closest('button');
    const target = link || button;
    if (!target) return;

    const isLink = !!link;
    const href = isLink ? link.getAttribute('href') : '';
    const text = (target.textContent || target.innerText || target.getAttribute('title') || '').trim();

    // Check for CTA buttons/links
    const isCta = target.classList.contains('btn') || 
                  target.classList.contains('btn-primary') || 
                  target.classList.contains('btn-secondary') || 
                  target.classList.contains('btn-outline') || 
                  target.classList.contains('btn-outline-dark') || 
                  target.classList.contains('btn-social') ||
                  target.classList.contains('pricing-card__cta') ||
                  target.id === 'submit-button';

    const section = getElementSection(target);

    if (isCta) {
      pushGaEvent('cta_click', {
        'cta_text': text || 'unlabeled',
        'cta_url': href || 'button_action',
        'cta_section': section,
        'page_path': window.location.pathname
      });
    }

    // Check for header/footer navigation links
    const isNavbarLink = target.closest('.navbar-links') || target.closest('.navbar-toggle') || section === 'navbar';
    const isFooterLink = section === 'footer';
    if (isLink && (isNavbarLink || isFooterLink) && !isCta) {
      pushGaEvent('nav_click', {
        'link_text': text,
        'link_url': href,
        'location': isNavbarLink ? 'header' : 'footer',
        'page_path': window.location.pathname
      });
    }

    // Check for Social Media interaction clicks
    const isSocialCard = target.closest('.social-card');
    if (isSocialCard) {
      const platform = isSocialCard.classList.contains('social-card--instagram') ? 'Instagram' : 'Facebook';
      pushGaEvent('social_link_click', {
        'platform': platform,
        'link_url': isSocialCard.getAttribute('href'),
        'page_path': window.location.pathname
      });
    }

    // Check for FAQ accordion clicks
    if (target.classList.contains('faq-item__question')) {
      // Since toggleFaq onclick handler runs before this bubbles to document,
      // target's 'aria-expanded' attribute has the new state.
      const isExpanded = target.getAttribute('aria-expanded') === 'true';
      pushGaEvent('faq_engagement', {
        'question': text,
        'action': isExpanded ? 'open' : 'close',
        'page_path': window.location.pathname
      });
    }
  });

  // 4. Form Submission Listeners
  document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.id === 'contact-form' || form.getAttribute('action')?.includes('formspree.io')) {
      pushGaEvent('form_submission', {
        'form_id': form.id || 'contact-form',
        'form_name': 'Contact Form',
        'status': 'submitted',
        'page_path': window.location.pathname
      });
    }
  });
})();
