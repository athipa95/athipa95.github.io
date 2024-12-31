document.querySelectorAll('footer button').forEach(button => {
	button.addEventListener('click', () => {
		const targetId = button.getAttribute('data-target');
		const targetSection = document.getElementById(targetId);

		if (targetSection) {
			window.scrollTo({
				top: targetSection.offsetTop,
				behavior: 'smooth'
			});
		}
	});
});
