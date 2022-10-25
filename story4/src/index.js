const indicators = document.querySelectorAll(".indicator");
const sections = document.querySelectorAll(".year-content");

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
          console.log(section);
          const element = entry.target;
          const indicator = document.querySelector(`a[href='#${element.id}']`);
          indicator.classList.add("active");
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
