import React from 'react'
import MetadataTableView from '../MetadataTableView.jsx'

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

	handleFormatValue: function (value, key) {
		if (!this.props.recordUrl || key !== this.props.linkField)
			return value

		return <a href={this.props.recordUrl}>{value}</a>
	}

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
				<MetadataTableView 
					metadata={metadata}
					formatValue={this.handleFormatValue}
				/>
			</section>
		</div>
		)
	}
})

export default ResultsListItem
