/**
 * @protected
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"BB66FE55-1740-40BF-A686-F8341E469315"}
 * @override
 */
function onShow(firstShow,event) {
	_super.onShow(firstShow,event);
	updateUI();
}

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
	updateUI();
	return true;
}

/**
 * @properties={typeid:24,uuid:"1AE71264-9439-48B2-947D-44A2C6F1DE27"}
 * @override
 */
function updateUI() {
	var OPERATOR = scopes.svyPopupFilter.OPERATOR;
	switch (operator) {
	case OPERATOR.NOT_NULL:
	case OPERATOR.IS_NULL:
		elements.calendarDateFrom.enabled = false;
		elements.calendarDateTo.enabled = false;
		break;
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

	var OPERATOR = scopes.svyPopupFilter.OPERATOR;
	switch (operator) {
	case OPERATOR.NOT_NULL:
	case OPERATOR.IS_NULL:
		return [null];
	case OPERATOR.EQUALS:
	case OPERATOR.GREATER_THEN:
	case OPERATOR.GREATER_EQUAL:
		if (dateFrom){
			return [scopes.svyDateUtils.toStartOfDay(dateFrom)];
		}
		else {
			return [];
		}	
	case OPERATOR.SMALLER_THEN:
	case OPERATOR.SMALLER_EQUAL:
		if (dateTo){
			return [scopes.svyDateUtils.toEndOfDay(dateTo)];
		}
		else {
			return [];
		}	
	case OPERATOR.BETWEEN:
		if (dateFrom && dateTo) {
			return [scopes.svyDateUtils.toStartOfDay(dateFrom), scopes.svyDateUtils.toEndOfDay(dateTo)];
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