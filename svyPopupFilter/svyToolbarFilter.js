/**
 * Enum of all renderer form types available
 * @properties={typeid:35,uuid:"E4F70004-F7BE-4806-AC3C-F727EC06AF8F",variableType:-4}
 */
var FILTER_TYPES = {
	DATE: 'datePopupFilterTemplate',
	NUMBER: 'numberPopupFilterTemplate',
	TOKEN: 'tokenPopupFilterTemplate',
	SELECT: 'selectFilterTemplate'
}

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"472FF5A6-F073-4910-9CB1-565F46327D67"}
 */
var TOOLBAR_FILTER_NAME = "svy-toolbar-filter";

/**
 * cache locally the latest popup filter open, to be used in the callback method
 * @type {AbstractToolbarFilterUX}
 * @private 
 * @properties={typeid:35,uuid:"4E5DE070-8F3C-45A1-8804-15236FE03AAB",variableType:-4}
 */
var latestToolbarFilter = null;

/**
 * This is a Singleton
 * @type {PopupRendererForms}
 * @private  
 * @properties={typeid:35,uuid:"85FB53C2-C19C-419B-9F03-642998E3B1F4",variableType:-4}
 */
var popupRendererForms;

/**
 * @constructor 
 * @protected  
 * @properties={typeid:24,uuid:"EA19BC69-1CA7-4C3A-B6F3-BB972688F4BD"}
 */
function PopupRendererForms() {
	/** 
	 * @protected
	 * @type {RuntimeForm<AbstractPopupFilter>} 
	 * */
	this.datePopupFilterTemplate = forms.svyDatePopupFilter;
	/** 
	 * @protected
	 * @type {RuntimeForm<AbstractPopupFilter>} 
	 * */
	this.numberPopupFilterTemplate = forms.svyNumberPopupFilter;
	/** 
	 * @protected
	 * @type {RuntimeForm<AbstractPopupFilter>} 
	 * */
	this.tokenPopupFilterTemplate = forms.svyTokenPopupFilter;
	/** 
	 * @protected
	 * @type {RuntimeForm<AbstractLookup>} 
	 * */
	this.selectFilterTemplate = forms.svySelectPopupFilter;
}

/**
 * @return {PopupRendererForms}
 * @public 
 * @deprecated 
 * @properties={typeid:24,uuid:"BBACCB75-672F-4067-BE33-A14A7150496C"}
 */
function getPopupUIFormRendered() {
	return popupRendererForms;
}

/**
 * @return {PopupRendererForms}
 * @private  
 * @properties={typeid:24,uuid:"76C600A8-C6E6-4CDA-8CE1-7959A936BB36"}
 */
function getPopupRendererForms() {
	return popupRendererForms;
}

/**
 * @public 
 * Sets the renderer form for the given formType
 * @param {String} formType any of the FILTER_TYPES
 * @param {RuntimeForm<AbstractPopupFilter>|RuntimeForm<AbstractLookup>} form the form to set
 *
 * @properties={typeid:24,uuid:"D64D95B4-75A2-43D7-8D2E-1DFDEBBD64E1"}
 */
function setPopupRendererForm(formType, form) {
	popupRendererForms.setRendererForm(formType, form);
}

/**
 * @constructor
 * @private
 * @properties={typeid:24,uuid:"37935D63-8170-4771-AB8E-B448458A08E5"}
 * @AllowToRunInFind
 */
function initPopupRendererForms() {
	PopupRendererForms.prototype = Object.create(PopupRendererForms.prototype);
	PopupRendererForms.prototype.constructor = PopupRendererForms;
	
	/** 
	 * Returns the renderer form for the given formType
	 * @param {String} formType any of the FILTER_TYPES
	 * @return {RuntimeForm<AbstractPopupFilter>|RuntimeForm<AbstractLookup>}
	 * @public
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.getRendererForm = function(formType) {
		var result = this[formType];
		return result;
	}
	
	/** 
	 * Sets the renderer form for the given formType
	 * @param {String} formType any of the FILTER_TYPES
	 * @param {RuntimeForm<AbstractPopupFilter>|RuntimeForm<AbstractLookup>} form the form to set
	 * @return {PopupRendererForms}
	 * @public
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.setRendererForm = function(formType, form) {
		this[formType] = form;
		return this;
	}	
	
	/** 
	 * @return {RuntimeForm<AbstractPopupFilter>}
	 * @public
	 * @deprecated use getRendererForm(FILTER_TYPES.DATE) instead
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.getDateUIFormRendered = function() {
		/** @type {RuntimeForm<AbstractPopupFilter>} */
		var result = this.getRendererForm(FILTER_TYPES.DATE);
		return result;
	}
	
	/** 
	 * @param {RuntimeForm<AbstractPopupFilter>} form
	 * @public
	 * @deprecated use setRendererForm(FILTER_TYPES.DATE, form) instead
	 * @return {PopupRendererForms}
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.setDateUIFormRendered = function(form) {
		return this.setRendererForm(FILTER_TYPES.DATE, form);
	}
	
	/** 
	 * @return {RuntimeForm<AbstractPopupFilter>}
	 * @public
	 * @deprecated use getRendererForm(FILTER_TYPES.NUMBER) instead
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.getNumberUIFormRendered = function() {
		/** @type {RuntimeForm<AbstractPopupFilter>} */
		var result = this.getRendererForm(FILTER_TYPES.NUMBER);
		return result;
	}
	
	/** 
	 * 
	 * @param {RuntimeForm<AbstractPopupFilter>} form
	 * @public
	 * @deprecated use setRendererForm(FILTER_TYPES.DATE, form) instead
	 * @return {PopupRendererForms}
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.setNumberUIFormRendered = function(form) {
		return this.setRendererForm(FILTER_TYPES.NUMBER, form);
	}
	
	/** 
	 * @return {RuntimeForm<AbstractPopupFilter>}
	 * @public
	 * @deprecated use getRendererForm(FILTER_TYPES.TOKEN) instead
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.getTokenUIFormRendered = function() {
		/** @type {RuntimeForm<AbstractPopupFilter>} */
		var result = this.getRendererForm(FILTER_TYPES.TOKEN);
		return result;
	}
	
	/** 
	 * @param {RuntimeForm<AbstractPopupFilter>} form
	 * @public
	 * @deprecated use setRendererForm(FILTER_TYPES.TOKEN, form) instead
	 * @return {PopupRendererForms}
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.setTokenUIFormRendered = function(form) {
		return this.setRendererForm(FILTER_TYPES.TOKEN, form);
	}
	
	/** 
	 * @return {RuntimeForm<AbstractLookup>}
	 * @public
	 * @deprecated use getRendererForm(FILTER_TYPES.SELECT) instead
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.getSelectUIFormRendered = function() {
		/** @type {RuntimeForm<AbstractLookup>} */
		var result = this.getRendererForm(FILTER_TYPES.SELECT);
		return result;
	}
	
	/** 
	 * @param {RuntimeForm<AbstractLookup>} form
	 * @public
	 * @deprecated use setRendererForm(FILTER_TYPES.TOKEN, form) instead
	 * @return {PopupRendererForms}
	 * @this {PopupRendererForms} 
	 * */
	PopupRendererForms.prototype.setSelectUIFormRendered = function(form) {
		return this.setRendererForm(FILTER_TYPES.SELECT, form);
	}
}

