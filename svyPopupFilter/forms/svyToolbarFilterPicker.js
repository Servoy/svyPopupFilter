// TODO manage i18n
// menuItem.text = scopes.svyPopupFilter.LOCALE.filterPopupMenu.addFilter;

/**
 * cache locally the latest popup filter open, to be used in the callback method
 * @type {scopes.svyToolbarFilter.AbstractToolbarFilterUX}
 * @private
 * @properties={typeid:35,uuid:"A1A198BF-2315-43C0-B43D-24C3DFB9B815",variableType:-4}
 */
var toolbarFilterUX = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"E0599858-87E3-4C1E-BDD1-56B891175589"}
 */
var searchText = null;

/**
 * Flag if keylistener has been added
 *
 * @protected
 * @type {Boolean}
 * @properties={typeid:35,uuid:"EA8F28B2-72B3-4159-9A8A-F8BC7F1D6490",variableType:-4}
 */
var keyListenerReady = false;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"0218B949-47FA-4AF1-B2E0-8E5CA2F1DCA7"}
 */
function onLoad(event) {
	scopes.svyPopupFilter.applyLocaleStrings(controller.getName(), 'svyToolbarFilterPicker');
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A4CCF6FE-EA22-4381-8F33-A89BFE639FE0"}
 */
function onShow(firstShow, event) {
	keyListenerReady = false;

	refreshFilterLists(searchText);
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"C1F40EE2-70C5-4569-B5BC-2CD50D120761"}
 */
function onHide(event) {
	if (keyListenerReady && 'keyListener' in plugins) {
		plugins.keyListener.removeKeyListener("data-svyfilter-search");
	}
	return true
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"0FA743B7-FEFA-4904-AAEF-9C5505C07ABE"}
 */
function onActionClear(event, dataTarget) {
	toolbarFilterUX.clearFilterUI();

	var fs = elements.activeFilters.foundset.foundset;
	fs.loadAllRecords();
	var fsUpdater = databaseManager.getFoundSetUpdater(fs);
	fsUpdater.setColumn('is_active', 0);
	fsUpdater.performUpdate();

	refreshFilterLists(searchText);
}

/**
 * Handles the action event of the search field
 * Runs search, refocuses on search field
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"50BF1243-50DB-430C-A744-E2931D9086B6"}
 */
function onActionSearch(event) {
	refreshFilterLists(searchText);
	if (elements.searchbox.visible) {
		elements.searchbox.requestFocus();
	}
}

/**
 * When attached to a search field, will add a keylistener to any element having an attribute keylistener='data-svylookup-search'
 *
 * @protected
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F30C7540-3D75-48CF-B180-FCF456CC7BCE"}
 * @AllowToRunInFind
 */
function onFocusGainedSearch(event) {
	if (!keyListenerReady && 'keyListener' in plugins) {
		plugins.keyListener.addKeyListener("data-svyfilter-search", onKey, true);
		keyListenerReady = true;
	}
}

/**
 * Handles the key listener callback event
 *
 * @protected
 * @param {String} value
 * @param {JSEvent} event
 * @param {Number} keyCode
 * @param {Number} altKey
 * @param {Number} ctrlKey
 * @param {Number} shiftKey
 * @param {Number} capsLock
 *
 * @properties={typeid:24,uuid:"62C20437-4252-4607-BFD2-5ED5325898D9"}
 */
function onKey(value, event, keyCode, altKey, ctrlKey, shiftKey, capsLock) {
	// run search
	refreshFilterLists(value)
}

/**
 * @param {String} text
 *
 * @protected
 * @properties={typeid:24,uuid:"6F244C06-7C47-4BB0-AB3C-62601F2DCE48"}
 */
function refreshFilterLists(text) {

	var qa = datasources.mem.svy_toolbar_filters.createSelect();
	var qi = datasources.mem.svy_toolbar_filters.createSelect();

	// filter by text
	if (text) {
		var sp = scopes.svySearch.createSimpleSearch(datasources.mem.svy_toolbar_filters.getDataSource());
		sp.addSearchProvider('display_name');
		sp.setSearchText(text);
		qa = sp.getQuery();
		qi = sp.getQuery();
	}

	qa.where.add(qa.getColumn('is_active').eq(0));
	qa.sort.add(qa.columns.sort_index.asc);
	elements.filters.foundset.foundset.loadRecords(qa)

	qi.where.add(qi.getColumn('is_active').eq(1));
	qi.sort.add(qi.columns.sort_index.asc);
	elements.activeFilters.foundset.foundset.loadRecords(qi)
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1D3C2BBC-F30D-4A4F-BE2C-209467C7A126"}
 */
function onClickActiveFilterCheck(event, dataTarget) {
	/** @type {JSRecord<mem:svy_toolbar_filters>} */
	var record = elements.activeFilters.foundset.foundset.getSelectedRecord();
	record.is_active = false;
	databaseManager.saveData(record)

	var filter = toolbarFilterUX.getFilter(record.dataprovider);
	toolbarFilterUX.removeFilterUI(filter);

	refreshFilterLists(searchText);
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"DD5E9D46-DFD2-4569-A9E2-C4A1A43D29F9"}
 */
function onClickActiveFilter(event, dataTarget) {
	/** @type {JSRecord<mem:svy_toolbar_filters>} */
	var record = elements.activeFilters.foundset.foundset.getSelectedRecord();

	// show the popup filter
	showPopupFilter(record.dataprovider)
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"C17A263F-D077-4432-B7CC-0E4C9B64435D"}
 */
function onClickInactiveFilter(event, dataTarget) {

	/** @type {JSRecord<mem:svy_toolbar_filters>} */
	var record = elements.filters.foundset.foundset.getSelectedRecord();
	record.is_active = 1;
	databaseManager.saveData(record);

	var filter = toolbarFilterUX.getFilter(record.dataprovider);
	toolbarFilterUX.addFilterUI(filter);

	refreshFilterLists(searchText);

	// show the popup filter
	showPopupFilter(record.dataprovider)
}

/**
 * @protected
 * @param {String} dataproviderID
 * @param {JSEvent} [event]
 *
 * @properties={typeid:24,uuid:"C690F1FC-C55B-4DDE-B677-9BFFF8CB431D"}
 */
function showPopupFilter(dataproviderID, event) {
	var location = plugins.ngclientutils.getAbsoluteLocation(elements.labelTitle);
	
	plugins.window.cancelFormPopup();
	
	// show the popup filter
	toolbarFilterUX.showPopupFilter(dataproviderID, location.x + 15, location.y - 15);
}
