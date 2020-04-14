jQuery.sap.declare("cus.sd.srl.vms.util.Formatter");

cus.sd.srl.vms.util.Formatter = {

	Status_Value: function (status) {
		if (status == "1") {
			status = "Approved";
			return status;
		}
		if (status == "2") {
			status = "Rejected";
			return status;
		}
		if (status == "4") {
			status = "Clarification";
			return status;
		}

		if (status == "5") {
			status = "Approver Forwarded";
			return status;
		}

		if (status == "9") {
			status = "Partially Approved";
			return status;
		}
		if (status == "3" || status == "" || status == undefined) {
			status = "Pending";
			return status;
		}
	},
	State: function (status) {
		if (status == "1") {
			status = "Success";
			return status;
		}
		if (status == "2" || status == "") {
			status = "Error";
			return status;
		}
	},

	Date: function (status) {
		status = new Date(status);

		return status;
	}

};