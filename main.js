const filterOptions = document.getElementById('products-list-options')
const filterMenu = document.getElementById('products-list-menu')
filterMenu.onclick = () => {
	filterOptions.style.display == 'none'
		? (filterOptions.style.display = 'flex')
		: (filterOptions.style.display = 'none')
}

const productFilter = document.getElementById('product-filter')
const productCards = Object.values(document.querySelectorAll('.product-card'))

/** @type {Array} */
const filterButtons = Object.values(document.querySelectorAll('.list-option'))
filterButtons.forEach(b => {
	b.onclick = () => {
		const type = b.textContent
		productFilter.textContent = type
		filterOptions.style.display = 'none'

		productCards.forEach(p => {
			if (type == 'All' || p.getAttribute('p-type') == type) {
				p.style.display = 'block'
				const animation = p.animate(
					{
						opacity: [0, 1],
						scale: [0, 1],
            rotate: ['180deg', '360deg']
					},
					300
				)
			} else {
        p.style.display = 'none'
			}
		})
	}
})

const menuIcon = document.getElementById('menu-icon')
const navTabs = document.getElementById('nav-tabs')
const navButton = document.getElementById('nav-button')

window.addEventListener('touchstart', e => {
	if (menuIcon.style.display != 'none') {
		const clsName = e.target.getAttribute('class')
		if (clsName == 'menuIcon') {
			if (navTabs.style.display == 'none') navTabs.style.display = 'flex'
			else navTabs.style.display = 'none'
		} else if (clsName != 'menu-item' && clsName != 'nav-wide') {
			navTabs.style.display = 'none'
		}
	}

	if (filterOptions.style.display != 'none') {
		const clsName = e.target.getAttribute('class')
		const tag = e.target.tagName
		// console.log({clsName, tag})
		if (clsName != 'filterButton' && clsName != 'list-option') {
			filterOptions.style.display = 'none'
		}
	}
})
