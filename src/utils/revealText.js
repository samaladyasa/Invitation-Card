export function initRevealText() {
  if (typeof window === 'undefined') return;
  try {
    const selector = 'h1,h2,h3,h4,h5,h6,p,button,a,li,label,strong,em,span.reveal-text';
    const processedAttr = 'data-reveal-processed';

    const processText = (text) => {
      const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
      const fragment = document.createDocumentFragment();
      let wordIndex = 0;
      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          fragment.appendChild(document.createTextNode(token));
        } else {
          const span = document.createElement('span');
          span.className = 'reveal-word';
          span.style.setProperty('--i', String(wordIndex));
          span.textContent = token;
          fragment.appendChild(span);
          wordIndex += 1;
        }
      });
      return fragment;
    };

    const processElement = (el) => {
      if (el.getAttribute(processedAttr)) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest('.reveal-container')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      if (textNodes.length === 0) return;

      el.setAttribute(processedAttr, '1');
      textNodes.forEach((textNode) => {
        const container = document.createElement('span');
        container.className = 'reveal-container';
        container.appendChild(processText(textNode.nodeValue));
        textNode.parentNode.replaceChild(container, textNode);
      });
    };

    document.querySelectorAll(selector).forEach((el) => processElement(el));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('.reveal-container').forEach((c) => observer.observe(c));

    const mo = new MutationObserver((mutations) => {
      let added = false;
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches && n.matches(selector)) {
            processElement(n);
            added = true;
          }
          n.querySelectorAll && n.querySelectorAll(selector).forEach((el) => { processElement(el); added = true; });
        });
      });
      if (added) {
        document.querySelectorAll('.reveal-container:not([data-reveal-observed])').forEach((c) => {
          c.setAttribute('data-reveal-observed', '1');
          observer.observe(c);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  } catch (e) {
  }
}

export default initRevealText;
