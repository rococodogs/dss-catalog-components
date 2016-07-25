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

		return (
			<table className="search-result-data-table">
				<tbody>
					{dataKeys.map((key, idx) => {
						const val = this.props.metadata[key]
						
						return (
							<tr key={key}>
								<th>{key}</th>
								<td>{key === this.props.linkField 
										 ? <a href={this.props.recordUrl}>{val}</a>
										 : val}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	},

	renderThumbnail: function () {
		if (!this.props.thumbnail) return ''

		return (
			<a href={this.props.recordUrl}>
				<img 
					className="search-results-thumbnail"
					src={this.props.thumbnailUrl} 
					/>
			</a>
		)
	},

	render: function () {
		return (
		<div className="search-result-item">
			<section className="search-result-item-thumbnail">
				{this.renderThumbnail()}
			</section>

			<section className="search-result-item-data">
				{this.renderMetadataTable()}
			</section>
		</div>
		)
	}
})

export default ResultsListItem
