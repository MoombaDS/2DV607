module.exports = {
	spendPoints: function(unit) {
		return {type: "SPEND_POINTS", unit: unit};
	},
	refundPoints: function() {
		return {type: "REFUND_POINTS"};
	}
};