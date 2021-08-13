/**
 * @properties={typeid:24,uuid:"144BDC38-E463-4FA8-8815-EAF9A672D9B1"}
 */
function onActionToggleIsNull(){
	toggleOperator(scopes.svyPopupFilter.OPERATOR.IS_NULL);
}


/**
 * @properties={typeid:24,uuid:"C8267F08-91DA-46BF-BF72-ED32DE5F10A9"}
 */
function onActionToggleIsNotNull(){
	toggleOperator(scopes.svyPopupFilter.OPERATOR.NOT_NULL);
}



/**
 * @properties={typeid:24,uuid:"35F82754-D7E3-4D52-878C-9B5A8FF661A4"}
 * @override
 */
function updateUI() {
	elements.labelIsEmpty.addStyleClass("text-tertiary");
	setIconUnselected(elements.iconIsEmpty);
	
	elements.labelIsNotEmpty.addStyleClass("text-tertiary");
	setIconUnselected(elements.iconIsNotEmpty);
	
	switch (operator) {
	case scopes.svyPopupFilter.OPERATOR.IS_NULL:
		elements.labelIsEmpty.removeStyleClass("text-tertiary");
		setIconSelected(elements.iconIsEmpty);
		
		break;
	case scopes.svyPopupFilter.OPERATOR.NOT_NULL:
		elements.labelIsNotEmpty.removeStyleClass("text-tertiary");
		setIconSelected(elements.iconIsNotEmpty);
		
		break;
	default:
		break;
	}
	_super.updateUI();
}
