'use strict'

import React from 'react'
import ResultsListItem from './ResultsListItem.jsx'

const T = React.PropTypes
const reflective = function (a) { return a }

const ResultsList = React.createClass({
	propTypes: {
		items: T.arrayOf(T.shape({
			id: T.oneOfType([T.string, T.number]).isRequired,
			data: T.object,
		})).isRequired,

		buildThumbnailUrl: T.func,
		buildRecordUrl: T.func,

		limit: T.number,
		linkOnField: T.string,
		offset: T.number,
	},

	getDefaultProps: function () {
		return {
			limit: 10,
			offset: 0,

			buildThumbnailUrl: null,
			buildRecordUrl: null,
			linkOnField: 'Title',
		}
	},

	handleRecordUrl: function (index, id) {
		const item = this.props.items[index]
		if (typeof this.props.buildRecordUrl === 'function') {
			return this.props.buildThumbnailUrl.call(null, item)
		}

		if (item.recordUrl) {
			return item.recordUrl
		}
	},

	handleThumbnailUrl: function (index, id) {
		const item = this.props.items[index]

		if (typeof this.props.buildThumbnailUrl === 'function') {
			return this.props.buildThumbnailUrl.call(null, item)
		}

		if (item.thumbnailUrl) {
			return item.thumbnailUrl
		}
	},

	renderResults: function () {
		// in the event that our result set is smaller than our limit
		// we'll choose that as the outer-bounds of our iterator
		const length = this.props.items.length
		const offset = this.props.offset
		const limit = this.props.limit

		let max = limit + offset

		if (max > length)
			max = length

		// counter the offset from <li> to keep the ResultsListItem element
		// even with the <ol>'s numbering
		const updatedStyles = {
			container: {
				marginBottom: '20px',
				marginTop: '-20px',
			}
		}

		const out = []
		let item, idx, thumbnailUrl, recordUrl

		for (let idx = offset; idx < max; idx++) {
			item = this.props.items[idx]

			out.push(
				<li id={idx} key={item.id+idx}>
					<ResultsListItem
						linkField={this.props.linkOnField}
						metadata={item.data}
						recordUrl={this.handleRecordUrl.call(null, idx, item.id)}
						thumbnailUrl={this.handleThumbnailUrl.call(null, idx, item.id)}
						styles={updatedStyles}
					/>
				</li>
			)
		}

		return out
	},

	render: function () {
		return (
			<ol className="search-results" start={this.props.offset + 1}>
				{this.renderResults()}
			</ol>
		)
	}
})

export default ResultsList
