'use strict'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ResultsList from '../src/search-results/ResultsList.jsx'

const searchResults = (function () {
	const out = []
	var i = 0

	while (i < 15) {
		out.push({id: String(i++)})
	}

	return out
})()

describe('ResultsList', function () {
	it('renders as an ordered list', function () {
		const result = renderEl(<ResultsList items={searchResults} />)

		expect(result.type).toBe('ol')
	})

	it('renders n elements when specifying `limit`', function () {
		const count = Math.floor(Math.random() * searchResults.length)

		const result = renderEl(
			<ResultsList
				items={searchResults}
				limit={count}
			/>
		)

		expect(React.Children.count(result.props.children)).toBe(count)
	})

	it('begins at the nth element when specifiying `offset`', function () {
		const limit = 3
		const start = Math.floor(Math.random() * searchResults.length - limit)

		const el = (
			<ResultsList
				items={searchResults}
				offset={start}
				limit={limit}
			/>
		)

		const result = renderEl(el)
		const kids = React.Children.toArray(result.props.children)

		expect(kids.length).toEqual(limit)

		let count = 0

		React.Children.forEach(kids, (c, idx) => {
			const id = c.props.id
			const expected = start + idx

			expect(id).toEqual(expected)
		})
	})
})

function renderEl(el) {
	const renderer = TestUtils.createRenderer()
	renderer.render(el)

	return renderer.getRenderOutput()
}
