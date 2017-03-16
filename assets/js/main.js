console.log("main.js loaded");


$(document).ready(function(){
	initSidebar();

	initNavBar();

	if(document.querySelector("body").classList.contains("home")) {
		initLanding();
	}

	if (document.querySelector("body").classList.contains("project-single")) {
		initProjectPage();
	}
});


// Only for project single page

function initProjectPage() {
	const headline = document.querySelector("body > header .wrapper h1");

	window.addEventListener("scroll", function() {
		const windowHeight = window.innerHeight;

		var scale = 1 - (window.pageYOffset * .2 / windowHeight);
		var opacity = 1 - (window.pageYOffset * 4 / windowHeight);

		headline.setAttribute("style",
			"transform: scale(" +  scale + ");"
			+ "opacity: " + opacity);

	});
}


// Sidebar behavior

function initSidebar() {
	const sidebar = document.querySelector("#sidebar");
	const sidebarOpenBtn = document.querySelector("#sidebar-open-btn");
	const sidebarCloseBtn = document.querySelector("#sidebar-close-btn");

	sidebarOpenBtn.addEventListener("click", function(e) {
		e.preventDefault();
		sidebar.classList.toggle("open");
	});

	sidebarCloseBtn.addEventListener("click", function(e) {
		e.preventDefault();
		sidebar.classList.toggle("open");
	});
}

function initNavBar() {
	const navbar = document.querySelector("#main-navbar.home-navigation");
	if (navbar) {
		window.addEventListener("scroll", function(){
			const landing = document.querySelector("body > header");
			const landingHeight = landing.clientHeight;

			(window.pageYOffset > landingHeight) ? navbar.classList.add("scrolled") : navbar.classList.remove("scrolled");
		});

		// check navbar display on pageload

	}
}

function initLanding() {
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
			$(document).trigger("logo:loaded");
		}
	});

	$(document).on("logo:loaded", function(){
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
	});
}
