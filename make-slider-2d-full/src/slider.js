class Slider {
  constructor({
    container,
    wrapper,
    prevButton,
    nextButton,
    slidePerView,
    slideGap,
    autoPlay = {
      status: false,
      interval: 3000,
    },
  }) {
    this.container = document.querySelector(container);
    this.wrapper = this.container.querySelector(wrapper);
    this.prevButton = this.container.querySelector(prevButton);
    this.nextButton = this.container.querySelector(nextButton);

    this.slidePerView = slidePerView;
    this.slideGap = slideGap;
    this.currentIndex = 0;
    this.slideItems = Array.from(this.wrapper.children);

    this.autoPlay = autoPlay;

    //Drag variables
    this.translateX = 0;
    this.startX = 0;
    this.progress = 0;
    this.isDragging = true;

    this.rafId = null;
    this.wrapWidth = 0;
    this.maxScroll = 0;
  }
  init() {
    this.updateSlidePerView();
    this.updateSlideWidth();
    this.prevButton.addEventListener("click", () => {
      this.prev();
    });
    this.nextButton.addEventListener("click", () => {
      this.next();
    });

    this.startAutoPlay();
    this.wrapWidth = this.slideItems[0].clientWidth * this.slideItems.length;
    this.maxScroll = this.wrapWidth - this.container.clientWidth;

    this.wrapper.addEventListener('touchstart',(e)=>this.touchStart(e))
    this.wrapper.addEventListener('touchmove',(e)=>this.touchMove(e))
    this.wrapper.addEventListener('touchend',(e)=>this.touchEnd(e))

    this.wrapper.addEventListener('mousedown',(e)=>this.touchStart(e))
    this.wrapper.addEventListener('mousemove',(e)=>this.touchMove(e))
    this.wrapper.addEventListener('mouseup',(e)=>this.touchEnd(e))
     this.wrapper.addEventListener('mouseleave',(e)=>this.touchEnd(e))
  }
  updateSlidePerView() {
    if (this.slidePerView > 1) {
      this.slideItems.forEach((item) => {
        item.style.flex = `0 0 ${100 / this.slidePerView}%`;
        item.style.marginRight = `${this.slideGap}px`;
      });
      return;
    }
    this.slideItems.forEach((item) => {
      item.style.flex = `0 0 100%`;
      item.style.marginRight = `${this.slideGap}px`;
    });
  }
  updateSlideWidth() {
    this.slideWidth = this.slideItems[0].getBoundingClientRect().width;
  }
  updatePosition() {
    let offset = this.currentIndex * this.slideWidth;
    this.wrapper.style.transform = `translateX(-${offset}px)`;
    this.wrapper.style.transition = `transform 0.5s ease-in-out`;
  }
  next() {
    if (this.currentIndex < this.slideItems.length - this.slidePerView) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updatePosition();
  }
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, this.currentIndex - this.slidePerView);
    }
    this.updatePosition();
  }
  startAutoPlay() {
    if (this.autoPlay.status) {
      this.autoPlay.timer = setInterval(() => {
        this.next();
      }, this.autoPlay.interval);
    }
  }
  stopAutoPlay() {
    if (this.autoPlay.status && this.autoPlay.timer) {
      clearInterval(this.autoPlay.timer);
    }
  }
  touchStart(e) {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.clientX || e.touches[0].clientX;
    this.wrapper.classList.add("dragging");
    this.wrapper.style.transition = "none";
  }
  touchMove(e) {
    if (!this.isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    this.progress = this.progress + (this.startX - x) * 2.5;
    this.startX = x;
    this.move()
  }
  touchEnd(e) {
    this.isDragging = false;
    this.wrapper.classList.remove("dragging");
  }
  move() {
    cancelAnimationFrame(this.rafId)
    const animate = () => {
      this.progress = this.clamp(this.progress, 0, this.maxScroll);
      this.translateX = this.lerp(this.translateX, this.progress,0.1)
      this.wrapper.style.transform = `translateX(-${this.translateX}px)`;
      this.rafId = requestAnimationFrame(animate)
    };
    this.rafId = requestAnimationFrame(animate)
  }
  clamp(value, minValue, maxValue) {
    if (value < minValue) return minValue;
    if (value > maxValue) return maxValue;
    return value;
  }
  lerp(startValue, endValue, t) {
    // 0 < t <1
    return startValue + (endValue - startValue) * t;
  }
}

export default Slider;
