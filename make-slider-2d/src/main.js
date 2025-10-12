import Slider from "./slider";
document.addEventListener("DOMContentLoaded", () => {
  const sl = new Slider({
    container: ".slider",
    wrapper: ".sliderWrapper",
    prevButton: ".slider-btn.prev",
    nextButton: ".slider-btn.next",
    slidePerView: 3,
    sideGap: 10,
  });
  sl.init()
});
