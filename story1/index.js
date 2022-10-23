window.onscroll = function () {
  onScroll();
};
// calculate max scroll top position

const onScroll = () => {
  // console.log(firstDiv.clientHeight - h1Text.clientHeight);
  const firstDiv = document.querySelector(".bkg");
  const firstText = document.getElementById("first-text");
  const divHeight = firstDiv.clientHeight;
  const bodyHeight = document.body.clientHeight;
  const scrollHeight = document.documentElement.scrollTop;
  const textHeight = firstText.clientHeight;
  const heightDiff = bodyHeight - divHeight;
  console.log(scrollHeight, heightDiff, textHeight);
  // console.log(
  //   scrollHeight,
  //   heightDiff + firstText.clientHeight - divHeight / 2
  // );
  //   console.log(document.documentElement.scrollTop, height);

  if (scrollHeight > heightDiff - textHeight / 2 - divHeight / 2) {
    firstText.className = "black-text";
    // secondText.className = "white-text";
  } else {
    firstText.className = "white-text";
    // secondText.className = "hidden";
  }
};

// window.addEventListener("scroll", (event) => {
//   console.log("Scrolling...");
// });
