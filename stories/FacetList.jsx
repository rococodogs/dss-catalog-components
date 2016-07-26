import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import FacetList from '../src/facets/FacetList.jsx'

const facets = [
	{ name: '530 ARTS', count: 142 },
	{ name: '200 COMMUNICATION', count: 136 },
	{ name: '5311 VISUAL ARTS', count: 134 },
	{ name: '208 PUBLIC OPINION', count: 134 },
	{ name: '720 WAR', count: 131 },
]

const moreThanFiveFacets = [].concat(facets, [
	{ name: '640 STATE', count: 56 },
	{ name: '648 INTERNATIONAL RELATIONS', count: 45 },
	{ name: '643 CHIEF EXECUTIVE', count: 38 },
])

const linkBuilder = (name, val) => (`#/?${name}=${val}`)

const defaultProps = {
	name: 'Subject.OCM',
	facets: facets,
	buildFacetLink: linkBuilder,
	onClick: action('click'),
	onShowMore: action('show more'),
}

storiesOf('FacetList', module)
	.add('basic facet list, meets maxItems default of 5', () => (
		<FacetList {...defaultProps} />
	))
	.add('with show more link', () => (
		<FacetList
			{...defaultProps}
			facets={moreThanFiveFacets}
		/>
	))
	.add('with a limit of 3', () => (
		<FacetList
			{...defaultProps}
			maxItems={3}
			/>
	))
	.add('maxItems === -1, no limit', () => (
		<FacetList
			{...defaultProps}
			facets={moreThanFiveFacets}
			maxItems={-1}
		/>
	))
