var ItemView;
sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/mvc/Controller',

], function(jQuery, MessageToast, Controller) {
	"use strict";
	var Controller = Controller.extend("cus.sd.srl.vms.controller.ItemData", {

		onInit: function() {
			var style = "sapUiSizeCompact";
			
			ItemView = this.getView();
			this.getView().addStyleClass(style);

		},
	

		onAfterRendering: function() {

		}
	});
	return Controller;
});