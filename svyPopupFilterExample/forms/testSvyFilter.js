/**
 * @type {Date}
 * @private
 *
 * @properties={typeid:35,uuid:"3642203A-7516-44A2-98E3-C6830F6CC70C",variableType:93}
 */
var filterDateFrom;

/**
 * @type {Date}
 * @private
 *
 * @properties={typeid:35,uuid:"FF161D04-9BCA-4BBA-93FC-56D2A768CA43",variableType:93}
 */
var filterDateTo;

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"5A39BE07-1246-44A9-B377-51F242B97809"}
 */
var selectedLookupValues = '';

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"E84C844C-0BEF-41E0-8533-EB81FF134AB6"}
 */
var selectedLooupValue$valuelist = '';

/**
 * @type {String}
 * @private
 *
 *
 * @properties={typeid:35,uuid:"EBAE9D20-CD5B-4F9B-9B12-85CFD5052CA5"}
 */
var selectedLooupValues$valuelist = '';

/**
 * @public
 * @return {String}
 *
 * @properties={typeid:24,uuid:"C9E92196-7001-4DCB-AE13-2FBB6AC9F95C"}
 */
function getDescription() {
	return 'All-purpose look-up UX pattern for servoy applications';
}

/**
 * @public
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"B6DE03C6-0B63-43A3-BE2A-66194631763E"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/svyLookup/releases/download/v1.0.0/svyLookupExample.servoy';
}

/**
 * @public
 * @return {String}
 *
 * @properties={typeid:24,uuid:"B78F7BF6-7F8C-4884-8D18-7BFF61E03066"}
 */
function getIconStyleClass() {
	return 'fa-search';
}

/**
 *
 * @return {String} Additioanl info (wiki markdown supported)
 *
 * @properties={typeid:24,uuid:"CCA5B179-C665-4C54-88FE-FCEBDEAFD2E3"}
 */
function getMoreInfo() {
	return plugins.http.getPageData('https://github.com/Servoy/svyLookup/blob/master/README.md')
}

/**
 * @public
 * @return {String}
 *
 * @properties={typeid:24,uuid:"248BCAE5-EBA7-494F-A6AE-745215A35FDE"}
 */
function getName() {
	return 'Lookup Search';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"D08E2AE6-DAE4-4FD9-B477-2D8B66523EC7"}
 */
function getParent() {
	return forms.dataSamples;
}

/**
 * @public
 * @return {Array<String>} code lines
 *
 * @properties={typeid:24,uuid:"96981D8B-FA62-48B4-82FA-1A38F41322CB"}
 */
function getSampleCode() {
	return printMethodCode(onShowLookup).concat(printMethodCode(onSelectLookup));
}

/**
 *
 * @return {String} Website URL
 *
 * @properties={typeid:24,uuid:"0A3CFA5D-9BE7-479F-A143-8AEFEB857F3E"}
 */
function getWebSiteURL() {
	return 'https://github.com/Servoy/svyLookup/wiki';
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} expand
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B5498678-E7A2-4789-8BEC-F54FB81109A1"}
 * @AllowToRunInFind
 */
function onShowDateFilter(event, expand) {
	
	var filter = scopes.svyPopupFilter.createDateFilter();
	filter.showPopUp(onDateFilter, elements.calendar_1);
	return;
	
	// create lookup object
	var lookupObj = scopes.svyLookup.createLookup(datasources.db.example_data.products.getDataSource());

	lookupObj.setLookupDataprovider("productname");

	// add fields

	// related data is supported
	lookupObj.addField('products_to_categories.categoryname').setTitleText('Category');
	lookupObj.addField('productname').setTitleText('Product');
	lookupObj.addField('products_to_suppliers.companyname').setTitleText('Supplier');

	// Valuelists and non-searchable fields supported
	lookupObj.addField('discontinued').setTitleText('Available').setSearchable(false).setvalueListName('product_availability');

	// formatted, non-searchable field example
	lookupObj.addField('unitprice').setSearchable(false).setTitleText('Price').setFormat('#,###.00').setWidth('50');

	// show pop-up
	var component = elements[event.getElementName()];
	// var initialValue = application.getValueListDisplayValue(elements.selectedProductID.getValueListName(),selectedProductID);

	if (expand) {
		var values = lookupObj.showModalWindow(null, event.getX(), event.getY(), 400, 400, selectedLookupValue);
		selectedLookupValue = (values && values.length) ? values[0] : null;
	} else {
		lookupObj.showPopUp(onSelectLookup, component, null, null, selectedLookupValue);
	}
}

/**
 * Callback for pop-up, passes the selected record
 *
 * @private
 * @param {Array<String|Date|Number>} values
 * @param {String} operator
 * @param {scopes.svyLookup.Lookup} lookup
 *  @properties={typeid:24,uuid:"466459E0-1F79-407A-B87F-E4C98AE176F4"}
 */
function onDateFilter(values, operator, lookup) {
	if (values && values.length) {
		filterDateFrom = values[0];
		filterDateTo = values[1]
	}
}

/**
 * Clear the selection
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B3C89D3D-EA24-48AF-9B2B-5978ECCCB4D1"}
 */
