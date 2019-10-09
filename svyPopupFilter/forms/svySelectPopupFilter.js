/**
 * @private 
 * Creates a form popup for this form and returns it
 * 
 * @param {function(Array<JSRecord>,Array<String|Date|Number>,scopes.svyLookup.Lookup)} callback The function that is called when selection happens
 * @param {String} [initialValue] Initial value in search. Optional. Default is empty.
 * 
 * @return {plugins.window.FormPopup}
 *
 * @properties={typeid:24,uuid:"D3295993-D47C-4A16-AA61-4A05ACB209E4"}
 */
function createPopUp(callback, initialValue) {
	selectHandler = callback;
	var popup = plugins.window.createFormPopup(this); 
	popup.width(defaultWidth())
	return popup;
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"9AA4F775-56DD-44D3-B42F-105D1E7B775D"}
 */
function defaultWidth() {
	return 300;
}