/**
 * @param {RuntimeComponent} uiComponent
 * @param {RuntimeWebComponent<aggrid-groupingtable>} tableComponent
 * 
 * @private
 * @constructor
 * @this {AbstractToolbarFilterUX}
 * @properties={typeid:24,uuid:"D21B3F79-9C77-4006-8A82-95AA24DC56AA"}
 * @AllowToRunInFind
 */
function AbstractToolbarFilterUX(uiComponent, tableComponent) {
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.elementName = uiComponent.getName();

	/**
	 * @protected
	 * @type {String}
	 */
	this.formName = uiComponent.getFormName();
	
	/**
	 * @protected
	 * @type {SvyGridFilters}
	 */
	this.svyGridFilters = new SvyGridFilters(tableComponent);

	/**
	 * @protected 
	 * @type {String}
	 */
	this.onFilterCreate = null;
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.onFilterApplyEvent = null;
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.onFilterAddedEvent = null;	
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.onFilterRemovedEvent = null;
	
	// TODO allow the form to implement such funcitonalities

	// update grid filter

	// get filter tag/entry/index..

	// on click (show IT)

	// create filter
}



/**
 * Filter Toolbar implementation using the listcomponent from the custom-rendered-components package.
 * This implementation requires a "List Component" element and an "Data-Grid" element.
 * You should create a toolbar filter instance at the onLoad of your form and assign it to a form variable.
 * The "List Component" must have it's 'foundset' property set to '-none-'.
 * Make sure to re-direct the onClick event of the "List Component" to the toolbar.onClick(entry, index, dataTarget, event);
 * 
 * 
 * @constructor
 * @param {RuntimeWebComponent<customrenderedcomponents-listcomponent>} listComponent
 * @param {RuntimeWebComponent<aggrid-groupingtable>} table
 * 
 * @deprecated use ListComponentFilterRenderer instead
 *
 * @extends {AbstractToolbarFilterUX}
 * @this {ListComponentFilterRender}
 * @public
 * @example <pre>
 * //keep track of toolbarFilter object in a form variable
 * var toolbarFilter;
 * 
 * //init the toolbarFilter at the onLoad.
 * function onLoad(event) {
 *  toolbarFilter = new scopes.svyToolbarFilter.ListComponentFilterRender(elements.filterToolbar, elements.table)
 * }
 * 
 * //propagate the onClick event of the "List Component" to the toolbar filter.
 * function onClick(entry, index, dataTarget, event) {
 *  toolbarFilter.onClick(entry,index,dataTarget,event);
 * }
 * 
 * //optionally set a searchText for a cross-field search to further filter the result set
 * function search() {
 *  toolbarFilter.setSearchText(searchText);
 *  toolbarFilter.search();
 * }
 * </pre>
 * 
 * @properties={typeid:24,uuid:"3DA99E05-2496-479B-BAEC-761249725BA3"}
 * @SuppressWarnings(wrongparameters)
 */
function ListComponentFilterRender(listComponent, table) {
	return new ListComponentFilterRenderer(listComponent, table);
}

/**
 * Filter Toolbar implementation using the custom list from the custom-rendered-components package.
 * This implementation requires a "List Component" element and an "Data-Grid" element.
 * You should create a toolbar filter instance at the onLoad of your form and assign it to a form variable.
 * The "List Component" must have it's 'foundset' property set to '-none-'.
 * Make sure to re-direct the onClick event of the "List Component" to the toolbar.onClick(entry, index, dataTarget, event);
 * 
 * @constructor
 * 
 * @param {RuntimeWebComponent<customrenderedcomponents-customlist>|RuntimeWebComponent<customrenderedcomponents-customlist_abs>} listComponent
 * @param {RuntimeWebComponent<aggrid-groupingtable>|RuntimeWebComponent<aggrid-groupingtable_abs>} table
 *
 * @extends {AbstractToolbarFilterUX}
 * @this {ListComponentFilterRenderer}
 * @public
 * @example <pre>
 * //keep track of toolbarFilter object in a form variable
 * var toolbarFilter;
 * 
 * //init the toolbarFilter at the onLoad.
 * function onLoad(event) {
 *  toolbarFilter = new scopes.svyToolbarFilter.ListComponentFilterRenderer(elements.filterToolbar, elements.table)
 * }
 * 
 * //propagate the onClick event of the "List Component" to the toolbar filter.
 * function onClick(entry, index, dataTarget, event) {
 *  toolbarFilter.onClick(entry,index,dataTarget,event);
 * }
 * 
 * //optionally set a searchText for a cross-field search to further filter the result set
 * function search() {
 *  toolbarFilter.setSearchText(searchText);
 *  toolbarFilter.search();
 * }
 * </pre>
 * 
 * @properties={typeid:24,uuid:"16037133-4377-4EB0-887F-D35F697B9ABA"}
 */
function ListComponentFilterRenderer(listComponent, table) {
	if (!listComponent) {
		throw 'listComponent element is required';
	}
	
	if (!table) {
		throw 'table element is required';
	}
	
	if (listComponent.getElementType() != "customrenderedcomponents-listcomponent" && listComponent.getElementType() != "customrenderedcomponents-customlist") {
		throw "The given listComponent element should be an element of type customrenderedcomponents-customlist; check the 'Custom List' from the Custom Rendered Components package";
	}
	
	if (table.getElementType() != "aggrid-groupingtable") {
		throw "The given table element should be an element of type aggrid-groupingtable; check the 'Data Grid' from the NG Grids package";
	}
	
	AbstractToolbarFilterUX.call(this, listComponent, table);
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.elementName = listComponent.getName();

	/**
	 * @protected
	 * @type {String}
	 */
	this.formName = listComponent.getFormName();
	
	/**
	 * @protected
	 * @type {SvyGridFilters}
	 */
	this.svyGridFilters = new SvyGridFilters(table);
	
	//TODO: remove when old list component has finally disappeared
	if (listComponent.getElementType() == "customrenderedcomponents-listcomponent") {
		listComponent['entryRendererFunc'] = this.getRenderTemplate();
	} else {
		listComponent.entryRendererFunction = this.getRenderTemplate();
	}
	
	listComponent.addStyleClass("svy-toolbar-filter")
	listComponent.clear();
}

