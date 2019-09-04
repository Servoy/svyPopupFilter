/**
 * @protected 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1C63E0A0-C807-4052-84E5-43CB41A7C9CA",variableType:-4}
 */
var values = [];

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E9DD4762-805D-44C5-869C-5B5B71C8AF65"}
 * @override
 */
function onLoad(event) {
	_super.onLoad(event);
	
	// default operator to between
	operator = scopes.svyPopupFilter.OPERATOR.IS_IN;
}

/**
 * @protected
 * @properties={typeid:24,uuid:"0FE3EADA-F2D5-404E-9F27-D8350601BFEB"}
 * @override
 */
function getSelectedFilterValues() {
	
	// TODO verify that inline-calendar defaults to use localtimezone always
	// return between start and end of the day
	return values;
}