const menuIcon = document.getElementById('menu-icon')
const navTabs = document.getElementById('nav-tabs')
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

		filterButtons.forEach(v =>
			v != b ? (v.style.color = '#4B4B4B80') : (b.style.color = '#4B4B4B')
		)

		productCards.forEach(p => {
			if (type == 'All' || p.getAttribute('p-type') == type) {
				p.style.display = 'block'
				p.animate([{ transform: 'scale(0.3)' }, { transform: 'scale(1)' }], {
					duration: 300,
				})
			} else {
				p.style.display = 'none'
			}
		})
	}
})

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
		if (clsName != 'filterButton' && clsName != 'list-option') {
			filterOptions.style.display = 'none'
		}
	}
})

const showCaseImages = Object.values(
	document.querySelectorAll('.show-case-image')
)
const showCaseLen = showCaseImages.length

const showLeft = document.getElementById('showCaseLeft')
showLeft.disabled = true

const showRight = document.getElementById('showCaseRight')
let currentIndex = 0
showRight.onclick = () => {
	currentIndex++
	const currentImage = showCaseImages[currentIndex - 1]
	const nextImage = showCaseImages[currentIndex]

	nextImage.hidden = false
	nextImage.animate(
		{
			opacity: [0, 1],
		},
		300
	)

	if (showLeft.disabled) showLeft.disabled = false
	if (currentIndex == showCaseLen - 1) {
		showRight.disabled = true
	}
}

showLeft.onclick = () => {
	currentIndex--
	const nextImage = showCaseImages[currentIndex]
	const currentImage = showCaseImages[currentIndex + 1]
	nextImage.hidden = false
	const currentAnimation = currentImage.animate(
		{
			opacity: [1, 0],
		},
		300
	)
	currentAnimation.onfinish = () => (currentImage.hidden = true)

	if (showRight.disabled) showRight.disabled = false
	if (currentIndex == 0) {
		showLeft.disabled = true
	}
}

const productsSection = document.getElementById('products')
const showcaseSection = document.getElementById('show-case')
const bottomSection = document.getElementById('bottom')

window.onload = () => animateSections()
window.onscroll = () => animateSections()

function animateSections(scrollClass) {
	addScrollClass(productsSection, 'products-post-scroll', 400, 100)
	addScrollClass(showcaseSection, 'showcase-post-scroll', 300, 0)
	addScrollClass(bottomSection, 'bottom-post-scroll', 150, 0)
}

function addScrollClass(section, className, showOffset, hideOffset) {
	const sectionHeight = section.getBoundingClientRect().top
	if (sectionHeight <= window.innerHeight - showOffset) {
		section.classList.add(className)
	} else if (sectionHeight > window.innerHeight - hideOffset) {
		section.classList.remove(className)
	}
}
