/**
 * @type {Date}
 * @protected 
 *
 * @properties={typeid:35,uuid:"EE42E940-E5C5-4427-A12E-10DBD3F5B5B3",variableType:93}
 */
var dateFrom;

/**
 * @type {Date}
 * @protected 
 *
 * @properties={typeid:35,uuid:"27156EB3-336E-4F82-BFCB-4FE772DBC5D6",variableType:93}
 */
var dateTo;

/**
 * @type {String}
 * @protected 
 * @properties={typeid:35,uuid:"B124F840-9635-4072-9BEF-B9EA093CAF78"}
 */
var selectedDate = null;

/**
 * @protected 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0B8B503C-329D-4924-A924-0137E86BB291"}
 * @override
 */
function onLoad(event) {
	_super.onLoad(event);
	
	// default operator to between
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	updateUI();
}

/**
 * @protected 
 * @param {Array} selectedValues
 *
 * @properties={typeid:24,uuid:"61DC1807-93A7-404C-8C3C-5418355F4597"}
 * @override
 */
function setSelectedFilterValues(selectedValues) {
	var DATE = scopes.svyPopupFilter.SELECTED_DATES;
	var isEnum = false;
	switch (selectedValues[0]) {
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
		isEnum = true;
	default:
		break;
	}

	if (isEnum) {
		var today = new Date();
		var tomorrow, yesterday, date;
		switch (selectedValues[0]) {
		case DATE.TODAY:
			dateTo = null;
			dateFrom = scopes.svyDateUtils.toStartOfDay(today);
			break;
		case DATE.TOMORROW:
			tomorrow = scopes.svyDateUtils.addDays(today, 1);
			dateTo = null;
			dateFrom = scopes.svyDateUtils.toStartOfDay(tomorrow);
			break;
		case DATE.YESTERDAY:
			yesterday = scopes.svyDateUtils.addDays(today, -1);
			dateTo = null;
			dateFrom = scopes.svyDateUtils.toStartOfDay(yesterday);
			break;
		case DATE.LAST_MONTH:
			date = scopes.svyDateUtils.addMonths(today, -1);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(date));
			break;
		case DATE.LAST_WEEK:
			date = scopes.svyDateUtils.addDays(today, -7);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(date));
			break;
		case DATE.LAST_YEAR:
			date = scopes.svyDateUtils.addYears(today, -1);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(date));
			break;
		case DATE.NEXT_MONTH:
			date = scopes.svyDateUtils.addMonths(today, 1);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(date));
			break;
		case DATE.NEXT_WEEK:
			date = scopes.svyDateUtils.addDays(today, 7);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(date));
			break;
		case DATE.NEXT_YEAR:
			date = scopes.svyDateUtils.addYears(today, 1);
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(date));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(date));
			break;
		case DATE.THIS_MONTH:
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(today));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(today));
			break;
		case DATE.THIS_WEEK:
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(today));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(today));
			break;
		case DATE.THIS_YEAR:
			dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(today));
			dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(today));
			break;
		default:
			break;
		}
	} else if (selectedValues && selectedValues.length) {
		if(operator == scopes.svyPopupFilter.OPERATOR.SMALLER_THEN || operator == scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL) {
			dateFrom = null;
			dateTo = selectedValues[0];
		} else {
			dateFrom = selectedValues[0];
			dateTo = selectedValues[1]||null;
		}
	} else {
		dateFrom = null;
		dateTo = null;
	}
}

/**
 * @protected
 * @return {Array}
 * @properties={typeid:24,uuid:"3663C0D4-B5FC-4A94-899D-41588025D5B4"}
 * @override
 */
function getSelectedFilterValues() {
	if (selectedDate) {
		return [selectedDate];
	} else if (dateFrom && dateTo) {
		operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
		return [scopes.svyDateUtils.toStartOfDay(dateFrom), scopes.svyDateUtils.toEndOfDay(dateTo)];
	} else if (dateFrom) {
		operator = scopes.svyPopupFilter.OPERATOR.GREATER_EQUAL;
		return [scopes.svyDateUtils.toStartOfDay(dateFrom)];

	} else if (dateTo) {
		operator = scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL;
		return [scopes.svyDateUtils.toStartOfDay(dateTo)];
	} else {
		return [];
	}
	
	// return [dateFrom ? scopes.svyDateUtils.toStartOfDay(dateFrom) : null, dateTo ? scopes.svyDateUtils.toEndOfDay(dateTo) : null];
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"4CDDC978-247C-437E-8B5D-65CEFA7E9EF1"}
 */
