document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JS is running and DOM is ready");

  const svgFiles = ['images/scroller_01.svg', 'images/scroller_02.svg', 'images/scroller_03.svg'];
  const scrollContainer = document.querySelector('.scrolling-banner');
  const track = document.getElementById('banner-track');
  const repeatCount = 100;

  function addItems(callback) {
    const sequence = [];
    for (let i = 0; i < repeatCount; i++) {
      sequence.push(...svgFiles);
    }

    let index = 0;
    function loadNext() {
      if (index >= sequence.length) {
        console.log("✅ All SVGs loaded. Starting scroll...");
        callback();
        return;
      }

      const file = sequence[index];
      const fileIndex = svgFiles.indexOf(file);

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
          index++;
          loadNext();
        })
        .catch(err => {
          console.error('❌ Error loading SVG:', file, err);
          index++;
          loadNext();
        });
    }

    loadNext();
  }

  function startAutoScroll() {
    const speed = 0.3;
    let frame = 0;
  
    function step() {
      scrollContainer.scrollLeft += speed;
      frame++;
  
      if (frame % 60 === 0) {
        console.log(`📦 Frame ${frame}: scrollLeft = ${scrollContainer.scrollLeft}`);
      }
  
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        console.log("🔁 Looping back to start");
        scrollContainer.scrollLeft = 1;
      }
  
      requestAnimationFrame(step);
    }
  
    console.log("🎬 Auto scroll starting");
    requestAnimationFrame(step);
  }

  addItems(startAutoScroll);
});