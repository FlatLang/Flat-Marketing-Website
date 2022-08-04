function initSlide() {
	console.log("init");
	$("slide").each(function (index, node) {
		function refreshSlides() {
			const element = $(node);

			element.toggleClass("slide", true);

			const scroll = $(document).scrollTop();
			const scrollBottom = scroll + $(window).height();

			const y = node.offsetTop;
			const height = node.offsetHeight;
			const distance = Math.abs(scroll - y);

			const active = distance < 100;
			const visible = y + $(window).height() / 3 < scrollBottom && y + height > scroll;
			const rendering = y - 700 < scrollBottom && y + height + 700 > scroll;

			element.toggleClass("active", active)
				.toggleClass("visible", visible)
				.toggleClass("rendering", rendering);
		}

		window.addEventListener("scroll", refreshSlides);

		refreshSlides();
	});
}

$(initSlide);