/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1FDAB7CD-2E1C-4A0E-B48A-5270A7675147"}
 * @override
 */
function onLoad(event) {
	_super.onLoad(event);
	updateUI();
}

/**
 * @protected 
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"E20DFB62-7543-43D9-B286-EAE20058A031"}
 * @override
 */
function onShow(firstShow,event) {
	if (filter && filter.getText()) {
		elements.labelTitle.text = filter.getText();
	}
	_super.onShow(firstShow,event);
}

/**
 * @param {String} newOperator
 *
 * @properties={typeid:24,uuid:"F928B519-7FE3-45DC-A5A4-3CE1F8D0945B"}
 */
function toggleOperator(newOperator) {
	operator = newOperator;
	updateUI();
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"826402C7-E82F-450F-AA53-065F3010F6FB"}
 */
function onActionToggleEqualTo(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.EQUALS);
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5742086A-6023-4D71-807C-5764C6984519"}
 */
function onActionToggleBiggerThen(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.GREATER_EQUAL);
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2B9B6314-E227-482B-BB1D-E47D89D93AF6"}
 */
function onActionToggleSmallerThen(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL);
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"660BF5E2-956E-4637-8522-8B9B020DBE7C"}
 */
function onActionToggleBetween(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.BETWEEN);
}

/**
 * @protected
 * @properties={typeid:24,uuid:"0F223D2E-2293-4D7F-A3FE-3508E1761285"}
 */
function updateUI() {
	elements.labelEqualTo.addStyleClass("text-tertiary");
	elements.iconEqualTo.styleclass = "fa fa-circle-o text-tertiary clickable";
	elements.textboxEqualTo.enabled = false;

	elements.labelGreater.addStyleClass("text-tertiary");
	elements.iconGreater.styleclass = "fa fa-circle-o text-tertiary clickable";
	elements.textboxGreater.enabled = false;

	elements.labelSmaller.addStyleClass("text-tertiary");
	elements.iconSmaller.styleclass = "fa fa-circle-o text-tertiary clickable";
	elements.textboxSmaller.enabled = false;

	elements.labelBetween.addStyleClass("text-tertiary");
	elements.iconBetween.styleclass = "fa fa-circle-o text-tertiary clickable";
	elements.textboxBetweenMin.enabled = false;
	elements.textboxBetweenMax.enabled = false;

	switch (operator) {
	case scopes.svyPopupFilter.OPERATOR.EQUALS:
		elements.labelEqualTo.removeStyleClass("text-tertiary");
		elements.iconEqualTo.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.textboxEqualTo.enabled = true;
		break;
	case scopes.svyPopupFilter.OPERATOR.BETWEEN:
		elements.labelBetween.removeStyleClass("text-tertiary");
		elements.iconBetween.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.textboxBetweenMin.enabled = true;
		elements.textboxBetweenMax.enabled = true;
		break;
	case scopes.svyPopupFilter.OPERATOR.GREATER_EQUAL:
		elements.labelGreater.removeStyleClass("text-tertiary");
		elements.iconGreater.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.textboxGreater.enabled = true;
		break;
	case scopes.svyPopupFilter.OPERATOR.SMALLER_EQUAL:
		elements.labelSmaller.removeStyleClass("text-tertiary");
		elements.iconSmaller.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.textboxSmaller.enabled = true;
		break;
	default:
		break;
	}
}
