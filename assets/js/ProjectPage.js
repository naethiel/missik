$(function ProjectPage() {

	console.log("ProjectPage loaded");

	const isProjectPage = document.querySelector("body").classList.contains("project-single");

	if (!isProjectPage) {
		return;
	}

	const headline = document.querySelector("body > header .wrapper h1");

	window.addEventListener("scroll", function() {
		const windowHeight = window.innerHeight;

		var scale = Math.max((1 - (window.pageYOffset / 2 / windowHeight)), 0.8);
		var opacity = Math.max((1 - (window.pageYOffset * 3 / windowHeight)), 0);

		headline.setAttribute("style",`
			transform: scale(${scale});
			opacity: ${opacity};
		`);

	});
});
