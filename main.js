document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JS is running and DOM is ready");

  const svgFiles = ['images/scroller_01.svg', 'images/scroller_02.svg', 'images/scroller_03.svg'];
  const track = document.getElementById('banner-track');
  const scrollContainer = document.querySelector('.scrolling-banner'); // <== The element that scrolls

  function addItemsAndScroll() {
    let repeatCount = 8;
    let sequence = [];
  
    for (let i = 0; i < repeatCount; i++) {
      sequence.push(...svgFiles);
    }
  
    function loadNext(index = 0) {
      if (index >= sequence.length) {
        startAutoScroll();
        return;
      }
  
      const file = sequence[index];
      const fileIndex = svgFiles.indexOf(file); // 0, 1, 2
  
      fetch(file)
        .then(res => res.text())
        .then(svg => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('parade-item', `svg-${fileIndex}`);
          wrapper.innerHTML = svg;
  
          const svgElement = wrapper.querySelector('svg');
          if (svgElement) {
            svgElement.style.height = '80%';
            svgElement.style.width = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.fill = 'currentColor';
          }
  
          track.appendChild(wrapper);
          loadNext(index + 1);
        })
        .catch(err => {
          console.error('Error loading SVG:', file, err);
          loadNext(index + 1); // Skip broken ones
        });
    }
  
    loadNext(); // start the first one
  }
  
  function startAutoScroll() {
    const track = document.getElementById('banner-track');
    let x = 0;
    const speed = 0.5;
  
    function step() {
      x -= speed;
      track.style.transform = `translateX(${x}px)`;
  
      // Reset when it's halfway through (you may need to tweak this number!)
      if (Math.abs(x) >= track.scrollWidth / 2) {
        x = 0;
      }
  
      requestAnimationFrame(step);
    }
  
    requestAnimationFrame(step);
  }
  addItemsAndScroll();


  // 💌 Popup + Navigation (unchanged)
  const popupOverlay = document.getElementById('popup-overlay');
  const closePopupBtn = document.getElementById('close-popup');
  const joinListLink = document.getElementById('open-mailing-list');

  if (joinListLink && popupOverlay) {
    joinListLink.addEventListener('click', function (e) {
      e.preventDefault();
      popupOverlay.classList.add('show');
    });
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      popupOverlay.classList.remove('show');
    });
  }

  setTimeout(() => {
    if (!sessionStorage.getItem('popupShown') && popupOverlay) {
      popupOverlay.classList.add('show');
      sessionStorage.setItem('popupShown', 'true');
    }
  }, 8000);

  const aboutLink = document.querySelector('a[href="#about"]');
  const aboutDetails = document.getElementById('about-details');

  if (aboutLink && aboutDetails) {
    aboutLink.addEventListener('click', () => {
      setTimeout(() => {
        aboutDetails.open = true;
      }, 200);
    });
  }

  const contactLink = document.querySelector('a[href="#contact"]');
  const contactDetails = document.getElementById('contact-details');

  if (contactLink && contactDetails) {
    contactLink.addEventListener('click', () => {
      setTimeout(() => {
        contactDetails.open = true;
      }, 200);
    });
  }

  const peekButton = document.getElementById('peek-button');
  const previewOverlay = document.getElementById('preview-overlay');
  const closePreview = document.getElementById('close-preview');

  if (peekButton && previewOverlay && closePreview) {
    peekButton.addEventListener('click', () => {
      previewOverlay.classList.add('show');
    });

    closePreview.addEventListener('click', () => {
      previewOverlay.classList.remove('show');
    });

    previewOverlay.addEventListener('click', (e) => {
      if (e.target === previewOverlay) {
        previewOverlay.classList.remove('show');
      }
    });
  }
});


