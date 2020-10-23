/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ADB453C4-D190-4BE0-93AE-D6C34FF82E4E"}
 */
var searchText = null;

/**
 * @type {scopes.svyToolbarFilter.ListComponentFilterRenderer}
 *
 * @properties={typeid:35,uuid:"30AE6150-1BE1-41D9-A9C2-99E5E9DB97BA",variableType:-4}
 */
var toolbarFilter;

/**
 * @properties={typeid:35,uuid:"392D24B4-4F7E-4FD8-BAB9-B1763943F0DF",variableType:-4}
 */
var autoApplyFilters = true;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1EA9C25D-7811-49F6-858C-679CD8F411B5"}
 */
function onLoad(event) {
	scopes.svyToolbarFilter.setConfigUseNonVisibleColumns(false);
	
	toolbarFilter = scopes.svyToolbarFilter.createFilterToolbar(elements.filterToolbar, elements.table);
	
	toolbarFilter.setOnFilterCreate(onFilterCreate);
	toolbarFilter.setOnFilterAddedCallback(filterAdded);
	toolbarFilter.setOnFilterApplyCallback(filterApplied);
	toolbarFilter.setOnFilterRemovedCallback(filterRemoved);
	toolbarFilter.setOnFilterApplyQueryCondition(filterApplyQueryCondition);
	toolbarFilter.setOnSearchCommand(onSearch);
	toolbarFilter.setAutoApplyFilters(autoApplyFilters);
	
	toolbarFilter.addFilter('Discount', 'orders_to_order_details.discount', scopes.svyToolbarFilter.FILTER_TYPES.NUMBER);
	
	var filter = toolbarFilter.getFilter('orders_to_order_details.discount');
	filter.setUseInSearch(true);
	
//	toolbarFilter.setAutoApplyFilters(false);
	toolbarFilter.getSimpleSearch().addSearchProvider('orders_to_customers.companyname');
}

/**
 * @param {scopes.svyToolbarFilter.Filter} filter
 * @return {scopes.svyPopupFilter.AbstractPopupFilter}
 *
 * @properties={typeid:24,uuid:"D59CFD13-7ECC-48BB-AA69-5E784FA76604"}
 */
function onFilterCreate(filter) {
	if (filter.dataprovider && filter.dataprovider === 'shipcity') {
		var result = scopes.svyPopupFilter.createTokenFilter()
		result.setOperator(scopes.svyPopupFilter.OPERATOR.LIKE_CONTAINS);
		return result;
	}
	return null;
}

/**
 * @param {QBSelect} qbselect
 * @param {JSFoundSet} fs
 *
 * @properties={typeid:24,uuid:"27CB697D-5FB4-4649-AD8B-68183AF421ED"}
 */
function onSearch(qbselect, fs) {
	/** @type {QBSelect<db:/example_data/orders>} */
	var q = qbselect;
	application.output('onSearch')
	application.output(toolbarFilter.getSearchText());
	if (toolbarFilter.getSearchText()) {
		q.where.add(q.columns.orderid.gt(10500));
//		fs.loadRecords(q);
	}
	if (searchText || autoApplyFilters) {
		fs.loadRecords(q);
	}
	application.output(databaseManager.getSQL(fs));
	application.output(databaseManager.getSQLParameters(fs));
}

/**
 * @param {QBSelect} qbSelect the query to enhance
 * @param {String} dataprovider the column/dataprovider of this filter
 * @param {String} operator the operator used
 * @param {Array} values the filter's values
 * @param {scopes.svyPopupFilter.AbstractPopupFilter} filter the filter object
 * 
 * @properties={typeid:24,uuid:"CC778146-259C-4C4A-ADA6-F8974096A4C5"}
 */
function filterApplyQueryCondition(qbSelect, dataprovider, operator, values, filter) {
	if (dataprovider === 'orders_to_order_details.discount') {
		var filterValues = [];
		for (var v = 0; v < values.length; v++) {
			if (values[v] > 1) {
				filterValues[v] = values[v] / 100;
			} else {
				filterValues[v] = values[v];				
			}
		}
		filter.setValues(filterValues);
	}
	return true;
}

/**
 *
 *
 * @properties={typeid:24,uuid:"32AE993A-167C-4E14-A40A-10CFBC965D2B"}
 */
function filterAdded() {
	application.output('filter added')
}

/**
 *
 *
 * @properties={typeid:24,uuid:"C5A23774-42D5-4748-84B7-3E55A3D0FF9D"}
 */
function filterRemoved() {
	application.output('filter removed')
}


/**
 * @param {Array} values
 * @param {String} operator
 * @param {scopes.svyPopupFilter.AbstractPopupFilter} filter
 *
 * @properties={typeid:24,uuid:"2F12B57C-E90A-4DCD-AAD5-A09BA2F500BD"}
 */
function filterApplied(values, operator, filter) {
	application.output('filter applied')
	application.output(values.join('; '));
	application.output(operator);
	application.output(databaseManager.getSQL(foundset))
}


/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"542C354A-019D-42BB-A7DC-6FA93C168E1D"}
 */
function onActionSearch(event) {
	search();
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5C2E5EBC-F85A-4681-816B-13900BC8043C"}
 */
function onDataChangeSearch(oldValue, newValue, event) {
	search();
	return true
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"44F64442-4B61-4599-B3F6-F68407B04CE2"}
 */
function onActionFilter(event) {
	toolbarFilter.showPopupFilterPicker(event.getSource())
}

/**
 * Called when the mouse is clicked on a list entry.
 *
 * @param {object} entry
 * @param {Number} index
 * @param {string} dataTarget
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8AB6C6C0-B9C4-412F-8A2D-B4282166D61A"}
 */
function onClick(entry, index, dataTarget, event) {
	toolbarFilter.onClick(entry,index,dataTarget,event);
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"9DF586CB-7A02-4F07-9D7E-F98AD7A6A41B"}
 * @AllowToRunInFind
 */
function search() {
	toolbarFilter.search(searchText);
}
