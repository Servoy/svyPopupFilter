/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"508CC1E9-C51F-4938-8660-0DCDB623A4F3"}
 */
function onActionToggleEmpty(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.IS_NULL);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"5EB67AD7-847E-4F74-9A1C-B9B8AD102C80"}
 */
function onActionToggleNotEmpty(event) {
	toggleOperator(scopes.svyPopupFilter.OPERATOR.NOT_NULL);
}


/**
 * @properties={typeid:24,uuid:"D96E25D8-721F-4031-9988-BAF1A236AF5D"}
 * @override
 */
function updateUI() {
	elements.labelEmpty.addStyleClass("text-tertiary");
	setIconUnselected(elements.iconEmpty);
	elements.textboxEmpty.enabled = false;
	
	elements.labelNotEmpty.addStyleClass("text-tertiary");
	setIconUnselected(elements.iconNotEmpty);
	elements.textboxNotEmpty.enabled = false;

	switch (operator) {
	case scopes.svyPopupFilter.OPERATOR.IS_NULL:
		elements.labelEmpty.removeStyleClass("text-tertiary");
		setIconSelected(elements.iconEmpty);
		break;
	case scopes.svyPopupFilter.OPERATOR.NOT_NULL:
		elements.labelNotEmpty.removeStyleClass("text-tertiary");
		setIconSelected(elements.iconNotEmpty);
		break;
	default:
		break;
	}
	
	_super.updateUI();
}