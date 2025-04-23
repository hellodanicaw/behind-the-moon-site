document.addEventListener("DOMContentLoaded", function () {
  console.log("\u2705 JS is running and DOM is ready");

  // 🌠 SVG Banner Logic
  const svgFiles = ['images/scroller_01.svg', 'images/scroller_03.svg'];
  const container = document.getElementById('banner-track');

  function addItems(repeatCount = 4) {
    for (let i = 0; i < repeatCount; i++) {
      svgFiles.forEach((file, index) => {
        fetch(file)
          .then(res => res.text())
          .then(svg => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('parade-item', `svg-${index}`);
            wrapper.innerHTML = svg;

            const svgElement = wrapper.querySelector('svg');
            if (svgElement) {
              svgElement.style.height = '80%';
              svgElement.style.width = 'auto';
              svgElement.style.display = 'block';
              svgElement.style.fill = 'currentColor';
            }

            container.appendChild(wrapper);
          })
          .catch(err => console.error('Error loading SVG:', file, err));
      });
    }
  }

  addItems(4);

  // 💌 Mailing List Popup
  const popupOverlay = document.getElementById('popup-overlay');
  const closePopupBtn = document.getElementById('close-popup');
  const joinListLink = document.getElementById('open-mailing-list');

  if (joinListLink && popupOverlay) {
    joinListLink.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Join List toggled');
      popupOverlay.classList.add('show');
    });
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      popupOverlay.classList.remove('show');
    });
  }

  // Auto popup after 8s
  setTimeout(() => {
    if (!sessionStorage.getItem('popupShown') && popupOverlay) {
      popupOverlay.classList.add('show');
      sessionStorage.setItem('popupShown', 'true');
    }
  }, 8000);

  // 📖 About Section Expand
  const aboutLink = document.querySelector('a[href="#about"]');
  const aboutDetails = document.getElementById('about-details');

  if (aboutLink && aboutDetails) {
    aboutLink.addEventListener('click', function () {
      setTimeout(() => {
        aboutDetails.open = true;
      }, 200);
    });
  }

  // 📨 Contact Section Expand
  const contactLink = document.querySelector('a[href="#contact"]');
  const contactDetails = document.getElementById('contact-details');

  if (contactLink && contactDetails) {
    contactLink.addEventListener('click', function () {
      setTimeout(() => {
        contactDetails.open = true;
      }, 200);
    });
  }

  // 📚 Preview Section Toggle
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
