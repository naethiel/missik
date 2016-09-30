console.log("main.js loaded");

var placementAnimation = anime({
  targets: "#logo polygon",
  opacity: [0, 1],
  translateX: ["100px", "0px"],
  loop: "true",
  duration: 1500,
  rotate: function(el, index){
    if (index % 2 == 0) {
      return ["30deg", "0deg"];
    } else {
      return ["-30deg", "0deg"];
    }
  },
  // easing: "easeInOutQuad",
  direction: "alternate",
  delay: function(el, index) {
    return (1000 * index) / (Math.sqrt(index +1)) ;
  },
});
