'use strict'

import React from 'react'

const T = React.PropTypes

const ResultsListItem = React.createClass({
	propTypes: {
		linkField: T.string,
		metadata: T.object,
		recordUrl: T.string,
		thumbnailUrl: T.string,
	},

	getDefaultProps: function () {
		return {
			linkField: 'Title',
			metadata: {},
			thumbnailUrl: '',
			recordUrl: '',
		}
	},

	renderMetadataTable: function () {
		const dataKeys = Object.keys(this.props.metadata)
		const dataKeysLen = dataKeys.length

		let kids = []
		let i = 0
		let key, val

		for (; i < dataKeysLen; i++) {
			key = dataKeys[i]
			val = this.props.metadata[key]

			kids = kids.concat(<dt key={key+i}>{key}</dt>)

			if (Array.isArray(val))
				kids = kids.concat(val.map(v => <dd key={v+i}>{v}</dd>))
			else
				kids = kids.concat(<dd key={val+i}>{val || ''}</dd>)
		}
		
		return (
			<dl className="metadata-display">
				{kids}
			</dl>
		)

	},

	renderThumbnail: function () {
		if (!this.props.thumbnailUrl)
			return ''

		const img = (
			<img className="result-thumbnail" src={this.props.thumbnailUrl}/>
		)

		if (!this.props.recordUrl) 
			return img

		return <a href={this.props.recordUrl}>{img}</a>
	},

	render: function () {
		return (
		<div className="result-container">
			<figure className="result-item-thumbnail">
				{this.renderThumbnail()}
			</figure>

			<section className="result-metadata-display-container">
				{this.renderMetadataTable()}
			</section>
		</div>
		)
	}
})

export default ResultsListItem
