import React from 'react'
import assign from 'object-assign'
import MetadataTableView from '../MetadataTableView.jsx'

const T = React.PropTypes

const ResultsListItem = React.createClass({
	propTypes: {
		linkField: T.string,
		metadata: T.object,
		recordUrl: T.string,
		thumbnailUrl: T.string,
		styles: T.shape({
			container: T.object,
			thumbnail: T.object,
			metadata: T.object,
		}),
		metadataTableProps: T.object,
	},

	getDefaultProps: function () {
		return {
			linkField: 'Title',
			metadata: {},
			thumbnailUrl: '',
			recordUrl: '',
			styles: {
				container: {},
				thumbnail: {},
				metadata: {},
			},
			metadataTableProps: {
				backgroundColor: '#fff',
			}
		}
	},

	handleFormatValue: function (value, key) {
		if (!this.props.recordUrl || key !== this.props.linkField)
			return value

		return <a href={this.props.recordUrl}>{value}</a>
	},

	renderThumbnail: function (styles) {
		if (!this.props.thumbnailUrl)
			return ''

		const img = (
			<img
				style={{width: '100%'}}
				className="result-thumbnail"
				src={this.props.thumbnailUrl}
				/>
		)

		return (
			<figure className="result-item-thumbnail" style={styles}>
				{this.props.recordUrl ? <a href={this.props.recordUrl}>{img}</a> : img}
			</figure>
		)
	},

	render: function () {
		const defaultStyles = {
			container: {
				backgroundColor: '#eee',
				border: '1px solid #ccc',
				boxSizing: 'border-box',
				display: 'table',
				padding: '10px',
				tableLayout: 'fixed',
				width: '100%',
			},
			thumbnail: {
				display: 'table-cell',
				paddingLeft: '5px',
				paddingRight: '5px',
				verticalAlign: 'top',
				width: '20%',
			},
			metadata: {
				display: 'table-cell',
				padding: '5px',
				paddingLeft: '10px',
				paddingTop: 0,
				verticalAlign: 'top',
			}
		}

		const s_container = assign({},
			defaultStyles.container,
			this.props.styles.container 
		)

		const s_thumbnail = assign({},
			defaultStyles.thumbnail,
			this.props.styles.thumbnail
		)

		const s_metadata = assign({},
			defaultStyles.metadata,
			this.props.styles.metadata
		)

		const mdtvProps = assign({}, {
			metadata: this.props.metadata,
			formatValue: this.handleFormatValue,
		}, this.props.metadataTableProps)

		return (
		<div className="result-container" style={s_container}>
			{this.renderThumbnail(s_thumbnail)}

			<section 
				className="result-metadata-display-container"
				style={s_metadata}
				>

				{React.createElement(MetadataTableView, mdtvProps)}
			</section>
		</div>
		)
	}
})

export default ResultsListItem
