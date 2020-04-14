jQuery.sap.declare("cus.sd.srl.vms.view.block.Header");
jQuery.sap.require("sap.uxap.BlockBase");
sap.uxap.BlockBase.extend("cus.sd.srl.vms.view.block.Header", {
	metadata: {
		views: {
			Collapsed: {
				viewName: "cus.sd.srl.vms.view.block.Header",
				type: "XML"
			},
			Expanded: {
				viewName: "cus.sd.srl.vms.view.block.Header",
				type: "XML"
			}
		}
	}
});