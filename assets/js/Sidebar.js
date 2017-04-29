$(function Sidebar(){

	console.log("Sidebar loaded");

	const sidebar = document.querySelector("#sidebar");
	const sidebarToggleBtn = document.querySelector("#sidebar-toggle-btn");

	sidebarToggleBtn.addEventListener("click", function(e) {
		e.preventDefault();
		sidebar.classList.toggle("open");
		sidebarToggleBtn.classList.toggle("open");
	});
});
