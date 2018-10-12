function addRemoveActive($this) {
	if ($this.classList.contains('is-active')) {
		$this.classList.remove('is-active');
	} else {
		$this.classList.add('is-active');
	}
}

function openMenu() {
	var menu = document.querySelector('menu');
	
	if ( menu.classList.contains('is-open') ) {
		menu.classList.remove('is-open');
	} else {
		menu.classList.add('is-open');
	}
}

document.getElementById('hamburger').addEventListener('click', function() {
	
	console.log('test');
	openMenu();
	
});