/**
 * @protected  
 * @param {RuntimeWebComponent<aggrid-groupingtable>|RuntimeWebComponent<aggrid-groupingtable_abs>} table
 * @constructor
 * @properties={typeid:24,uuid:"A6E91332-3686-48ED-9D89-5B07B0925132"}
 * @AllowToRunInFind
 */
function SvyGridFilters(table) {
	
	/** @type {SvyGridFilters} */
	var thisInstance = this;

	/**
	 * @protected
	 * @type {Object}
	 */
	this.toolbarFilters = new Object();

	/**
	 * @protected
	 * @type {String}
	 */
	this.tableName = table.getName();

	/**
	 * @protected
	 * @type {String}
	 */
	this.formName = table.getFormName();
	
	/**
	 * @protected
	 * @type {String}
	 */
	this.searchText = null;
		
	/**
	 * @protected
	 * @type {scopes.svySearch.SimpleSearch}
	 */
	this.simpleSearch = thisInstance.getDefaultSearch();
	
	/**
	 * @protected
	 * @type {function}
	 */
	this.onSearchCommand = null;
}

/**
 * @private 
 * @param {Array<scopes.svyPopupFilter.AbstractPopupFilter>} filters
 * @param {JSFoundSet} foundset
 * 
 * @return {QBSelect}
 *
 * @properties={typeid:24,uuid:"5B04853F-1A4F-4752-83E9-B332D697F935"}
 */
function getFilterQuery(filters, foundset) {
	var isFilterSet = false;

	var query = databaseManager.createSelect(foundset.getDataSource());

	for (var i = 0; i < filters.length; i++) {

		var filter = filters[i];
		var dp = filter.getDataProvider();
		if (!dp) {
			throw "dataprovider unknown";
		}

		var op = filter.getOperator();
		var values = filter.getValues();
		var useNot = false;
		var useIgnoreCase = true; // default to case -insensitive

		// Clean up values from empty values
		var qValues = values.filter(function(v) {
			if (v === undefined || v === null || v === '') {
				return false;
			} else {
				return true;
			}
		});
		
		//Dont use lower on date
		if(qValues.length && (qValues[0] instanceof Date || qValues[0] instanceof Number)) {
			useIgnoreCase = false;
		}
		
		if (useIgnoreCase != false) {
			// Clean up values from empty values
			qValues = qValues.map(function(v) {
				if (v instanceof String) {
					return v.toLowerCase();
				} else {
					return v;
				}
			});
		}

		// skip filter if no values
		if (!qValues || !qValues.length) {
			continue;
		}

		var value;
		var OPERATOR = scopes.svyPopupFilter.OPERATOR;

		switch (op) {
		case OPERATOR.EQUALS:

			if (qValues[0] && qValues[0] instanceof Date) {
				op = "between";
				/** @type {String} */
				var qDateValue = qValues[0];
				value = [scopes.svyDateUtils.toStartOfDay(new Date(qDateValue)), scopes.svyDateUtils.toEndOfDay(new Date(qDateValue))];
			} else {
				op = "eq";
				value = qValues[0];
			}
			break;
		case OPERATOR.GREATER_EQUAL:
			op = "ge";
			value = qValues[0];
			break;
		case OPERATOR.GREATER_THEN:
			op = "gt";
			value = qValues[0];
			break;
		case OPERATOR.SMALLER_EQUAL:
			op = "le";
			value = qValues[0];
			break;
		case OPERATOR.SMALLER_THEN:
			op = "lt";
			value = qValues[0];
			break;
		case OPERATOR.BETWEEN:
			// TODO should this be handled by the popup form instead !?
			if (qValues.length == 2) {
				op = "between";
				value = qValues;
			} else if (qValues.length == 1) {
				if (values[0] === undefined || values[0] === null || values[0] === '') {
					op = "lt";
				} else {
					op = "gt";
				}
				value = qValues[0];
			} else {
				throw "this should not happen";
			}

			break;
		case OPERATOR.IS_IN:
			op = "isin";
			value = qValues;
			break;
		default:
			break;
		}

		/** @type {QBSelect} */
		var whereClause = null;
		var aDP = dp.split('.');
		for (var j = 0; j < aDP.length - 1; j++) {
			whereClause = whereClause == null ? query.joins[aDP[j]] : whereClause.joins[aDP[j]];
		}

		whereClause = whereClause == null ? query.columns[aDP[aDP.length - 1]] : whereClause.columns[aDP[aDP.length - 1]];

		// do not lower case Dates.
		if (value instanceof Date) {
			useIgnoreCase = false;
		}
		
		if (useIgnoreCase != false) {
			whereClause = whereClause["lower"];
			if (value instanceof String) {
				/** @type {String} */
				var valueString = value;
				value = valueString.toLowerCase();
			} else if (value instanceof Array) {
				// Clean up values from empty values
				value = value.map(function(v) {
					if (v instanceof String) {
						return v.toLowerCase();
					} else {
						return v;
					}
				});
			}

		}
		if (useNot) {
			whereClause = whereClause["not"];
		}
		whereClause = op == "between" ? whereClause[op](value[0], value[1]) : whereClause[op](value);
		if (!isFilterSet) isFilterSet = true;
		/** @type {QBCondition} */
		var where = whereClause;
		query.where.add(where);

	}

	return query;
}

/**
 * @public
 * @param {Array<scopes.svyPopupFilter.AbstractPopupFilter>} filters
 * @param {JSFoundSet} foundset
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"DE3A02D8-BD4A-42B7-9870-6E5BC70D9D2A"}
 */
function applyFilters(filters, foundset) {

	// remove previous filter
	foundset.removeFoundSetFilterParam(TOOLBAR_FILTER_NAME);

	var success = true;
	// get the filter query
	if (filters.length) {
		var query = getFilterQuery(filters,foundset);
	
		// apply the query as filter
		success = foundset.addFoundSetFilterParam(query, TOOLBAR_FILTER_NAME);
		if (success) {
			success = foundset.loadRecords();
		}
	} else {
		// refresh foundset since filters have been removed
		foundset.loadRecords();
	}
	return success;
}

