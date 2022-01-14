/**
 * @type {Array}
 * @properties={typeid:35,uuid:"CB751314-B059-46D1-9AF4-35B2EA6BB4DA",variableType:-4}
 */
var labels = ['labelToday', 'labelTomorrow', 'labelYesterday', 'labelThisYear', 'labelThisWeek', 'labelThisMonth', 'labelNextYear', 'labelNextWeek', 'labelNextMonth', 'labelLastYear', 'labelLastWeek', 'labelLastMonth'];
/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5F50F324-FFA8-4B4B-9C78-F010DE4CC94F"}
 */
function onDataChange(oldValue, newValue, event) {
	selectedDate = 'custom';
	updateUI();
	return true;
}

/**
 * @properties={typeid:24,uuid:"1AE71264-9439-48B2-947D-44A2C6F1DE27"}
 * @override
 */
function updateUI() {
	clearLabels();
	var DATE = scopes.svyPopupFilter.SELECTED_DATES;
	switch (selectedDate) {
	case DATE.TODAY:
		elements[labels[0]].removeStyleClass('text-tertiary');
		elements[labels[0]].addStyleClass('bg-primary');
		break;
	case DATE.TOMORROW:
		elements[labels[1]].removeStyleClass('text-tertiary');
		elements[labels[1]].addStyleClass('bg-primary');
		break;
	case DATE.YESTERDAY:
		elements[labels[2]].removeStyleClass('text-tertiary');
		elements[labels[2]].addStyleClass('bg-primary');
		break;
	case DATE.THIS_YEAR:
		elements[labels[3]].removeStyleClass('text-tertiary');
		elements[labels[3]].addStyleClass('bg-primary');
		break;
	case DATE.THIS_WEEK:
		elements[labels[4]].removeStyleClass('text-tertiary');
		elements[labels[4]].addStyleClass('bg-primary');
		break;
	case DATE.THIS_MONTH:
		elements[labels[5]].removeStyleClass('text-tertiary');
		elements[labels[5]].addStyleClass('bg-primary');
		break;
	case DATE.NEXT_YEAR:
		elements[labels[6]].removeStyleClass('text-tertiary');
		elements[labels[6]].addStyleClass('bg-primary');
		break;
	case DATE.NEXT_WEEK:
		elements[labels[7]].removeStyleClass('text-tertiary');
		elements[labels[7]].addStyleClass('bg-primary');
		break;
	case DATE.NEXT_MONTH:
		elements[labels[8]].removeStyleClass('text-tertiary');
		elements[labels[8]].addStyleClass('bg-primary');
		break;
	case DATE.LAST_YEAR:
		elements[labels[9]].removeStyleClass('text-tertiary');
		elements[labels[9]].addStyleClass('bg-primary');
		break;
	case DATE.LAST_WEEK:
		elements[labels[10]].removeStyleClass('text-tertiary');
		elements[labels[10]].addStyleClass('bg-primary');
		break;
	case DATE.LAST_MONTH:
		elements[labels[11]].removeStyleClass('text-tertiary');
		elements[labels[11]].addStyleClass('bg-primary');
		break;
	default:
		break;
	}
	
	var OPERATOR = scopes.svyPopupFilter.OPERATOR;
	switch (operator) {
	case OPERATOR.EQUALS:
	case OPERATOR.GREATER_THEN:
	case OPERATOR.GREATER_EQUAL:
		elements.calendarDateFrom.enabled = true;
		elements.calendarDateTo.enabled = false;
		break;
	case OPERATOR.SMALLER_THEN:
	case OPERATOR.SMALLER_EQUAL:
		elements.calendarDateFrom.enabled = false;
		elements.calendarDateTo.enabled = true;
		break;
	case OPERATOR.BETWEEN:
		elements.calendarDateFrom.enabled = true;
		elements.calendarDateTo.enabled = true;
		break;
	default:
		break;
	}
}

/**
 * @protected 
 * @return {Array}
 * @properties={typeid:24,uuid:"A9F72B69-F4CD-4C0A-9272-BC30DE13C23F"}
 * @override
 */
