import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ResultsListItem from '../src/search-results/ResultsListItem.jsx'

const metadata = {
	'Title': '[rm0010] [Calvary Charge]',
	'Subject': '530 ARTS, 531 DECORATIVE ART, 700 ARMED FORCES, 704 GROUND COMBAT FORCES',
	'Coverage': '',
	'Creator': '',
	'IsPartOf': 'East Asia Image Collection, Richard Mammana Japanese Empire Postcard Collection',
}

const styles = {
	container: {
		fontFamily: 'Arial, sans-serif',
		fontSize: '14px',
	},
}

storiesOf('search-results/ResultsListItem', module)
	.add('renders with thumbnail', function () {
		return (
			<ResultsListItem
				metadata={metadata}
				recordUrl="http://example.com/abc123"
				thumbnailUrl="http://placekitten.com/200/300"
				styles={styles}
			/>
		)
	})
	.add('renders only the metadata if no thumbnailUrl', function () {
		return (
			<ResultsListItem
				metadata={metadata}
				styles={styles}
			/>
		)
	})
