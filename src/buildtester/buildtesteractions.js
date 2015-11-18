module.exports = {
	spendPoints: function(cost) {
		return {type: "SPEND_POINTS", cost : cost};
	},
	refundPoints: function() {
		return {type: "REFUND_POINTS"};
	}
};