/**
 * @public
 * @param {JSFoundSet} foundset
 *
 * @properties={typeid:24,uuid:"9078E2C7-E065-4E71-B4AB-D0D6F9F896E8"}
 */
function clearFilters(foundset) {
	if (foundset.removeFoundSetFilterParam(TOOLBAR_FILTER_NAME)) {
		return foundset.loadRecords();
	}
	return false;
}

/**
 * @constructor
 * @private
 * @properties={typeid:24,uuid:"924B1AFF-94F1-4808-ADDC-BB1F10516E5C"}
 * @AllowToRunInFind
 */
function initSvyGridFilters() {
	SvyGridFilters.prototype = Object.create(SvyGridFilters.prototype);
	SvyGridFilters.prototype.constructor = SvyGridFilters;

	/**
	 * @public
	 * @return {RuntimeWebComponent<aggrid-groupingtable>}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getTable = function() {
		var form = forms[this.formName];
		/** @type {RuntimeWebComponent<aggrid-groupingtable>} */
		var table = form.elements[this.tableName];
		return table;
	}

	/**
	 * @public
	 * @return {SvyGridFilters}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.setSearchText = function(searchText) {
		this.searchText = searchText;
		return this;
	}
	
	/**
	 * @public
	 * @param {function(QBSelect, JSFoundSet)} callback
	 * @return {SvyGridFilters}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.setOnSearchCommand = function(callback) {
		this.onSearchCommand = callback;
		return this;
	}
	
	/**
	 * @public
	 * @return {scopes.svySearch.SimpleSearch}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getSimpleSearch = function() {
		return this.simpleSearch;
	}
	
	
	/** 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * @public
	 * @return {scopes.svySearch.SearchProvider}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getSearchProvider = function(column) {
		return this.simpleSearch.getSearchProvider(column.dataprovider);
	}
	
	/**
	 * @public
	 * @return {JSFoundSet}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getFoundSet = function() {
//		var form = forms[this.formName];
//		return form.foundset
		return this.getTable().myFoundset.foundset;
	}
	
	/**
	 * @public
	 * @return {Array<{text:String, 
	 * dataprovider:String, 
	 * id:String=, 
	 * columnIndex:Number
	 * }>}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getFilters = function() {

		var filters = [];

		var table = this.getTable();
		var columns = table.columns;
		for (var index = 0; index < columns.length; index++) {
			var column = columns[index];
			if (column.filterType && column.filterType != 'NONE') {
				var filter = new Object();
				filter.text = column.headerTitle;
				filter.dataprovider = column.dataprovider;
				filter.id = column.id;
				filter.columnIndex = index;
				filters.push(filter);
			}
		}
		return filters;
	}
	
	/**
	 * @public
	 * @return {Array<scopes.svyPopupFilter.AbstractPopupFilter>}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getActiveFilters = function() {
		/** @type {Array<scopes.svyPopupFilter.AbstractPopupFilter>} */
		var activeFilters = [];
		for (var dp in this.toolbarFilters) {
			/** @type {scopes.svyPopupFilter.AbstractPopupFilter} */
			var filter = this.toolbarFilters[dp];
			if (filter.getValues() && filter.getValues().length) {
				activeFilters.push(this.toolbarFilters[dp]);
			}
		}
		return activeFilters;
	}

	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * @public
	 * @return {Boolean}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.hasActiveFilter = function(column) {
		return this.toolbarFilters[column.dataprovider] ? true : false;
	}

	/**
	 * @public 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * @param {scopes.svyPopupFilter.AbstractPopupFilter} filter
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.addGridFilter = function(column, filter) {
		if (column.dataprovider) {
			this.toolbarFilters[column.dataprovider] = filter;
		}
	}
	
	/**
	 * @public 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * @return {scopes.svyPopupFilter.AbstractPopupFilter}
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.getGridFilter = function(column) {
		/** @type {scopes.svyPopupFilter.AbstractPopupFilter} */
		var filter = this.toolbarFilters[column.dataprovider];
		return filter;
	}
	
	/**
	 * @public 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.removeGridFilter = function(column) {

		// update the UI render
		// this.uirender.removeGridFilter(column);

		// remove the filter from cache
		delete this.toolbarFilters[column.dataprovider];	
		
		this.search()
	}

	
	/**
	 * @public 
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.clearGridFilters = function() {

		// remove the filter from cache
		this.toolbarFilters = new Object();
		
		this.search();
	}
	
	
	/**
	 * @public 
	 * @return {Array<{
				id: String,
				dataprovider: String,
				operator: String,
				params: Object,
				text: String,
				values: Array}>}
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.getGridFiltersState = function() {
		
		var jsonState = [];
		for (var dp in this.toolbarFilters) {
			var filter = this.toolbarFilters[dp];
			
			jsonState.push(filter.getState())
		}
		
		return jsonState;
	}

	/**
	 * @deprecated this function doesnt't work and is not used
	 * @public 
	 * @param {Array<{
				id: String,
				dataprovider: String,
				operator: String,
				params: Object,
				text: String,
				values: Array}>} jsonState
	 *
	 * @properties={typeid:24,uuid:"7097146A-EDA1-4C7A-9A9F-58FAEC3D883B"}
	 * 
	 * @return {SvyGridFilters}
	 * @this {SvyGridFilters}
	 */
	SvyGridFilters.prototype.restoreGridFiltersState = function(jsonState) {
		
		// clear previous filters
		this.clearGridFilters();

		// restore new filters
		for (var i = 0; i < jsonState.length; i++) {
			var obj = jsonState[i];
			
			var column = this.getColumn(obj.dataprovider);
			if (column) {
				
				// FIXME check filter type
				var filter = new scopes.svyPopupFilter.SvyTokenFilter();
				filter.restoreState(obj);
			
				this.addGridFilter(column,filter);
			}
		}
		return this;
	}
	
	/**
	 * @public  
	 * @param {String} dataprovider
	 * @return {CustomType<aggrid-groupingtable.column>}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getColumn = function(dataprovider) {
		var columns = this.getTable().columns;
		for (var i = 0; i < columns.length; i++) {
			var column = columns[i];
			// TODO can i rely on dataprovider only !?
			if (dataprovider == column.dataprovider) {
				return column;
			}
		}
		return null;
	}
	
	/**
	 * @public
	 * @return {QBSelect}
	 * 
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getQuery = function() {
		var activeFilters = this.getActiveFilters();
		var foundset = this.getFoundSet();
		
		//apply foundset filters
		applyFilters(activeFilters, foundset);

		var query;
		//quick search?
		if (this.searchText) {
			var simpleSearch = this.simpleSearch;
			simpleSearch.setSearchText(this.searchText);
			query = simpleSearch.getQuery();
		} else {
			query = foundset.getQuery();
		}
		
		return query;
	}
	
	/**
	 * @public
	 * @return {scopes.svySearch.SimpleSearch}
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.getDefaultSearch = function() {

		var columns = this.getTable().columns;
		var tableFoundset = this.getTable().myFoundset.foundset;
		var tableDataSource;
		if (tableFoundset) {
			tableDataSource = tableFoundset.getDataSource()
		} else {
			var form = forms[this.formName];
			tableDataSource = form ? form.foundset.getDataSource() : null;
		}

		if (!tableDataSource) {
			return null;
		}

		// create a simple search
		var simpleSearch = scopes.svySearch.createSimpleSearch(tableDataSource);
		simpleSearch.setSearchText(this.searchText);
		simpleSearch.setDateFormat("dd-MM-yyyy");

		for (var i = 0; tableDataSource && columns && i < columns.length; i++) {
			var column = columns[i];

			// TODO should search only on visible columns ?
			if (column.dataprovider && column.visible) {

				// Check if column exists
				var relationName = scopes.svyDataUtils.getDataProviderRelationName(column.dataprovider)
				var dataSource = relationName ? scopes.svyDataUtils.getRelationForeignDataSource(relationName) : tableDataSource;

				var table = databaseManager.getTable(dataSource);
				var col = table.getColumn(scopes.svyDataUtils.getUnrelatedDataProviderID(column.dataprovider));
				if (col) {
					var vlItems = null;

					// check if valuelist substitions can be applied
					if (column.valuelist) {
						vlItems = application.getValueListItems(column.valuelist);
						if (!vlItems.getMaxRowIndex()) {
							application.output("skip search on column with valuelist " + column.valuelist);
							continue;
						}
					}

					// create the search provider
					// TODO shall i remove all white spaces !?
					var provider = simpleSearch.addSearchProvider(column.dataprovider);

					// set the provider alias
					var alias = column.headerTitle ? column.headerTitle : column.dataprovider;
					provider.setAlias(alias);

					// if is a date use explicit search
					if (col.getType() === JSColumn.DATETIME) {
						provider.setImpliedSearch(false);
					}

					// add valuelist substitutions
					for (var index = 1; vlItems && index <= vlItems.getMaxRowIndex(); index++) {
						var vlItem = vlItems.getRowAsArray(index);
						provider.addSubstitution(vlItem[0], vlItem[1])

					}
				}
			}
		}
		return simpleSearch;
	}
	
	/**
	 * @public 
	 *
	 * @this {SvyGridFilters}
	 *  */
	SvyGridFilters.prototype.search = function() {
		var foundset = this.getFoundSet();

		// quick search
		var searchQuery = this.getQuery();

		if (this.onSearchCommand) {
			//fire onSearchCommand
			this.onSearchCommand.call(this, searchQuery, foundset);
		} else if (this.searchText) {
			//apply search if relevant
			foundset.loadRecords(searchQuery);
		}
	}
}

