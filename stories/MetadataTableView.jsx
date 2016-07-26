import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import MetadataTableView from '../src/MetadataTableView.jsx'

const catMetadata = {
			'Title': 'A cat a bat hanging',
			'Subject': ['530 ARTS', '531 DECORATIVE ART'],
			'Coverage': 'America Folk Arts',
			'Creator': 'Unknown',
			'IsPartOf': 'Cute cat collection',
		}

storiesOf('MetadataTableView', module)
	.add('renders with complete data', function () {
		return <MetadataTableView metadata={catMetadata}/>
	})
	.add('renders fine with incomplete data', function () {
		const metadata = {
			'Title': '[rm0010] [Calvary Charge]',
			'Subject': '530 ARTS, 531 DECORATIVE ART, 700 ARMED FORCES, 704 GROUND COMBAT FORCES',
			'Coverage': '',
			'Creator': '',
			'IsPartOf': 'East Asia Image Collection, Richard Mammana Japanese Empire Postcard Collection',
		}

		return <MetadataTableView metadata={metadata}/>
	})
	.add('allows border color to be altered', function () {
		return <MetadataTableView metadata={catMetadata} borderColor="#f42069"/>
	})
	.add('use `formatValue` to add links', function () {
		const formatVal = function (v, k) {
			if (k !== 'Subject') return v
			return <a href="#">{v}</a>
		}

		return (
			<MetadataTableView
				metadata={catMetadata}
				formatValue={formatVal}
				/>
		)
	})
