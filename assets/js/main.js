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

		var scale = Math.max((1 - (window.pageYOffset / 2 / windowHeight)), 0.8);
		var opacity = Math.max((1 - (window.pageYOffset * 3 / windowHeight)), 0);

		headline.setAttribute("style",
			"transform: scale(" +  scale + ");"
			+ "opacity: " + opacity);

	});
}


// Sidebar behavior

function initSidebar() {
	const sidebar = document.querySelector("#sidebar");
	const sidebarToggleBtn = document.querySelector("#sidebar-toggle-btn");

	sidebarToggleBtn.addEventListener("click", function(e) {
		e.preventDefault();
		sidebar.classList.toggle("open");
		sidebarToggleBtn.classList.toggle("open");
	});
}

function initNavBar() {
	const homeNavbar = document.querySelector("#main-navbar.home-navigation");
	if (homeNavbar) {
		window.addEventListener("scroll", function(){
			const landing = document.querySelector("body > header");
			const landingHeight = landing.clientHeight;

			(window.pageYOffset > landingHeight) ? homeNavbar.classList.add("scrolled") : homeNavbar.classList.remove("scrolled");
		});
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
				$(document).trigger("name:loaded");
			}
		})
	});

	document.querySelector("#scroll-down-icon").addEventListener("click", function(e) {
		e.preventDefault();

		const target = e.target.hash;

		$("html, body").animate({
			"scrollTop" : $(target).offset().top
		}, 850);
	});
}
