// fakes a table using definition lists
'use strict'

import React from 'react'

const T = React.PropTypes
const reflective = function (t) { return t }

const MetadataTableView = React.createClass({
	propTypes: {
		metadata: T.object.isRequired,

		borderColor: T.string,

		formatTerm: T.func,
		formatValue: T.func,
	},

	getDefaultProps: function () {
		return {
			borderColor: '#bbb',
			borderWidth: '1px',
			borderStyle: 'solid',

			formatTerm: reflective,
			formatValue: reflective,
		}
	},

	handleFormatTerm: function (key) {
		const formatted = this.props.formatTerm(key)
		return formatted
	},

	handleFormatValue: function (val, key) {
		const formatted = this.props.formatValue(val, key)
		return formatted
	},

	renderClearfix: function (i) {
		return <div key={'cf'+i} style={{display: 'block', clear: 'both'}}/>
	},

	renderTerm: function (term, idx) {
		const style = {
			float: 'left',
			minHeight: '1.1em',
			fontWeight: 'bold',
			padding: '8px',
			width: '14em',
			wordWrap: 'break-word',
		}

		// dt:not(:first-of-type)
		if (idx !== 0) {
			style.borderTopColor = this.props.borderColor
			style.borderTopWidth = this.props.borderWidth
			style.borderTopStyle = this.props.borderStyle
		}
		
		const formatted = this.handleFormatTerm(term)
		if (formatted !== null) {
			return (
				<dt key={term+idx} style={style}>
					{formatted}	
				</dt>
			)
		}
	},

	renderValue: function (val_, key, idx) {
		const style = {
			borderLeftColor: this.props.borderColor,
			borderLeftWidth: this.props.borderWidth,
			borderLeftStyle: this.props.borderStyle,
			minHeight: '1.1em',
			marginLeft: '15em',
			padding: '8px',
		}

		// dd:not(:first-of-type)
		if (idx !== 0) {
			style.borderTopColor = this.props.borderColor
			style.borderTopWidth = this.props.borderWidth
			style.borderTopStyle = this.props.borderStyle
		}

		const wrap = function (v, i) {
			return <dd style={style} key={v+idx+i}>{v}</dd>
		}

		// arrayify if need be
		const val = [].concat(val_)

		return val.map(function (v, i) {
			const formatted = this.handleFormatValue(v, key)
			return wrap(formatted, i)
		}.bind(this))
	},

	renderMetadata: function () {
		const metadata = this.props.metadata
		const keys = Object.keys(metadata)
		const keylen = keys.length

		let out = []
		let i = 0
		let key, val

		for (; i < keylen; i++) {
			key = keys[i]
			val = metadata[key]

			out = out.concat(
				this.renderTerm(key, i),
				this.renderValue(val, key, i),
				this.renderClearfix(i)
			)
		}

		return out
	},

	render: function () {
		return (
		<dl className="metadata-table-view">
			{this.renderMetadata()}
		</dl>
		)
	}
})

export default MetadataTableView
