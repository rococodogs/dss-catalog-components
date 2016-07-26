import React from 'react'

const T = React.PropTypes

const SidebarListFacet = React.createClass({
	propTypes: {
		name: T.string.isRequired,

		buildFacetLink: T.func.isRequired,

		facets: T.arrayOf(T.shape({
			name: T.string,
			count: T.number,
		})).isRequired,

		onClick: T.func.isRequired,
		onShowMore: T.func.isRequired,

		displayHeading: T.bool,
		maxItems: T.number,
		showMoreText: T.string,
	},

	getDefaultProps: function () {
		return {
			displayHeading: true,
			maxItems: 5,
			onShowMore: function () {},
			showMoreText: 'Show more...'
		}
	},

	getFilteredFacets: function () {
		const sorted = this.props.facets.sort((a,b) => a.count < b.count ? 1 : -1)
		
		if (this.props.maxItems === -1)
			return sorted

		return sorted.slice(0, this.props.maxItems)
	},

	handleFacetClick: function (val, ev) {
		// if event is passed, prevent it
		if (ev) 
			ev.preventDefault()

		this.props.onClick.call(null, val)
	},

	handleShowMore: function () {
		this.props.onShowMore()
	},

	maybeRenderShowMoreLink: function () {
		if (this.props.maxItems === -1) 
			return
		
		if (this.props.facets.length > this.props.maxItems) {
			return (
				<li>
					<a href="#" onClick={this.handleShowMore}>
						{this.props.showMoreText}
					</a>
				</li>
			)
		}
	},

	renderFacetListItems: function () {
		const facets = this.getFilteredFacets()
		const name = this.props.name

		return facets.map((f,i) => (
			<li key={f+i}>
				<a 
					href={this.props.buildFacetLink(this.props.name, f.name)}
					onClick={this.handleFacetClick.bind(null, f.name)}
				>
					{f.name} ({f.count})
				</a>
			</li>
		))
	},

	render: function () {
		return (
		<div className="sidebar-list-facet">
			{this.props.displayHeading ? <h4>{this.props.name}</h4> : ''}
			<ul>
				{this.renderFacetListItems()}
				{this.maybeRenderShowMoreLink()}
			</ul>
		</div>
		)
	}
})

export default SidebarListFacet