/**
 * @constructor
 * @private
 * @properties={typeid:24,uuid:"E8CB92CC-FCCF-4A46-B180-9CF800899C2E"}
 * @AllowToRunInFind
 */
function initAbstractToolbarFilterUX() {
	AbstractToolbarFilterUX.prototype = Object.create(AbstractToolbarFilterUX.prototype);
	AbstractToolbarFilterUX.prototype.constructor = AbstractToolbarFilterUX;

	/**
	 * Returns the element used to display the filters
	 * @public
	 * @return {RuntimeComponent}
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.getElement = function() {
		var form = forms[this.formName];
		/** @type {RuntimeComponent} */
		var element = form.elements[this.elementName];
		return element;
	}
	
	/**
	 * Allows to provide a method that will be called when the filter for a specific column is created<br>
	 * That method then can create and return any filter that will then be used for this column
	 * 
	 * @public
	 * @param {function(CustomType<aggrid-groupingtable.column>): scopes.svyPopupFilter.AbstractPopupFilter} callback function that receives an aggrid-groupingtable Column as argument and must return a scopes.svyPopupFilter.AbstractPopupFilter
	 * @return {AbstractToolbarFilterUX}
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterCreate = function(callback) {
		this.onFilterCreate = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}	
	
	/**
	 * @public
	 * @param {function({values:Array, operator:String, filter:scopes.svyPopupFilter.AbstractPopupFilter})} callback
	 * 
	 * @return {AbstractToolbarFilterUX}
	 * 
	 * @deprecated use setOnFilterApplyCallback
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterApplyEvent = function(callback) {
		this.onFilterApplyEvent = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}
	
	/**
	 * Sets a callback method that is fired whenever the filter is applied<br>
	 * The callback method receives an array of values, the operator and the filter as arguments
	 * 
	 * @param {function(Array, String, scopes.svyPopupFilter.AbstractPopupFilter)} callback
	 * 
	 * @return {AbstractToolbarFilterUX}
	 *
	 * @public
	 * 
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterApplyCallback = function(callback) {
		this.onFilterApplyEvent = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}	
	
	/**
	 * Sets a callback method that is fired whenever a filter has been added
	 * 
	 * @param {function()} callback
	 * 
	 * @return {AbstractToolbarFilterUX}
	 * 
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterAddedCallback = function(callback) {
		this.onFilterAddedEvent = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}	
	
	/**
	 * @param {function()} callback
	 * 
	 * @return {AbstractToolbarFilterUX}
	 * 
	 * @deprecated use setOnFilterRemovedCallback
	 * 
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterRemovedEvent = function(callback) {
		this.onFilterRemovedEvent = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}	
	
	/**
	 * Sets a callback method that is fired whenever a filter is removed
	 * 
	 * @param {function()} callback
	 * 
	 * @return {AbstractToolbarFilterUX}
	 *
	 * @public
	 * 
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.setOnFilterRemovedCallback = function(callback) {
		this.onFilterRemovedEvent = scopes.svySystem.convertServoyMethodToQualifiedName(callback);
		return this;
	}
	
	/**
	 * Set the onSearchCommand function to override the search behavior.
	 * You can add custom conditions to the filter query object;
	 * 
	 * @public
	 * @param {function(QBSelect, JSFoundSet)} callback
	 * @return {AbstractToolbarFilterUX}
	 *
	 * @this {AbstractToolbarFilterUX}
	 * @example <pre>function onSearch(query, fs) {
	 *   // add custom conditions to the query
	 *   query.where.add(query.columns.orderdate.not.isNull);
	 *   
	 *   // apply the query to the foundset
	 *   fs.loadRecords(query);
	 * }
	 * </pre>
	 * 
	 *  */
	AbstractToolbarFilterUX.prototype.setOnSearchCommand = function(callback) {
		this.svyGridFilters.setOnSearchCommand(callback);
		return this;
	}
	
	/**
	 * Adds a filter for the given column
	 * 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @return {Boolean}
	 * 
	 * @public 
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.addGridFilter = function(column) {
		throw scopes.svyExceptions.AbstractMethodInvocationException("addGridFilter not implemented")
	}
	
	/**
	 * Removes the filter for the given column
	 * 
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @return {Boolean}
	 * 
	 * @public 
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.removeGridFilter = function(column) {
		throw scopes.svyExceptions.AbstractMethodInvocationException("removeGridFilter not implemented")
	}
	
	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @return {Boolean}
	 * 
	 * @protected
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.showGridFilter = function(column) {
		throw scopes.svyExceptions.AbstractMethodInvocationException("showGridFilter not implemented")
	}
	
	/**
	 * Clears all grid filters
	 * 
	 * @return {Boolean}
	 * 
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.clearGridFilters = function() {
		throw scopes.svyExceptions.AbstractMethodInvocationException("clearGridFilters not implemented")
	}
	
	/**
	 * Override this method in a subclass to adjust the UI to the updated values for the given dataprovider
	 * 
	 * @param {String} dataprovider
	 * @param {Array} values
	 * 
	 * @return {Boolean}
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.updateGridFilter = function(dataprovider, values) {
		throw scopes.svyExceptions.AbstractMethodInvocationException("updateGridFilter not implemented")
	}
	
	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @return {Boolean}
	 * 
	 * @protected
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.hasActiveFilter = function(column) {
		throw scopes.svyExceptions.AbstractMethodInvocationException("hasActiveFilter not implemented")
	}
	
	/**
	 * Returns true if the table has any column it can filter on
	 *
	 * @return {Boolean}
	 *
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.hasFilters = function() {
		return this.svyGridFilters.getFilters().length > 0 ? true : false;
	}
	
	/**
	 * Returns the filters' state of the toolbar
	 * 
	 * @return {Array<{
				id: String,
				dataprovider: String,
				operator: String,
				params: Object,
				text: String,
				values: Array}>} jsonState
				
	 * @public 
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getToolbarFiltersState = function() {
		return this.svyGridFilters.getGridFiltersState();
	}
	
	/**
	 * Restores the filters' state 
	 * 
	 * @param {Array<{
				id: String,
				dataprovider: String,
				operator: String,
				params: Object,
				text: String,
				values: Array}>} jsonState
	 *
	 * @public 
	 * 
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.restoreToolbarFiltersState = function(jsonState) {

		// clear previous filters
		this.clearGridFilters();

		// restore new filters
		for (var i = 0; i < jsonState.length; i++) {
			var obj = jsonState[i];
			var column = this.getColumn(obj.dataprovider);

			var values;
			if (!column) continue; // TODO throw a warning ?

			switch (column.filterType) {

			case 'NUMBER':
				values = obj.values.map(function(value) {
					return utils.stringToNumber(value);
				});

				break;
			case 'DATE':
				values = obj.values.map(function(value) {
					return new Date(value);
				});

				break;
			case 'TEXT':

			default:
				values = obj.values;
				break;
			}

			// set the filter again
			this.setFilterValue(column, values, obj.operator);
			var filter = this.getOrCreateToolbarFilter(column);
			filter.restoreState(obj);
		}
	}
	
	/**
	 * Applies all filters and returns the query for this toolbar
	 *
	 * @return {QBSelect}
	 *
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getQuery = function() {
		return this.svyGridFilters.getQuery();
	}

	/**
	 * Sets the search text for the simple search
	 * 
	 * @return {AbstractToolbarFilterUX}
	 * 
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.setSearchText = function(searchText) {
		this.svyGridFilters.setSearchText(searchText);
		return this;
	}
	
	/**
	 * Returns the SimpleSearch
	 *
	 * @return {scopes.svySearch.SimpleSearch}
	 *
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getSimpleSearch = function() {
		return this.svyGridFilters.getSimpleSearch();
	}
	
	/**
	 * Returns the SearchProvider for the given column
	 *
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 *
	 * @return {scopes.svySearch.SearchProvider}
	 *
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getSearchProvider = function(column) {
		return this.svyGridFilters.getSearchProvider(column);
	}
	
	/**
	 * Returns the table column for the given dataprovider
	 * 
	 * @param {String} dataprovider
	 * 
	 * @return {CustomType<aggrid-groupingtable.column>}
	 * 
	 * @protected  
	 *
	 * @this {AbstractToolbarFilterUX}
	 *  */
	AbstractToolbarFilterUX.prototype.getColumn = function (dataprovider) {
		return this.svyGridFilters.getColumn(dataprovider);
	}
	
	/**
	 * Applies all filters and executes the search
	 * 
	 * @public  
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.search = function() {
		return this.svyGridFilters.search();
	}
	
	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * @param {JSEvent} event
	 * 
	 * @this {AbstractToolbarFilterUX}
	 * 
	 * @protected 
	 *
	 * @properties={typeid:24,uuid:"06EB08B6-AA6C-4DC8-A0A7-B7CF3C140D77"}
	 */
	AbstractToolbarFilterUX.prototype.showPopupFilter = function (column, event) {
		var filter = this.getOrCreateToolbarFilter(column);

		// show the filter
		var popup = filter.createPopUp(this.onFilterApply);
		popup.x(event.getX());
		popup.y(event.getY());
		// popup.width(300);
		popup.show();
	}
	
	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @protected 
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getFilter = function(column) {
		/** @type {scopes.svyPopupFilter.AbstractPopupFilter}  */
		var filter = this.svyGridFilters.getGridFilter(column);
		return filter;
	}
	
	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @protected 
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.getOrCreateToolbarFilter = function(column) {
		/** @type {scopes.svyPopupFilter.AbstractPopupFilter}  */
		var filter = this.getFilter(column);
		
		if (!filter && this.onFilterCreate) {
			filter = scopes.svySystem.callMethod(this.onFilterCreate, [column]);
			if (filter) {
				// include this as param
				filter.addParam(this);
				// set filter's dataprovider
				filter.setDataProvider(column.dataprovider);
				// persist the filter in memory
				this.svyGridFilters.addGridFilter(column, filter);
			}
		}
		
		if (!filter) {
			var popupTemplates = getPopupRendererForms();
			
			if (column.valuelist) {
				// will be a lookup form
				// number picker
				// calendar picker
				var lookup = scopes.svyLookup.createValuelistLookup(column.valuelist);
				/** @type {RuntimeForm<AbstractLookup>} */
				var lookupForm = popupTemplates.getRendererForm(FILTER_TYPES.SELECT)
				lookup.setLookupFormProvider(lookupForm);
				lookup.setHeader("");
				filter = scopes.svyPopupFilter.createSelectFilter(column.dataprovider, lookup);
			} else {
				// will be a free text entry
				switch (column.filterType) {
				case 'TEXT':
					filter = scopes.svyPopupFilter.createTokenFilter();
					filter.setRendererForm(popupTemplates.getRendererForm(FILTER_TYPES.TOKEN));
					break;
				case 'NUMBER':
					// number picker
					// calendar picker
					filter = scopes.svyPopupFilter.createNumberFilter();
					filter.setRendererForm(popupTemplates.getRendererForm(FILTER_TYPES.NUMBER));
					break;
				case 'DATE':
					// calendar picker
					filter = scopes.svyPopupFilter.createDateFilter();
					filter.setRendererForm(popupTemplates.getRendererForm(FILTER_TYPES.DATE));
					break;
				default:
					break;
				}
			}

			if (filter) {
				// set filter's dataprovider
				filter.setDataProvider(column.dataprovider);
				filter.setText(column.headerTitle);
				
				// include this as param
				filter.addParam(this);

				// persist the filter in memory
				this.svyGridFilters.addGridFilter(column, filter);
			}
		}
		return filter;
	}
	
	/**
	 * Shows the filter picker popup
	 * 
	 * @param {RuntimeComponent} target
	 * 
	 * @public
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.showPopupFilterPicker = function(target) {

		var filterPopupMenu = plugins.window.createPopupMenu();
		var menuItem = filterPopupMenu.addMenuItem("title");
		menuItem.enabled = false;
		menuItem.text = "Add filter";

		var columnFilters = this.svyGridFilters.getFilters();
		for (var index = 0; index < columnFilters.length; index++) {
			var columnFilter = columnFilters[index];
			var check = filterPopupMenu.addCheckBox(columnFilter.dataprovider);
			check.selected = this.hasActiveFilter(this.getColumn(columnFilter.dataprovider));
			check.text = columnFilter.text;
			check.methodArguments = [columnFilter.columnIndex, columnFilter.id, columnFilter.dataprovider]
			check.setMethod(onFilterPopupMenuClicked);
		}

		filterPopupMenu.cssClass = "toolbar-filter-popup";

		// cache the latest menu so it can be used in callback
		latestToolbarFilter = this;
		
		filterPopupMenu.show(target);
	}

	/**
	 * Sets a filter value for the given column
	 * 
     * @param {CustomType<aggrid-groupingtable.column>} column
     * @param {Array} values
     * @param {String} operator
     * 
     * @public  
     *
     * @this {AbstractToolbarFilterUX}
     */
	AbstractToolbarFilterUX.prototype.setFilterValue = function(column, values, operator) {
		if (!this.hasActiveFilter(column)) {
			this.addGridFilter(column);
		}
		var filter = this.getOrCreateToolbarFilter(column);
		filter.setValues(values);
		filter.setOperator(operator);
		this.onFilterApply(values, operator, filter);
	}
    
	/**
	 * @param {Array} values
	 * @param {String} operator
	 * @param {scopes.svyPopupFilter.AbstractPopupFilter} filter
	 * 
	 * @protected 
	 *
	 * @this {AbstractToolbarFilterUX}
	 */
	AbstractToolbarFilterUX.prototype.onFilterApply = function (values, operator, filter) {

		/** @type {AbstractToolbarFilterUX} */
		var thisIntance = filter.getParams()[0];
		
		/** @type {SvyGridFilters} */
		var gridFilters = thisIntance['svyGridFilters'];
		
		//	TODO to be moved somewhere else ~?
		// persist the values & operator:
		filter.setOperator(operator);
		
		var currentValues = filter.getValues();
		if (scopes.svyJSUtils.areObjectsEqual(currentValues, values)) {
			return;
		}
		
		filter.setValues(values);
		
		var displayValues = values ? values : [];

		// resolve valuelist real values
		var column = gridFilters.getColumn(filter.getDataProvider());
		if (column.valuelist) {
			displayValues = [];
			for (var i = 0; i < values.length; i++) {
				displayValues[i] = application.getValueListDisplayValue(column.valuelist, values[i]);
			}
		}

		// format dates
		displayValues = displayValues.map(function(v) {
			if (v instanceof Date) {
				return utils.dateFormat(v, "dd-MM-yyyy");
			} else {
				return v;
			}
		});
		
		// update the UI
		thisIntance.updateGridFilter(filter.getDataProvider(), displayValues);
		
		// apply the search
		gridFilters.search();
		
		// if has active filters
		var element = thisIntance.getElement();
		if (gridFilters.getActiveFilters().length) {
			element.addStyleClass('has-active-filter');
		} else {
			element.removeStyleClass('has-active-filter');
		}
	
		if (thisIntance['onFilterApplyEvent']) {
			/** @type {String} */
			var onFilterApplyEvent = thisIntance['onFilterApplyEvent'];
			scopes.svySystem.callMethod(onFilterApplyEvent, [values, operator, filter])
		}
	}
}

