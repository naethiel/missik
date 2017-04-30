$(function Landing() {

	console.log("Landing loaded");

	const isHome = document.querySelector("body").classList.contains("home");
	if (!isHome) { return; }


	const $document = $(document);
	const scrollDownButton = document.querySelector("#scroll-down-icon");
	const name = document.querySelectorAll('#name-block span');

	anime({
		targets: "#logo polygon",
		opacity: [0, 1],
		translateX: ["100px", "0px"],
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
			$(document).trigger("logo:loaded");
		}
	});

	$(document).on("logo:loaded", function(){
		name.forEach((el, index) => {
			setTimeout(() => { el.classList.add("animate-in") }, index * 500)
		});
	});

	document.querySelector("#scroll-down-icon").addEventListener("click", function(e) {
		e.preventDefault();

		const target = e.target.hash;

		$("html, body").animate({
			"scrollTop" : $(target).offset().top
		}, 850);
	});
});
