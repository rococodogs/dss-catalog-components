'use strict'

import React from 'react'
import ResultsListItem from './ResultsListItem.jsx'

const T = React.PropTypes
const reflective = function (a) { return a }

const ResultsList = React.createClass({
	propTypes: {
		items: T.arrayOf(T.shape({
			id: T.oneOfType([T.string, T.number]),
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

			buildThumbnailUrl: reflective,
			buildRecordUrl: reflective,
			linkOnField: 'Title',
		}
	},

	renderResults: function () {
		// in the event that our result set is smaller than our limit
		// we'll choose that as the outer-bounds of our iterator
		const len = this.props.items.length
		const limit = len < this.props.limit ? len : this.props.limit
		const offset = this.props.offset

		const out = []
		let item, idx, thumbnailUrl, recordUrl

		for (let i = 0; i < limit; i++) {
			idx = i + offset
			item = this.props.items[idx]

			out[i] = (
				<li id={idx} key={item.id+idx}>
					<ResultsListItem
						linkField={this.props.linkOnField}
						metadata={item}
						recordUrl={this.props.buildRecordUrl.call(null, item.id)}
						thumbnailUrl={this.props.buildThumbnailUrl.call(null, item.id)}
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