/**
* @private 
* @param {Number} itemIndex
* @param {Number} parentIndex
* @param {Boolean} isSelected
* @param {String} parentText
* @param {String} menuText
* @param {Number} columnIndex the column index
* @param {String} [columnId] the id of the column
* @param {String} [columnDataprovider] dataprovider bound to the column
*
* @properties={typeid:24,uuid:"4288095A-3F08-48FD-AD10-C86B79972DA9"}
*/
function onFilterPopupMenuClicked(itemIndex, parentIndex, isSelected, parentText, menuText, columnIndex, columnId, columnDataprovider) {
	var toolbarFilterUX = latestToolbarFilter;
	latestToolbarFilter = null;
	if (toolbarFilterUX) {
		/** @type {SvyGridFilters} */
		var gridFilters = toolbarFilterUX['svyGridFilters'];
		var selectedColumn = gridFilters.getTable().getColumn(columnIndex);
		if (isSelected) {
			toolbarFilterUX.removeGridFilter(selectedColumn);
		} else {
			toolbarFilterUX.addGridFilter(selectedColumn);
		}
	}
}

/**
 * @constructor
 * @extends {AbstractToolbarFilterUX}
 * @private
 * @properties={typeid:24,uuid:"C7D04E91-D3C9-42D0-8837-7F1AFE0FF731"}
 */
