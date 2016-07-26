import { configure } from '@kadira/storybook'

configure(function () {
	// src
	require('../stories/MetadataTableView.jsx')

	// src/facets
	require('../stories/FacetList.jsx')

	// src/search-results
	require('../stories/ResultsListItem.jsx')
	require('../stories/ResultsList.jsx')

}, module)
