jQuery.sap.require("cus.sd.srl.vms.util.Formatter");
var jModel;
var SelectedState = "";
jModel = new sap.ui.model.json.JSONModel();
var jtModel1;

jtModel1 = new sap.ui.model.json.JSONModel();

var result = {
	PRListSet: [],
	StateListSet: [],
	DistrictSet: [],
	Country: [],
	World: [],
	StatesWise: [],
	ItemData: [],
	ChartDataSet: []

};

var Count = "";

//var HOST = "http://localhost:8085";
var HOST = "https://coronavirus-19-api.herokuapp.com/countries";

var HOST1 = "https://api.covid19india.org/states_daily.json";
var HOST2 = "https://api.covid19india.org/data.json";

var HOST3 = "https://api.covid19india.org/v2/state_district_wise.json";

// var HOST = "";
sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'sap/suite/ui/commons/ChartContainer',
	'sap/suite/ui/commons/ChartContainerContent'

], function (jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, ChartContainer, ChartContainerContent) {
	"use strict";

	var CController = Controller.extend("cus.sd.srl.vms.controller.View1", {

		onInit: function () {
			var oView = this.getView();
			this.adjustMyChartBox(oView, "idVizFrame1", "Cell1");
			this.adjustMyChartBox(oView, "idVizFrame2", "Cell2");
			this.adjustMyChartBox(oView, "idVizFrame3", "Cell3");
			this.adjustMyChartBox(oView, "idVizFrame4", "Cell4");

			this.PRLIST();
			this.stateList();

			this.AllstateList();

			this.getSplitAppObj().toMaster(this.createId("master"));
		},

		adjustMyChartBox: function (oView, sChartId, sBlockId) {
			var oVizFrame = oView.byId(sChartId);

			var oChartConainerContent = new ChartContainerContent({
				content: [oVizFrame]
			});
			var oChartConainer = new ChartContainer({
				content: [oChartConainerContent]
			});

			oChartConainer.setShowFullScreen(true);
			oChartConainer.setAutoAdjustHeight(true);
			oView.byId(sBlockId).addContent(oChartConainer);

		},

		getSplitAppObj: function () {
			var result = this.byId("SplitApp");
			if (!result) {
				MessageToast.show("SplitApp object can't be found");
			}
			return result;
		},

		stateList: function () {
			sap.ui.core.BusyIndicator.show(0);
			var URL = HOST1 + "";
			var that = this;
			$.ajax({
				type: "GET",
				url: URL,
				// data: {
				// 	USERID: Uname,
				// 	SESID: SessionId

				// },
				success: function (response) {
					sap.ui.core.BusyIndicator.hide();
					var responsetSet = response.states_daily;

					for (var i = 1; i < responsetSet.length; i++)

					{
						result.StatesWise.push(responsetSet[i]);
					}

					jModel.setSizeLimit(responsetSet.length);
					jModel.setData(result);

					jtModel1.setData(result.Country[0]);

					that.getChartPRrequest3();
					// 	that.getView().byId("idVizFrame").setModel(jModel);
					// 	that.getView().byId("idHeaderinfo").setModel(jModel);

				},
				error: function (err) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},

		AllstateList: function () {
			sap.ui.core.BusyIndicator.show(0);
			var URL = HOST2 + "";
			var that = this;
			$.ajax({
				type: "GET",
				url: URL,
				// data: {
				// 	USERID: Uname,
				// 	SESID: SessionId

				// },
				success: function (response) {
					sap.ui.core.BusyIndicator.hide();
					var responsetSet = response.statewise;

					for (var i = 0; i < responsetSet.length; i++)

					{
						if (responsetSet) {
							result.StateListSet.push(responsetSet[i]);

						}
					}

					jModel.setSizeLimit(responsetSet.length);
					jModel.setData(result);

					that.getView().byId("IDList").setModel(jModel);

					// 	that.getView().byId("idVizFrame").setModel(jModel);
					// 	that.getView().byId("idHeaderinfo").setModel(jModel);

				},
				error: function (err) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},

		PRLIST: function () {
			sap.ui.core.BusyIndicator.show(0);
			var URL = HOST + "";
			var that = this;
			$.ajax({
				type: "GET",
				url: URL,
				// data: {
				// 	USERID: Uname,
				// 	SESID: SessionId

				// },
				success: function (response) {
					sap.ui.core.BusyIndicator.hide();
					var responsetSet = response;

					for (var i = 0; i < responsetSet.length; i++)

					{
						if (responsetSet[i].country === "India") {
							result.PRListSet.push(responsetSet[i]);

						}
					}

					for (var i = 0; i < responsetSet.length; i++)

					{
						if (responsetSet[i].country === "World") {
							result.World.push(responsetSet[i]);

						}
					}

					for (var i = 0; i < responsetSet.length; i++)

					{
						if (responsetSet[i].country) {
							result.Country.push(responsetSet[i]);

						}
					}

					jModel.setSizeLimit(responsetSet.length);
					jModel.setData(result);

					jtModel1.setData(result.Country[0]);

					that.getChartPRrequest();

					that.getChartPRrequest1();

					that.getChartPRrequest2();
					// 	that.getView().byId("idVizFrame").setModel(jModel);
					// 	that.getView().byId("idHeaderinfo").setModel(jModel);

				},
				error: function (err) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		getChartPRrequest: function () {
			var me = this;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame3");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame4");
			oVizFrame.setVizProperties({
				plotArea: {
					drawingEffect: "glossy",
					dataLabel: {
						visible: true,
						type: "value"
					}
				},
				legend: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true
				}
			});
			/*	var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
			*/
			var oTooltip = new sap.viz.ui5.controls.VizTooltip();
			oTooltip.connect(oVizFrame.getVizUid());

			var Chart_DATA = [];
			Chart_DATA = [{
					Status: "TODAY DEATH",
					Count: 0
				}, {
					Status: "TOTAL CASES",
					Count: 0
				}, {
					Status: "TODAY CASES",
					Count: 0
				}, {
					Status: "DEATH",
					Count: 0
				},

				{
					Status: "RECOVERED",
					Count: 0
				},

				{
					Status: "ACTIVE",
					Count: 0
				},

				{
					Status: "CRITICAL",
					Count: 0
				},

				{
					Status: "CASES PER MILLION",
					Count: 0
				},

				{
					Status: "DEATHS PER MILLION",
					Count: 0
				}, {
					Status: "FirstCase In India",
					Count: 0
				}

			];

			for (var i = 0; i < result.PRListSet.length; i++) {

				if (result.PRListSet[i].todayDeaths >= 0) {
					Chart_DATA[0].Status = "TODAY DEATH";
					Chart_DATA[0].Count = parseInt(result.PRListSet[i].todayDeaths) + 0;
				}
				if (result.PRListSet[i].cases >= 0) {
					Chart_DATA[1].Status = "TOTAL CASES";
					Chart_DATA[1].Count = parseInt(result.PRListSet[i].cases) + 0;

				}
				if (result.PRListSet[i].todayCases >= 0) {
					Chart_DATA[2].Status = "TODAY CASES";
					Chart_DATA[2].Count = parseInt(result.PRListSet[i].todayCases) + 0;

				}
				if (result.PRListSet[i].deaths >= 0) {
					Chart_DATA[3].Status = "DEATH";
					Chart_DATA[3].Count = parseInt(result.PRListSet[i].deaths) + 0;

				}

				if (result.PRListSet[i].recovered >= 0) {
					Chart_DATA[4].Status = "RECOVERED";
					Chart_DATA[4].Count = parseInt(result.PRListSet[i].recovered) + 0;

				}

				if (result.PRListSet[i].active >= 0) {
					Chart_DATA[5].Status = "ACTIVE";
					Chart_DATA[5].Count = parseInt(result.PRListSet[i].active) + 0;

				}

				if (result.PRListSet[i].critical >= 0) {
					Chart_DATA[6].Status = "CRITICAL";
					Chart_DATA[6].Count = parseInt(result.PRListSet[i].critical) + 0;

				}

				if (result.PRListSet[i].casesPerOneMillion >= 0) {
					Chart_DATA[7].Status = "CASES PER MILLION";
					Chart_DATA[7].Count = parseInt(result.PRListSet[i].casesPerOneMillion) + 0;

				}

				if (result.PRListSet[i].deathsPerOneMillion >= 0) {
					Chart_DATA[7].Status = "DEATHS PER MILLION";
					Chart_DATA[7].Count = parseInt(result.PRListSet[i].deathsPerOneMillion) + 0;

				}

				if (result.PRListSet[i].casesPerOneMillion >= 0) {
					Chart_DATA[8].Status = "CASES PER MILLION";
					Chart_DATA[8].Count = parseInt(result.PRListSet[i].casesPerOneMillion) + 0;

				}

				if (result.PRListSet[i].firstCase >= 0) {
					Chart_DATA[9].Status = "FirstCase In India";
					Chart_DATA[9].Count = parseInt(result.PRListSet[i].firstCase) + 0;

				}

			}
			result.ChartDataSet = Chart_DATA;
			jModel.setData(result);
			me.getView().setModel(jModel);

		},
		getChartPRrequest1: function () {
			var me = this;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame1");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame3");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame4");
			oVizFrame.setVizProperties({
				plotArea: {
					drawingEffect: "glossy",
					dataLabel: {
						visible: true,
						type: "value"
					}
				},
				legend: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true
				}
			});
			/*	var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
			*/
			var oTooltip = new sap.viz.ui5.controls.VizTooltip();
			oTooltip.connect(oVizFrame.getVizUid());

			var Chart_DATA = [];

			for (var i = 0; i < result.Country.length; i++) {

				Chart_DATA.push({
					Status: result.Country[i].country,
					Count: parseInt(result.Country[i].todayCases) + 0
				});

				// Chart_DATA[0].Status = result.Country[i].country;
				// Chart_DATA[0].Count = parseInt(result.PRListSet[i].todayDeaths) + 0;

			}
			result.ChartDataSet1 = Chart_DATA;
			jModel.setData(result);
			me.getView().setModel(jModel);

		},

		getChartPRrequest2: function () {
			var me = this;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame1");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame3");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame4");
			oVizFrame.setVizProperties({
				plotArea: {
					drawingEffect: "glossy",
					dataLabel: {
						visible: true,
						type: "value"
					}
				},
				legend: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true
				}
			});
			/*	var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
			*/
			var oTooltip = new sap.viz.ui5.controls.VizTooltip();
			oTooltip.connect(oVizFrame.getVizUid());

			var Chart_DATA = [];

			for (var i = 0; i < result.Country.length; i++) {

				Chart_DATA.push({
					Status: result.Country[i].country,
					Count: parseInt(result.Country[i].todayDeaths) + 0
				});

				// Chart_DATA[0].Status = result.Country[i].country;
				// Chart_DATA[0].Count = parseInt(result.PRListSet[i].todayDeaths) + 0;

			}
			result.ChartDataSet2 = Chart_DATA;
			jModel.setData(result);
			me.getView().setModel(jModel);

		},

		getChartPRrequest3: function () {
			var me = this;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame2");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame3");
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame4");
			oVizFrame.setVizProperties({
				plotArea: {
					drawingEffect: "glossy",
					dataLabel: {
						visible: true,
						type: "value",
						dataType: "date"
					}
				},
				legend: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true
				}
			});
			/*	var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
			*/
			var oTooltip = new sap.viz.ui5.controls.VizTooltip();
			oTooltip.connect(oVizFrame.getVizUid());

			var Chart_DATA = [];

			for (var i = 0; i < result.StatesWise.length; i++) {

				Chart_DATA.push({
					Status: result.StatesWise[i].date,
					Count: parseInt(result.StatesWise[i].ka) + 0
				});

				// Chart_DATA[0].Status = result.Country[i].country;
				// Chart_DATA[0].Count = parseInt(result.PRListSet[i].todayDeaths) + 0;

			}
			result.ChartDataSet3 = Chart_DATA;
			jModel.setData(result);
			me.getView().setModel(jModel);

		},

		onSelectData: function (oEvent) {
			var sValue = oEvent.mParameters.data["0"].data.Status;

			if (sValue === "TOTAL CASES") {
				var key = "cases";
			} else if (sValue === "TODAY CASES") {
				var key = "todayCases";
			} else if (sValue === "DEATH") {
				var key = "deaths";
			} else if (sValue === "RECOVERED") {
				var key = "recovered";
			} else if (sValue === "ACTIVE") {
				var key = "active";
			} else if (sValue === "CRITICAL") {
				var key = "critical";
			} else if (sValue === "CASES PER MILLION") {
				var key = "casesPerOneMillion";
			} else if (sValue === "DEATHS PER MILLION") {
				var key = "deathsPerOneMillion";
			}

			if (sValue && sValue.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("status/statusId", sap.ui.model.FilterOperator.EQ, key);
				var allfilter = new sap.ui.model.Filter([oFilter1], false);
			}
			// update list binding
			var list = this.getView().byId("IDList");
			var binding = list.getBinding("items");
			binding.filter(allfilter, "Application");
		},
		onDeSelectData: function () {
			var sValue = "";
			if (sValue && sValue.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.EQ, sValue);
				var allfilter = new sap.ui.model.Filter([oFilter1], false);
			}
			var list = this.getView().byId("IDList");
			var binding = list.getBinding("items");
			binding.filter(allfilter, "Application");
		},

		onSearch: function (oEvent) {

			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("state", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("IDList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		_handlePressCreate: function () {
			this.getSplitAppObj().to(this.createId("detail"));
			// this.getSplitAppObj().setMode("HideMode");

		},

		onPressDetailBack: function () {
			// var oView = this.getView();
			// this.adjustMyChartBox(oView, "idVizFrame1", "Cell1");
			// this.adjustMyChartBox(oView, "idVizFrame2", "Cell2");
			// this.adjustMyChartBox(oView, "idVizFrame3", "Cell3");
			// this.adjustMyChartBox(oView, "idVizFrame4", "Cell4");

			this.PRLIST();
			this.stateList();

			this.AllstateList();
			this.getSplitAppObj().backDetail();
			this.getSplitAppObj().setMode("PopoverMode");

		},

		_handlePRItemPress: function (oEvent) {
			result.DistrictSet = [];

			var bindval = oEvent.getSource().getBindingContext();
			SelectedState = bindval.getProperty().state;

			sap.ui.core.BusyIndicator.show(0);
			var URL = HOST3 + "";
			var that = this;
			$.ajax({
				type: "GET",
				url: URL,
				// data: {
				// 	USERID: Uname,
				// 	SESID: SessionId

				// },
				success: function (response) {
					sap.ui.core.BusyIndicator.hide();
					var responsetSet = response;

					for (var i = 0; i < responsetSet.length; i++)

					{
						if (responsetSet[i].state === SelectedState) {
							for (var j = 0; j < responsetSet[i].districtData.length; j++) {
								result.DistrictSet.push(responsetSet[i].districtData[j]);
							}
						}
					}

					jModel.setSizeLimit(responsetSet.length);
					jModel.setData(result);

					// 	that.getView().byId("idVizFrame").setModel(jModel);
					// 	that.getView().byId("idHeaderinfo").setModel(jModel);

				},
				error: function (err) {
					sap.ui.core.BusyIndicator.hide();
				}
			});

			if (!this._oDialogEditApprvlMtrx) {
				this._oDialogEditApprvlMtrx = sap.ui.xmlfragment("cus.sd.srl.vms.util.Quick", this);
				this._oDialogEditApprvlMtrx.setModel(jModel);
			}

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialogEditApprvlMtrx);
			this._oDialogEditApprvlMtrx.open();
			this._oDialogEditApprvlMtrx.setTitle(SelectedState);
		},

		onCloseSiteDialog: function () {

			jModel.setData(result);
			this.getView().setModel(jModel);

			if (this._oDialogEditApprvlMtrx) {
				this._oDialogEditApprvlMtrx.close();
				this._oDialogEditApprvlMtrx.destroy();
				this._oDialogEditApprvlMtrx = null;

			} else {
				this._oDialogApproval.close();
				this._oDialogApproval.destroy();
				this._oDialogApproval = null;
				this._oDialogApprovalConf = undefined;
			}

		}

	});

	return CController;

});