/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6D0C26E8-4B33-4FF7-98CF-662DD9B12402"}
 */
var searchText = null;

/**
 * @type {scopes.svyToolbarFilter.ListComponentFilterRenderer}
 *
 * @properties={typeid:35,uuid:"DFEBFEF9-523C-400A-890D-0448551C82A5",variableType:-4}
 */
var toolbarFilter;

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FAA1E80B-C4A9-4511-AB7B-FB4968AB40A8"}
 */
function onAction_btnFilter(event) {
	toolbarFilter.showPopupFilterPicker(event.getSource());
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8A32C836-963E-425E-B426-74EA7F0E5F02"}
 */
function onLoad(event) {
	toolbarFilter = scopes.svyToolbarFilter.createSimpleFilterToolbar(elements.filters);
	
	toolbarFilter
		.addFilter('Customer', 'customerid', scopes.svyToolbarFilter.FILTER_TYPES.SELECT)
		.setValueList('vlPopupCustomers');
	
	toolbarFilter
		.addFilter('City', 'shipcity', scopes.svyToolbarFilter.FILTER_TYPES.TOKEN)
		.setOperator(scopes.svyPopupFilter.OPERATOR.LIKE)
		.setUseInSearch(true);
	
	toolbarFilter
		.addFilter('Order Date', 'orderdate', scopes.svyToolbarFilter.FILTER_TYPES.DATE);
	
	toolbarFilter
		.addFilter('Product', 'orders_to_order_details.productid', scopes.svyToolbarFilter.FILTER_TYPES.SELECT)
		.setValueList('products');
	
	var storedState = application.getUserProperty('filter.' + controller.getName());
	if (storedState) {
		/** @type {Array<{
				id: String,
				dataprovider: String,
				operator: String,
				params: Object,
				text: String,
				values: Array}>}
		*/
		var stateObj = JSON.parse(storedState);
		toolbarFilter.restoreToolbarFiltersState(stateObj);
	}
}

/**
 * Called when the mouse is clicked on a list entry.
 *
 * @param {object} entry
 * @param {number} index
 * @param {string} dataTarget
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DEB9E0BC-3EAC-411D-9FF7-8C8294D7FEF9"}
 */
function onClick_filters(entry, index, dataTarget, event) {
	toolbarFilter.onClick(entry, index, dataTarget, event);
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1E27D772-A555-414B-BCC2-E99F4228257D"}
 * @AllowToRunInFind
 */
function onAction_searchbox(event) {
	toolbarFilter.search(searchText);
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CEEEDFAE-005F-42FD-A04A-ADA0D7B47364"}
 */
function onAction_btnStoreSettings(event) {
	application.setUserProperty('filter.' + controller.getName(), JSON.stringify(toolbarFilter.getToolbarFiltersState()));
}
