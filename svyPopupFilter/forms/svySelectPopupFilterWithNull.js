///**
// * @properties={typeid:24,uuid:"EE10FC1B-A959-4637-849B-A763E6680DAF"}
// */
//function getSelectedFilterValues() {
//
//	return [null];
//}

/**
 * @protected 
 * @param newOperator
 *
 * @properties={typeid:24,uuid:"404A7B2C-2723-4108-B1C8-344F49E4EC24"}
 */
function toggleOperator(newOperator) {
	operator = newOperator;
	var hasSvyOperator = false;
	var arrParam = lookup.getParams();
	//	arrParam = [1.0, 2.0, 3.0, {svyOperator:'isNull'}, 5.0, 6.0]
	for (var index = 0; index < arrParam.length; index++) {
		if (arrParam[index].svyOperator) {
			arrParam[index].svyOperator = operator;
			hasSvyOperator = true;
		}

	}
	if (!hasSvyOperator) {
		lookup.addParam({ svyOperator: operator });
	}

	updateUI();
}

/**
 * @protected 
 * @param foundsetindex
 * @param columnindex
 * @param record
 * @param event
 *
 * @properties={typeid:24,uuid:"7BC2B01D-12D7-458E-BA40-B16A67FF1A57"}
 * @override
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.IS_IN);
	_super.onCellClick(foundsetindex, columnindex, record, event);
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"E18BB0BA-65BF-4D24-A715-74B716D0B64C"}
 */
function selectEmpty() {
	deselectAllRecords();
	toggleOperator(scopes.svyPopupFilter.OPERATOR.IS_NULL);
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"711A99C0-1700-41E1-AC25-5461137B36EA"}
 */
function selectNotEmpty() {
	deselectAllRecords();
	toggleOperator(scopes.svyPopupFilter.OPERATOR.NOT_NULL);
}

/**
 * @protected 
 * @properties={typeid:24,uuid:"7246486E-B6C0-4AFE-B43A-EC2E92B1BDA4"}
 */
function updateUI() {
	elements.selectEmpty.addStyleClass("text-tertiary");
	//	setIconUnselected(elements.iconIsEmpty);

		elements.selectNotEmpty.addStyleClass("text-tertiary");
	//	setIconUnselected(elements.iconIsNotEmpty);

	switch (operator) {
	case scopes.svyPopupFilter.OPERATOR.IS_NULL:
		elements.selectEmpty.removeStyleClass("text-tertiary");
		//setIconSelected(elements.iconIsEmpty);

		break;
		case scopes.svyPopupFilter.OPERATOR.NOT_NULL:
			elements.selectNotEmpty.removeStyleClass("text-tertiary");
	//		setIconSelected(elements.iconIsNotEmpty);
	//
			break;
	default:
		break;
	}
}
