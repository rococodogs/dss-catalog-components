import React from 'react'
import FacetList from '../../src/facets/FacetList.jsx'
import { shallow } from 'enzyme'

describe('FacetList', function () {
	let props

	beforeEach(function() {
		props = {
			name: 'Test Facets',
			buildFacetLink: function (a, b) { return `?${a}=${b}`},
			facets: [
				{ name: 'Cats', count: 32 },
				{ name: 'Dogs', count: 13 },
				{ name: 'Sloths', count: 48 },
				{ name: 'Dolphins', count: 36 },
				{ name: 'Puffins', count: 18 },
				{ name: 'Worms', count: 1 },
				{ name: 'Parakeet', count: 21 },
			],
			onClick: function () {},
			onShowMore: function () {},
		}
	})

	it('should render as a <div/> with header + list elements', function () {
		const rendered = renderFacetList(shallow, props)

		expect(rendered.find('h4').length).toBeTruthy()
		expect(rendered.find('ul').length).toBeTruthy()
	})

	it('should sort facet <li/> elements by `count`', function () {
		const showMore = 'Show More'
		props.showMoreText = showMore

		const rendered = renderFacetList(shallow, props)
		const lis = rendered.find('li')
		let lastNum

		lis.forEach(function (el) {
			const txt = el.text()

			// skip 'Show More' link
			if (txt === showMore) 
				return

			// convert 'Cats (32)' into the number 32
			const num = Number(txt.match(/\((\d+)\)/g)[0].replace(/\(|\)/g, ''))

			if (lastNum)
				expect(lastNum).toBeGreaterThan(num)

			lastNum = num
		})
	})

	it('should render a `Show more` link if facets.length > maxItems', function () {
		const max = rand(props.facets.length - 2)
		const showMoreTxt = 'Show me more!'
		
		props.maxItems = max
		props.showMoreText = showMoreTxt

		const rendered = renderFacetList(shallow, props)

		// need to add 1 to account for 'Show more' link
		expect(rendered.find('li').length).toEqual(max + 1)
		expect(rendered.find('li').last().text()).toEqual(showMoreTxt)
	})

	it ('should not render a `Show more` link if facets.length <= maxItems', function () {
		const max = rand(props.facets.length - 1)
		const txt = 'Show more'

		props.facets = props.facets.slice(0, max)
		props.maxItems = max
		props.showMoreText = txt

		const rendered = renderFacetList(shallow, props)

		expect(rendered.find('li').length).toEqual(max)
		expect(rendered.last().text()).not.toEqual(txt)
	})

	it('should not render a heading if `displayHeading` is false', function () {
		props.displayHeading = false

		const rendered = renderFacetList(shallow, props)

		expect(rendered.find('h4').length).toBe(0)
	})

	it('should trigger `onClick` when a facet is clicked (but not `Show More`)', function () {
		const max = 5
		let clickCount = 0
		let showMoreCount = 0

		props.maxItem = max
		props.onClick = function (val) {
			expect(val).toBeTruthy()
			clickCount++
		}
		props.onShowMore = function () {
			showMoreCount++
		}

		const rendered = renderFacetList(shallow, props)
		const whichIdx = rand(max)

		const target = rendered.find('li').at(whichIdx)
		target.find('a').simulate('click')

		rendered.find('li').last().find('a').simulate('click')

		expect(clickCount).toBe(1)
		expect(showMoreCount).toBe(1)
	})

	it('should build links using the `buildFacetLink`', function () {
		const name = 'Facet Name'
		props.name = name
		props.buildFacetLink = function (name, facet) {
			return `/facet?${name}=${facet}`
		}

		const sortedFacets = props.facets.sort(function (a,b) {
			return a < b ? 1 : -1
		})

		const rendered = renderFacetList(shallow, props)
		const href = rendered.find('a').first().prop('href')

		expect(href).toEqual(`/facet?${name}=${sortedFacets[0].name}`)
	})
})

function rand (total) {
	return Math.floor(Math.random() * total)
}

function renderFacetList (renderer, props) {
	return renderer(React.createElement(FacetList, props))
}
