jQuery.sap.declare("cus.sd.srl.vms.view.block.ItemData");
jQuery.sap.require("sap.uxap.BlockBase");
sap.uxap.BlockBase.extend("cus.sd.srl.vms.view.block.ItemData", {
	metadata: {
		views: {
			Collapsed: {
				viewName: "cus.sd.srl.vms.view.block.ItemData",
				type: "XML"
			},
			Expanded: {
				viewName: "cus.sd.srl.vms.view.block.ItemData",
				type: "XML"
			}
		}
	}
});