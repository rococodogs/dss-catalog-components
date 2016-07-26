'use strict'

import React from 'react'
import ResultsList from '../src/search-results/ResultsList.jsx'

import { shallow } from 'enzyme'

const searchResults = (function () {
	const out = []
	let i = 0

	while (i < 15) {
		out.push({id: String(i++)})
	}

	return out
})()

describe('ResultsList', function () {
	it('renders as an ordered list', function () {
		const result = shallow(<ResultsList items={searchResults} />)

		expect(result.type()).toBe('ol')
	})

	it('renders n elements when specifying `limit`', function () {
		const count = Math.floor(Math.random() * searchResults.length)
		const result = shallow(
			<ResultsList
				items={searchResults}
				limit={count}
			/>
		)

		expect(result.find('li').length).toBe(count)
	})

	it('begins at the nth element when specifiying `offset`', function () {
		const limit = 3
		const start = Math.floor(Math.random() * (searchResults.length - limit))

		const el = (
			<ResultsList
				items={searchResults}
				offset={start}
				limit={limit}
			/>
		)

		shallow(el).children().forEach(function (c, idx) {
			expect(c.prop('id')).toEqual(idx + start)
		})
	})
})
