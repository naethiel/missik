$(function Header() {
	console.log("Header loaded");
	// forcing header resize through JS because vh unit buggy Safari is getting on my nerves.

	const header = document.querySelector("body > header");
	const isHome = document.querySelector("body").classList.contains("home");
	const $document = $(document);
	const $window = $(window);

	$document.on("header:recalc", function(){
		const viewportHeight = $window.height();
		const viewportWidth = $window.width();

		if (viewportWidth < 768 && !isHome) {
			console.log(viewportWidth);
			header.style.height = `${viewportHeight * .75}px`;
		} else {
			header.style.height = `${viewportHeight}px`;
		}
	});

	$window.on("resize", function() {
		$document.trigger("header:recalc");
	});

	$document.trigger("header:recalc");
});
