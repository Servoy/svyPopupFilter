/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"486B1CE0-4FB7-419F-9D53-96B720134FFD"}
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
 * @properties={typeid:24,uuid:"9BF54DC9-E924-4C3E-B07B-06CCE70F36B4"}
 * @override
 */
function onShow(firstShow,event) {
	if (filter && filter.getText()) {
		elements.labelTitle.text = filter.getText();
	}
	_super.onShow(firstShow,event);
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"CAE10D35-9363-45AB-A16F-7CF9827D1486"}
 */
function onActionToggleChecked(event) {
	value = 1;
	operator = scopes.svyPopupFilter.OPERATOR.EQUALS;
	updateUI();
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"BB944DD1-C2E7-4143-9045-95655EEB8E72"}
 */
function onActionToggleUnchecked(event) {
	value = 0;
	operator = scopes.svyPopupFilter.OPERATOR.EQUALS_OR_NULL;
	updateUI();
}

/**
 * @protected
 * @properties={typeid:24,uuid:"C24F7268-8C00-4891-B557-41D22A63CEDF"}
 */
function updateUI() {
	
	if (value) {
		elements.radioChecked.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.labelChecked.removeStyleClass("text-tertiary");
		elements.labelChecked.addStyleClass("text-primary");
		
		elements.radioUnchecked.styleclass = "fa fa-circle-o text-tertiary clickable"
		elements.labelUnchecked.removeStyleClass("text-primary");
		elements.labelUnchecked.addStyleClass("text-tertiary");
	} else {
		elements.radioChecked.styleclass = "fa fa-circle-o text-tertiary clickable"
		elements.labelChecked.removeStyleClass("text-primary");
		elements.labelChecked.addStyleClass("text-tertiary");
		
		elements.radioUnchecked.styleclass = "fas fa-dot-circle text-primary clickable";
		elements.labelUnchecked.removeStyleClass("text-tertiary");
		elements.labelUnchecked.addStyleClass("text-primary");
	}
	
}
