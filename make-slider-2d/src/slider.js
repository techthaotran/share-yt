class Slider {
  constructor({
    container,
    wrapper,
    prevButton,
    nextButton,
    slidePerView,
    slideGap,
  }) {
    this.container = document.querySelector(container);
    this.wrapper = this.container.querySelector(wrapper);
    this.prevButton = this.container.querySelector(prevButton);
    this.nextButton = this.container.querySelector(nextButton);

    this.slidePerView = slidePerView;
    this.slideGap = slideGap;
    this.currentIndex = 0;
    this.slideItems = Array.from(this.wrapper.children);
  }
  init() {
    this.updateSlidePerView();
    this.updateSlideWidth();
    console.log("a", this.prevButton);
    this.prevButton.addEventListener("click", () => {
      this.prev();
    });
    this.nextButton.addEventListener("click", () => {
      this.next();
    });
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
    this.wrapper.style.transition = `transform 0.5s ease-in-out`
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
}

export default Slider;