function clearDateFilter(event) {
	filterDateFrom = null;
	filterDateTo = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} expand
 *
 * @private
 *
 * @properties={typeid:24,uuid:"886C415E-F6A3-457C-82B1-5DFC6821BCAA"}
 */
function onShowLookupMultiSelection(event, expand) {
	// create lookup object
	var lookupObj = scopes.svyLookup.createLookup(datasources.db.example_data.products.getDataSource());

	lookupObj.setLookupDataProvider("productname");

	// add fields

	// related data is supported
	lookupObj.addField('products_to_categories.categoryname').setTitleText('Category');
	lookupObj.addField('productname').setTitleText('Product');
	lookupObj.addField('products_to_suppliers.companyname').setTitleText('Supplier');

	// Valuelists and non-searchable fields supported
	lookupObj.addField('discontinued').setTitleText('Available').setSearchable(false).setvalueListName('product_availability');

	// formatted, non-searchable field example
	lookupObj.addField('unitprice').setSearchable(false).setTitleText('Price').setFormat('#,###.00').setWidth('50')

	// change lookup provider
	lookupObj.setLookupFormProvider(forms.svyLookupTableMulti);

	// show pop-up
	var component = elements[event.getElementName()];
	var initialValue = selectedLookupValues ? selectedLookupValues.split(",")[selectedLookupValues.split(",").length - 1] : null;

	var filterObj = new scopes.svyPopupFilter.SvySelectFilter("productname",lookupObj);
	if (expand) {
		var values = filterObj.showModalWindow(null, event.getX(), event.getY(), 400, 400, initialValue);
		selectedLookupValues = values.join(",");
	} else {
		filterObj.showPopUp(onSelectMulti, component, null, null, initialValue);
	}
}

/**
 * @param {String} operator
 * @param {Array<String|Date|Number>} values
 * @param {scopes.svyLookup.Lookup} filter
 * @private
 *
 * @properties={typeid:24,uuid:"D4BCB076-0647-4EFE-B41C-DB084CAE0E71"}
 */
function onSelectMulti(values, operator, filter) {
	if (values) {
		selectedLookupValues = values.join(",");
	} else {
		selectedLookupValues = null;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FE0700CD-9D13-4C96-BC70-9BEDC6088E63"}
 */
function clearLookupValues(event) {
	selectedLookupValues = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} expand
 * @private
 *
 * @properties={typeid:24,uuid:"2FA92F65-EAAF-4D4C-B5DD-23AA0C993C18"}
 */
function onShowValuelistLookup(event, expand) {
	// create lookup object
	var lookupObj = scopes.svyLookup.createValuelistLookup("productsTable", "Product");

	// show pop-up
	var component = elements[event.getElementName()];

	if (expand) {
		var values = lookupObj.showModalWindow(null, event.getX(), event.getY(), 400, 400, null);
		selectedLooupValue$valuelist = values[0];
	} else {
		lookupObj.showPopUp(onSelectValuelist, component, null, null, null);
	}
}

/**
 * @private
 * @param {Array<JSRecord<db:/example_data/products>>} records
 * @param {Array<String|Date|Number>} values
 * @param {scopes.svyLookup.Lookup} lookup
 *  @properties={typeid:24,uuid:"6538B771-2FB6-4B1E-90E1-35B3DF9F49F9"}
 */
function onSelectValuelist(records, values, lookup) {
	selectedLooupValue$valuelist = values[0];
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3C13BAB6-D821-4DAD-A867-9E7CEAA15326"}
 */
function clearLookupValuelist(event) {
	selectedLooupValue$valuelist = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} expand
 * @private
 *
 * @properties={typeid:24,uuid:"E489EE59-163C-40E7-A5C3-13FCD5E45539"}
 */
function onShowValuelistLookupMulti(event, expand) {
	// create lookup object
	var lookupObj = scopes.svyLookup.createValuelistLookup("productsTable");
	lookupObj.setLookupFormProvider(forms.svyLookupTableMulti);

	// show pop-up
	var component = elements[event.getElementName()];
	var initialValue = selectedLooupValues$valuelist ? selectedLooupValues$valuelist.split(",")[selectedLooupValues$valuelist.split(",").length - 1] : null;

	if (expand) {
		var values = lookupObj.showModalWindow(null, event.getX(), event.getY(), 400, 400, initialValue);
		selectedLooupValues$valuelist = values ? values.join(",") : null;
	} else {
		lookupObj.showPopUp(onSelectValuelistMulti, component, null, null, initialValue);
	}
}

/**
 * @private
 * @param {Array<JSRecord<db:/example_data/products>>} records
 * @param {Array<String|Date|Number>} values
 * @param {scopes.svyLookup.Lookup} lookup
 *  @properties={typeid:24,uuid:"002EEB81-5C65-4802-A669-1AF507F95985"}
 */
function onSelectValuelistMulti(records, values, lookup) {
	selectedLooupValues$valuelist = values ? values.join(",") : null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"95CBDE5E-6B35-4C21-A027-E6774A9E9BE3"}
 */
function clearLookupValuelistMulti(event) {
	selectedLooupValues$valuelist = null;
}
