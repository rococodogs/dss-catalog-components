'use strict'

import React from 'react'
import ResultsListItem from '../src/search-results/ResultsListItem.jsx'
import { shallow } from 'enzyme'

const metadata = {
	'Title': '[rm0010] [Calvary Charge]',
	'Subject': '530 ARTS, 531 DECORATIVE ART, 700 ARMED FORCES, 704 GROUND COMBAT FORCES',
	'Coverage': '',
	'Creator': '',
	'IsPartOf': 'East Asia Image Collection, Richard Mammana Japanese Empire Postcard Collection',
}

describe('ResultsListItem', function () {
	let el

	beforeEach(function () {
		el = (
			<ResultsListItem
				metadata={metadata}
				recordUrl="http://example.com/abc123"
				thumbnailUrl="http://placekitten.com/200/200"
			/>
		)
	})

	it('renders as a div', function () {
		expect(shallow(el).type()).toBe('div')
	})

	it('has a child for the thumbnail + metadata', function () {
		expect(shallow(el).children().length).toBe(2)
	})

	it('has an empty <figure> el if no thumbnail passed', function () {
		const rendered = shallow(<ResultsListItem metadata={metadata} />)
		expect(rendered.find('figure').children().isEmpty()).toBeTruthy()
	})

	it('has an <img/> element when passed a thumbnailUrl', function () {
		const rendered = shallow(el)
		expect(rendered.find('img').length).toBe(1)
	})

	it('has a <dl/> element for metadata', function () {
		const rendered = shallow(el)
		expect(rendered.find('dl')).toBeTruthy()
	})

	it('has as many <dt/> elements as metadata keys', function () {
		const numberOfKeys = Object.keys(metadata).length
		const rendered = shallow(el)

		expect(rendered.find('dt').length).toEqual(numberOfKeys)
	})
})