function getSelectedFilterValues() {
	
	var dateFromValue = dateFrom;
	var dateToValue = dateTo;
	if (filter.getUseLocalDateTime() == false) {
		dateFromValue = dateFrom ? scopes.svyDateUtils.getLocalDateTime(dateFrom) : null;
		dateToValue = dateTo ? scopes.svyDateUtils.getLocalDateTime(dateTo) : null;
	}

	var DATE = scopes.svyPopupFilter.SELECTED_DATES;
	switch (selectedDate) {
	case DATE.TODAY:
	case DATE.TOMORROW:
	case DATE.YESTERDAY:
	case DATE.THIS_MONTH:
	case DATE.THIS_WEEK:
	case DATE.THIS_YEAR:
	case DATE.NEXT_MONTH:
	case DATE.NEXT_WEEK:
	case DATE.NEXT_YEAR:
	case DATE.LAST_MONTH:
	case DATE.LAST_WEEK:
	case DATE.LAST_YEAR:
		return [selectedDate];
	default:
		break;
	}
	
	var OPERATOR = scopes.svyPopupFilter.OPERATOR;
	switch (operator) {
	case OPERATOR.EQUALS:
	case OPERATOR.GREATER_THEN:
	case OPERATOR.GREATER_EQUAL:
		if (dateFrom){
			// return [dateFrom]
			return [scopes.svyDateUtils.toStartOfDay(dateFromValue)];
		}
		else {
			return [];
		}	
	case OPERATOR.SMALLER_THEN:
	case OPERATOR.SMALLER_EQUAL:
		if (dateTo){
			//return [dateTo];
			return [scopes.svyDateUtils.toEndOfDay(dateToValue)];
		}
		else {
			return [];
		}	
	case OPERATOR.BETWEEN:
		if (dateFrom && dateTo) {
			// return [dateFrom, dateTo]
			return [scopes.svyDateUtils.toStartOfDay(dateFromValue), scopes.svyDateUtils.toEndOfDay(dateToValue)];
		} else {
			// TODO should handle scenario where not selected !?
			return [];
		}
	
	default:
		return [];
	}
}

/**
 * @protected 
 * @param {Array<Date>} selectedValues
 *
 * @properties={typeid:24,uuid:"86525312-EC3B-407E-8D63-64B8C73D41E8"}
 * @override
 */
function setSelectedFilterValues(selectedValues) {
	_super.setSelectedFilterValues(selectedValues);
	if (selectedValues[0] instanceof String){
		selectedDate = selectedValues[0];
	}
	if (filter.getUseLocalDateTime() == false) {
		dateFrom = dateFrom ? scopes.svyDateUtils.getServerDateTime(dateFrom) : null;
		dateTo = dateTo ? scopes.svyDateUtils.getServerDateTime(dateTo) : null;
	}
}

/**
 * @protected 
 * @override 
 * @return {Number}
 * @properties={typeid:24,uuid:"49D922DD-72BD-42A4-81B3-32CC58E46551"}
 */
function defaultWidth() {
	return 580;
}
/**
 * @param {JSEvent} event
 * @override
 *
 * @properties={typeid:24,uuid:"ECFE906A-F8FD-4469-AE71-AE4C6BF530C2"}
 */
function onLoad(event) {
	_super.onLoad(event);
	
	elements.faClose.imageStyleClass = scopes.svyPopupFilter.STYLING.CLOSE_ICON;
	
	scopes.svyPopupFilter.applyLocaleStrings(controller.getName(), 'svyDatePopupFilter');
	
	var valueListContent = databaseManager.createEmptyDataSet(0, 2);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.EQUALS, scopes.svyPopupFilter.OPERATOR.EQUALS]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.SMALLER_EQUAL, scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.GREATER_EQUAL, scopes.svyPopupFilter.OPERATOR.GREATER_EQUAL]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.BETWEEN, scopes.svyPopupFilter.OPERATOR.BETWEEN]);
	application.setValueListItems('svyDateSelectionTypes', valueListContent);
}

/**
 * @protected 
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"D8AA44D8-8EBF-4A24-A902-6FB6013C5398"}
 * @override
 */
function onShow(firstShow,event) {
	if (filter.getText()) {
		elements.labelTitle.text = filter.getText();
	}
	
	_super.onShow(firstShow,event);
}

/**
 * @public  
 * @param {String} defaultOperator
 *
 * @properties={typeid:24,uuid:"28CA78F8-87E0-4F78-AC37-9B75D480E180"}
 */
 function setOperator(defaultOperator) {
	_super.setOperator(defaultOperator);
	updateUI();
}
 
/**
 * @protected 
 * @properties={typeid:24,uuid:"21A5D195-3FE0-4351-829B-572829C0E6CB"}
 */
function clearLabels(){
	labels.forEach(function(itm){
		elements[itm].removeStyleClass('bg-primary');
		elements[itm].addStyleClass('text-tertiary');
	});
}
/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"59139663-F4F2-4D7D-A51D-DCA5A1E422C8"}
 */
function onDataChangeDate1(oldValue, newValue, event) {
	selectedDate = 'custom';
	updateUI();
	return true;
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BA432016-861E-4B93-B436-C315E42A5B13"}
 */
function onDataChangeDate2(oldValue, newValue, event) {
	selectedDate = 'custom';
	updateUI();
	return true;
}
