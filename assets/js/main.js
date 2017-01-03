console.log("main.js loaded");


$(document).ready(function(){
	anime({
		targets: "#logo polygon",
		opacity: [0, 1],
		translateX: ["100px", "0px"],
		// loop: "true",
		duration: 1000,
		rotate: function(el, index){
			if (index % 2 === 0) {
				return ["45deg", "0deg"];
			} else {
				return ["-45deg", "0deg"];
			}
		},
		easing: "easeInOutQuad",
		elasticity: 100,
		direction: "normal",
		delay: function(el, index) {
			return (500 * index) / (Math.sqrt(index +1)) ;
		},
		complete: function(e){
			$(document).trigger("logo.loaded");
		}
	});

	$("#projects-carousel").carousel({
		interval: 4000
	})
});

$(document).on("logo.loaded", function(){
	anime({
		targets: "#name",
		translateY: ["10px", "0px"],
		duration: 1000,
		opacity: [0, 1],
		easing: "easeOutQuad",
		complete: function(e){
			$(document).trigger("name.loaded");
		}
	})
})
