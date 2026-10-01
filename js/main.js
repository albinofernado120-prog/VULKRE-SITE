/**
 * VULKRE - FLAVOUR SWITCHER
 * Manages flavour carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
  const themes = ['ember', 'verdant', 'surge', 'flare', 'inferno'];
  let currentFlavorIndex = 0;
  const totalFlavors = themes.length;
  
  const body = document.body;
  const screenFlavour = document.querySelector('.screen-flavour');
  
  // Flavor elements
  const titleVectors = document.querySelectorAll('.title-vector');
  const bottleImgs = document.querySelectorAll('.bottle-img');
  const blurGarrafaImgs = document.querySelectorAll('.blur-garrafa-img');
  const mosaicBgs = document.querySelectorAll('.flavour-mosaic-bg');
  const infoContents = document.querySelectorAll('.info-content');
  const dotItems = document.querySelectorAll('.dot-item');
  const heatSvgs = document.querySelectorAll('.heat-svg');

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  // Menu items for screen navigation
  const menuFlavorLink = document.querySelector('.menu-item[href="#flavour"]');
  const menuAboutLink = document.querySelector('.menu-item[href="#final"]');

  /**
   * Update flavor display (title, bottle, dots, etc)
   */
  function setFlavor(targetIndex) {
    let index = targetIndex;
    let isReverse = false;
    
    if (index < currentFlavorIndex) isReverse = true;
    if (index > currentFlavorIndex) isReverse = false;

    if (index < 0) {
      index = totalFlavors - 1;
      isReverse = true;
    }
    if (index >= totalFlavors) {
      index = 0;
      isReverse = false;
    }
    
    if (index === currentFlavorIndex) return;

    if (screenFlavour) {
      if (isReverse) {
        screenFlavour.classList.add('reverse-nav');
      } else {
        screenFlavour.classList.remove('reverse-nav');
      }
    }
    
    const prevIndex = currentFlavorIndex;
    currentFlavorIndex = index;

    // 1. Set theme class on body
    themes.forEach(t => body.classList.remove(`theme-${t}`));
    body.classList.add(`theme-${themes[currentFlavorIndex]}`);

    // Set active elements
    const updateClasses = (elements) => {
      elements.forEach((el, i) => {
        el.classList.remove('active', 'prev');
        if (i === prevIndex) el.classList.add('prev');
        if (i === index) el.classList.add('active');
      });
    };

    updateClasses(titleVectors);
    updateClasses(bottleImgs);
    updateClasses(blurGarrafaImgs);
    updateClasses(mosaicBgs);
    updateClasses(infoContents);
    updateClasses(heatSvgs);

    currentFlavorIndex = index;

    // 3. Set active dot
    dotItems.forEach((dot, i) => {
      const isActive = i === currentFlavorIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Scroll event to update active menu link
  window.addEventListener('scroll', () => {
    const finalSection = document.getElementById('final');
    if (finalSection) {
      const rect = finalSection.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        if (menuAboutLink) menuAboutLink.classList.add('active');
        if (menuFlavorLink) menuFlavorLink.classList.remove('active');
      } else {
        if (menuAboutLink) menuAboutLink.classList.remove('active');
        if (menuFlavorLink) menuFlavorLink.classList.add('active');
      }
    }
  });

  // Flavor navigation
  if (btnPrev) {
    btnPrev.addEventListener('click', () => setFlavor(currentFlavorIndex - 1));
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => setFlavor(currentFlavorIndex + 1));
  }

  dotItems.forEach((dot, idx) => {
    dot.addEventListener('click', () => setFlavor(idx));
  });

  // Menu navigation
  if (menuFlavorLink) {
    menuFlavorLink.addEventListener('click', (e) => {
      e.preventDefault();
      const flavourSection = document.getElementById('flavour');
      if (flavourSection) {
        flavourSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (menuAboutLink) {
    menuAboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const finalSection = document.getElementById('final');
      if (finalSection) {
        finalSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    // Check if flavour section is somewhat in view
    const rect = screenFlavour.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inView) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFlavor(currentFlavorIndex - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFlavor(currentFlavorIndex + 1);
      }
    }
  });

  // Initialize with Ember flavor
  setFlavor(0);
});