function updateUI() {
	
}

/**
 * @protected
 * @properties={typeid:24,uuid:"28611948-0EA9-4818-8386-9FEB4BFE36AE"}
 */
function setSelectionToday() {
	var today = new Date();
	dateFrom = scopes.svyDateUtils.toStartOfDay(today);
	dateTo = scopes.svyDateUtils.toEndOfDay(today);
	operator = scopes.svyPopupFilter.OPERATOR.EQUALS;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.TODAY);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"C7DBF849-C71C-4404-898F-398F9B703E12"}
 */
function setSelectionTomorrow() {
	var tomorrow = scopes.svyDateUtils.addDays(new Date(), 1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(tomorrow);
	dateTo = scopes.svyDateUtils.toEndOfDay(tomorrow);
	operator = scopes.svyPopupFilter.OPERATOR.EQUALS;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.TOMORROW);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"3BA53559-058F-404B-8661-F406A18E34B1"}
 */
function setSelectionThisWeek() {
	var today = new Date();
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(today));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(today));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.THIS_WEEK);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"0383EF7C-9B17-46A5-AFFE-6B02F1D7FD8C"}
 */
function setSelectionThisMonth() {
	var today = new Date();
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(today));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(today));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.THIS_MONTH);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"B7AAD534-BAA8-4F35-BDB1-4B71EB9EBB87"}
 */
function setSelectionThisYear() {
	var today = new Date();
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(today));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(today));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.THIS_YEAR);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"D67CCAF0-67F8-4BF3-B942-8D680A60931F"}
 */
function setSelectionNextWeek() {
	var date = scopes.svyDateUtils.addDays(new Date(), 7);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.NEXT_WEEK);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"C30C5704-306C-48BC-9B46-E7DF7ECBCF68"}
 */
function setSelectionNextMonth() {
	var date = scopes.svyDateUtils.addMonths(new Date(), 1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.NEXT_MONTH);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"D34FEE7C-1E68-40B5-A487-C6F715E9C9B6"}
 */
function setSelectionLastYear() {
	var date = scopes.svyDateUtils.addYears(new Date(), -1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.LAST_YEAR);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"8F94F593-E5C0-403B-8411-79E00537F6E3"}
 */
function setSelectionLastMonth() {
	var date = scopes.svyDateUtils.addMonths(new Date(), -1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfMonth(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfMonth(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.LAST_MONTH);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"D94FF145-4628-4A7C-A160-B156D237212D"}
 */
function setSelectionLastWeek() {
	var date = scopes.svyDateUtils.addDays(new Date(), -7);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfWeek(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfWeek(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.LAST_WEEK);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"88339A3C-D584-4ABA-BF91-0C022014AAFA"}
 */
function setSelectionNextYear() {
	var date = scopes.svyDateUtils.addYears(new Date(), 1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.getFirstDayOfYear(date));
	dateTo = scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.getLastDayOfYear(date));
	operator = scopes.svyPopupFilter.OPERATOR.BETWEEN;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.NEXT_YEAR);
	//updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"C94EF6DD-F7E5-4BDF-AE1E-65CB812B8CC1"}
 */
function setSelectionYesterday() {
	var yesterday = scopes.svyDateUtils.addDays(new Date(), -1);
	dateFrom = scopes.svyDateUtils.toStartOfDay(yesterday);
	dateTo = scopes.svyDateUtils.toEndOfDay(yesterday);
	operator = scopes.svyPopupFilter.OPERATOR.EQUALS;
	setSelectedDate(scopes.svyPopupFilter.SELECTED_DATES.YESTERDAY);
	//updateUI();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} sDate
 * @protected
 * @properties={typeid:24,uuid:"B4D76703-759C-48D5-A982-B9402796D66B"}
 */
function setSelectedDate(sDate) {
	if (selectedDate == sDate) {
		selectedDate = null;
	} else {
		selectedDate = sDate;
	}
	var startDate = new Date();
	startDate.setTime(startDate.getTime() + 200);
	plugins.scheduler.addJob('updateUI', startDate, jobSelectedDate, [selectedDate]);
}

/**
 * @private
 * @param sDate
 *
 * @properties={typeid:24,uuid:"034B28C0-D89F-480C-947B-2179243E43D4"}
 */
function jobSelectedDate(sDate) {
	//restore the selection overruling the onDataChange. Workaround for issue SVYX-383
	selectedDate = sDate;
	updateUI();
}
