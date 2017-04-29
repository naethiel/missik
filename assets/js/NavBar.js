$(function NavBar() {

	console.log("NavBar loaded");

	const homeNavbar = document.querySelector("#main-navbar.home-navigation");
	
	if (homeNavbar) {
		window.addEventListener("scroll", function(){
			const landing = document.querySelector("body > header");
			const landingHeight = landing.clientHeight;

			(window.pageYOffset > landingHeight) ? homeNavbar.classList.add("scrolled") : homeNavbar.classList.remove("scrolled");
		});
	}
});
