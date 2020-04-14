var HeaderView = "";
sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/mvc/Controller',

], function (jQuery, MessageToast, Controller) {
	"use strict";
	var Controller = Controller.extend("cus.sd.srl.vms.controller.Header", {

		onInit: function () {
			var style = "sapUiSizeCompact";
			this.getView().addStyleClass(style);
			HeaderView = this;
			HeaderView.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			Count = 1;
			// this.PRLIST();
			this.PendingPRlist();

		},

		PendingPRlist: function () {
			var URL = HOST + "/SRL/pendingPRList";
			var that = this;

			$.ajax({
				type: "POST",
				url: URL,

				data: {
					USERID: Uname,
					STATUS: PRstatus,
					REQNO: PRprno,
					SESID: SessionId
				},
				success: function (response) {
					if (response.code === "1000") {
						var responsetSet = JSON.parse(response.pendingAprvList);

						result.PendPRListSet = responsetSet;

						var msg = "Pending PR list found";
						// sap.m.MessageToast.show(msg);

						jModel.setData(result);
						ItemView.byId("idPRTable").setModel(jModel);
						that.getView().byId("idHeaderinfo").setModel(jModel);
						var s = new Date(responsetSet[0].cdDat);
						that.getView().byId("idCrton").setDateValue(s);
					} else {
						result.PendPRListSet = [];
						jModel.setData(result);

						var msg = " Pending PR list NOT found";
						sap.m.MessageToast.show(msg);
					}

					//	result.oDepartmentSet: [];

				},
				error: function (err) {}
			});
		},

		onAfterRendering: function () {

		}
	});
	return Controller;
});