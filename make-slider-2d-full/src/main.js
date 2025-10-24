import Slider from "./slider";
document.addEventListener("DOMContentLoaded", () => {
  const sl = new Slider({
    container: ".slider",
    wrapper: ".sliderWrapper",
    prevButton: ".slider-btn.prev",
    nextButton: ".slider-btn.next",
    slidePerView: 4,
    slideGap: 10,
    autoPlay: {
      status: false,
      interval: 1000,
    },
  });
  sl.init();
});
