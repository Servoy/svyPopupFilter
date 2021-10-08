
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
 * @properties={typeid:24,uuid:"78479823-67F0-4374-8D68-2CEDFA06129F"}
 */
function onDataChange(oldValue, newValue, event) {
	updateUI();
	return true
}
/**
 * @properties={typeid:24,uuid:"9799F08B-333A-4A02-A222-C61CEA9F7530"}
 * @override
 */
function updateUI() {
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
 * @properties={typeid:24,uuid:"D44358B3-C13D-4662-90AA-C3DC45E4AD46"}
 * @override
 */
function getSelectedFilterValues() {

	var OPERATOR = scopes.svyPopupFilter.OPERATOR;
	switch (operator) {
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
 * TODO generated, please specify type and doc for the params
 * @param defaultOperator
 *
 * @properties={typeid:24,uuid:"D0EF77B5-3E9B-4733-95DB-BCFA481FCBD4"}
 * @override
 */
function setOperator(defaultOperator) {
	_super.setOperator(defaultOperator);
	updateUI();
}

/**
 * @param {JSEvent} event
 * @override
 *
 * @properties={typeid:24,uuid:"C6F06F26-FDD8-45BF-BD1E-D33FDA887AC2"}
 */
function onLoad(event) {
	_super.onLoad(event);
	
	//elements.faClose.imageStyleClass = scopes.svyPopupFilter.STYLING.CLOSE_ICON;
	
	scopes.svyPopupFilter.applyLocaleStrings(controller.getName(), 'svyDatePopupFilter');
	
	var valueListContent = databaseManager.createEmptyDataSet(0, 2);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.EQUALS, scopes.svyPopupFilter.OPERATOR.EQUALS]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.SMALLER_EQUAL, scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.GREATER_EQUAL, scopes.svyPopupFilter.OPERATOR.GREATER_EQUAL]);
	valueListContent.addRow([scopes.svyPopupFilter.LOCALE.svyDatePopupFilter.operator.BETWEEN, scopes.svyPopupFilter.OPERATOR.BETWEEN]);
	application.setValueListItems('svyDateSelectionTypes', valueListContent);
}

///**
// * @protected 
// * @param firstShow
// * @param event
// *
// * @properties={typeid:24,uuid:"BEBA41F2-A22A-41D1-86DC-D18C9CD3D8EA"}
// * @override
// */
//function onShow(firstShow,event) {
//	if (filter.getText()) {
//		//elements.labelTitle.text = filter.getText();
//	}
//	
//	_super.onShow(firstShow,event);
//}


