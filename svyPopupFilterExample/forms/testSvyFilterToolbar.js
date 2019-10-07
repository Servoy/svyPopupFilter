/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ADB453C4-D190-4BE0-93AE-D6C34FF82E4E"}
 */
var searchText = null;

/**
 * @type {scopes.svyToolbaFilter.ListComponentFilterRender}
 *
 * @properties={typeid:35,uuid:"30AE6150-1BE1-41D9-A9C2-99E5E9DB97BA",variableType:-4}
 */
var toolbarFilter;


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
	toolbarFilter = new scopes.svyToolbarFilter.ListComponentFilterRender(elements.filterToolbar, elements.table);
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
	toolbarFilter.showPopupFilterPicker(elements[event.getElementName()])
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
	toolbarFilter.setSearchText(searchText);
	toolbarFilter.search();
}
