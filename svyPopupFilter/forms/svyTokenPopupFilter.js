/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F75353CC-9485-4B79-82A5-82A230716775"}
 */
var searchText = null;

/**
 * @protected 
 * @param event
 *
 * @properties={typeid:24,uuid:"77598B3B-21D1-4B82-ACFD-84560EE97FA8"}
 * @override
 */
function onLoad(event) {
	var renderFunction = "(" + scopes.svySystem.printMethodCode(renderFilterEntry).join("") + ")";

	elements.listTags.entryRendererFunc = renderFunction;
	
	_super.onLoad(event);
}

/**
 * @param entry.dataprovider name
 * @param entry.text timeEntry
 *
 * @protected
 * @properties={typeid:24,uuid:"41DCC810-7BC6-4D8F-BD4B-251DA79704E2"}
 */
function renderFilterEntry(entry) {
	var template = '';
	template += '<div class="row hr">' + 
	'<div class="col-md-12 padding-15">' + 
		'<span class="fa fa-trash text-danger clickable" data-target="close"></span>' + 
		'<span class="margin-left-10 font-weight-bold">' + 
				entry.text + 
		'</span>' +
	'</div>' + 
	'</div>';

	return template;
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"BE24F6EF-5DD7-4EB6-9AC9-305215A865DA"}
 */
function onActionSearchText(event) {
	addTag(searchText);
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
 * @properties={typeid:24,uuid:"8663257D-6939-43F4-A748-873F81D0D52B"}
 */
function onDataChange(oldValue, newValue, event) {
	addTag(searchText);
	return true
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
 * @properties={typeid:24,uuid:"A67A8863-8ACB-48BF-BDC1-0F65B9F0C566"}
 */
function onClick(entry, index, dataTarget, event) {
	if (dataTarget == "close") {
		removeTag(entry.text, index);
	}
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"69A13409-C425-4D4D-ADF9-29148E922AF0"}
 */
function onActionRemoveAll(event, dataTarget) {
	clear();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"9FEBB97F-A251-4EA3-8C33-D9A5FBFD9E53"}
 */
function clear() {
	values = [];
	elements.listTags.clear();
}

/**
 * @protected 
 * @param text
 *
 * @properties={typeid:24,uuid:"B8552CF6-0A2A-49D2-BCFF-C4B3EFCE6EF7"}
 */
function addTag(text) {
	if (!text && text != "0") return;
	if (values.indexOf(text) == -1) {
		values.push(text);
		var tag = elements.listTags.newEntry();
		tag.text = text;
		
		searchText = null;
	} else {
		// do nothing
	}
}

/**
 * @protected 
 * @param {String} text
 * @param {Number} index
 *
 * @properties={typeid:24,uuid:"1E39D48A-7276-498F-B958-274E7CDCBDC5"}
 */
function removeTag(text, index) {
	if (!text && text != "0") return;
	var indexOfText = values.indexOf(text)
	if (indexOfText > -1) {
		values.splice(indexOfText,1);
		elements.listTags.removeEntry(index);
	} else {
		// do nothing
	}
}
