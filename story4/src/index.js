const indicators = document.querySelectorAll(".indicator");
const sections = document.querySelectorAll(".year-content");
const timeline = document.querySelector(".yearcount-hide");

// window.addEventListener("scroll", function () {
//   if (window.scrollY <= 2200) {
//     timeline.classList.remove("yearcount-show");
//     timeline.classList.add("yearcount-hide");
//   }
// });

// HIDING TIMELINE WHEN SCROLLING BACK UP
const HideTimeline = (entry) => {
  entry.forEach((entry) => {
    if (entry.isIntersecting) {
      timeline.classList.add("yearcount-hide");
    }
  });
};

const watch = new IntersectionObserver(HideTimeline);

let elements = document.querySelectorAll(".hide");

for (let elm of elements) {
  watch.observe(elm);
}

// TIMELINE FUNCTIONALITY
const resetCurrentActiveIndicator = () => {
  const activeIndicator = document.querySelector(".active");
  activeIndicator.classList.remove("active");
};

const onSectionLeavesViewport = (section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCurrentActiveIndicator();
          const element = entry.target;
          const indicator = document.querySelector(`a[href='#${element.id}']`);
          indicator.classList.add("active");
          timeline.classList.add("yearcount-show");
          return;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    }
  );
  observer.observe(section);
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    resetCurrentActiveIndicator();
    this.classList.add("active");
  });
});

sections.forEach(onSectionLeavesViewport);