function initListComponentFilterRenderer() {
	ListComponentFilterRenderer.prototype = Object.create(AbstractToolbarFilterUX.prototype);
	ListComponentFilterRenderer.prototype.constructor = ListComponentFilterRenderer;

	/**
	 * Returns the Custom List element this renderer is using to display the filters
	 * 
	 * @return {RuntimeWebComponent<customrenderedcomponents-customlist>}
	 * 
	 * @public
	 * 
	 * @override
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.getElement = function() {
		var form = forms[this.formName];
		/** @type {RuntimeWebComponent<customrenderedcomponents-customlist>} */
		var listComponent = form.elements[this.elementName];
		return listComponent;
	}

	/**
	 * @return {String}
	 * 
	 * @protected
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.getRenderTemplate = function() {
		return "(function renderFilterEntry(entry) {  \n\
			var template = '';\n\
			var strDivider = ' : ';\n\
			template += '<div class=\"btn-group push-right margin-left-10 toolbar-filter-tag\">' + \n\
			'<button class=\"btn btn-default btn-sm btn-round\" data-target=\"open\" svy-tooltip=\"entry.text + strDivider + entry.value\">' + \n\
				'<span class=\"toolbar-filter-tag-text\">' + entry.text + '</span>' + \n\
				'<span class=\"toolbar-filter-tag-value\"> ' + entry.value.split(',').join(', ') + ' </span>' + \n\
				'<span class=\"toolbar-filter-tag-icon fas fa-angle-down\">' + '</span>' + \n\
			'</button>' + \n\
			'<button class=\"btn btn-default btn-sm btn-round\" data-target=\"close\">' + \n\
			'<span class=\"fas fa-times text-danger h6\">' + '</span>' + '</button>' + '</div>'; \n\
			return template; \n\
		})";
	}
	
	
	/**
	 * Called when the mouse is clicked on a list entry.
	 *
	 * @param {object} entry
	 * @return {String}
	 * @protected
	 * @this {ListComponentFilterRenderer}
	 *  */
	ListComponentFilterRenderer.prototype.getDataProvider = function(entry) {
		return entry['dataprovider'];
	}
	
	/**
	 * Called when the mouse is clicked on a list entry.
	 *
	 * @param {object} entry
	 * @param {Number} index
	 * @param {string} dataTarget
	 * @param {JSEvent} event
	 *  
	 * @public
	 * @this {ListComponentFilterRenderer}
	 *  */
	ListComponentFilterRenderer.prototype.onClick = function(entry, index, dataTarget, event) {
		var column = this.svyGridFilters.getColumn(this.getDataProvider(entry));

		if (!dataTarget || dataTarget == "open") {
			//open the filter
			if (column) {
				this.showPopupFilter(column, event);
			}
		} else if (dataTarget == "close") {
			// remove the filter
			if (column) {
				this.removeGridFilter(column);
			} else {
				this.getElement().removeEntry(index)
			}
		}
	}

	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @protected
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.addGridFilter = function(column) {
		var newFilter = this.getElement().newEntry();
		newFilter.text = column.headerTitle;
		newFilter.dataprovider = column.dataprovider;
		newFilter.value = "";
		
		// if has active filters
		var element = this.getElement();
		element.addStyleClass('has-filter');
		
		if (this.onFilterAddedEvent) {
			scopes.svySystem.callMethod(this.onFilterAddedEvent)
		}
	}

	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @protected
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.removeGridFilter = function(column) {
		var index = this.getFilterTagIndex(column);
		if (index > -1) {
			this.getElement().removeEntry(index);
		}
		this.svyGridFilters.removeGridFilter(column);
			
		// on filter removed event
		if (this.onFilterRemovedEvent) {
			scopes.svySystem.callMethod(this.onFilterRemovedEvent);
		}
			
	}

	/**
	 * @param {String} dataprovider
	 * @param {Array} displayValues
	 *
	 * @protected
	 * 
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.updateGridFilter = function(dataprovider, displayValues) {
		var index;
		var element = this.getElement();
		var count = element.getEntriesCount();
		var entries = [];
		for (var i = 0; i < count; i++) {
			var filterTag = element.getEntry(i);
			// TODO can i rely on dataprovider only !?
			if (filterTag && filterTag.dataprovider == dataprovider) {
				index = i;
			}
			entries.push(filterTag);
		}

		if (index || index == 0) {

			// TODO can i make an API in listcomponent to update an entry value !?
			element.clear();
			for (i = 0; i < entries.length; i++) {
				var entryCopy = entries[i];
				var entry = element.newEntry();

				entry.text = entryCopy.text;
				if (entryCopy.dataprovider) entry.dataprovider = entryCopy.dataprovider;
				entry.value = entryCopy.value;
				if (i === index) {
					entry.value = displayValues.join(",");
				}

			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Clears all grid filters
	 * 
	 * @public
	 * 
	 * @override 
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.clearGridFilters = function() {
		this.getElement().clear();
		this.svyGridFilters.clearGridFilters();
		
		// if has no filters
		var element = this.getElement();
		element.removeStyleClass('has-filter');
		
		// on filter removed event
		if (this.onFilterRemovedEvent) {
			scopes.svySystem.callMethod(this.onFilterRemovedEvent);
		}
	}

	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 * 
	 * @return {Boolean}
	 * 
	 * @protected
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.hasActiveFilter = function(column) {
		return this.getFilterTagIndex(column) > -1 ? true : false;
	}

	/**
	 * @param {CustomType<aggrid-groupingtable.column>} column
	 *
	 * @return {Number}
	 * 
	 * @protected 
	 *
	 * @this {ListComponentFilterRenderer}
	 */
	ListComponentFilterRenderer.prototype.getFilterTagIndex = function(column) {
		var count = this.getElement().getEntriesCount();
		for (var i = 0; i < count; i++) {
			var filterTag = this.getElement().getEntry(i);
			// TODO can i rely on dataprovider only !?
			if (filterTag && filterTag.dataprovider == column.dataprovider) {
				return i;
			}
		}
		return -1;
	}

}

/**
 * @private
 * @SuppressWarnings(unused)
 * @properties={typeid:35,uuid:"FE4768E2-C48C-4BBE-B6B1-30CCC1194975",variableType:-4}
 */
var init = (function() {
	initPopupRendererForms();
	popupRendererForms = new PopupRendererForms();
	initSvyGridFilters();
	initAbstractToolbarFilterUX();
	initListComponentFilterRenderer();
}());
