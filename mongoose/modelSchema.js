var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

var FriendSchema = new Schema({
	name:String,
	tel:String,
	address:[String]
})

var ReSchema = new Schema({
	name:String,
	tel:[String],
	friend:[FriendSchema]
	
})



var AgentSchema = new Schema({
		agentName:{type:String},
		// agentPhoneNumber:{type:String},
		// agentDesensitizationNumber:{type:String},
		// agentAvatarImg:{type:String},
		// idCard:{type:String},
		// promotionProducts:{type:Array},
		// mainProProducts:{type:String},
		// isVIP:{type:Boolean},
		// agentWechat:{type:String},
		// agentAlipay:{type:String},
		// openID:{type:String},
		// unionID:{type:String},
		// superLevel:{type:Array},
		// bigSuperLevel:{type:Array},
		// topSuperLevel:{type:Array},
		// beAgentTime:{type:Array},
})

var CustomerSchema = new Schema({
		customerName:{type:String},
		// customerPhoneNumber:{type:String},
		// customerDesensitizationNumber:{type:String},
		// customerAvatarImg:{type:String},
		// selectedProducts:{type:String},
		// bossPhoneNumber:{type:String},
		// bossWechat:{type:String},
		// beCustomerTime:{type:String},
		// customerProgress:{type:Array},
})

var Re = mongoose.model('re',ReSchema,'re');
var Agent = mongoose.model('agent',AgentSchema,'agent');
var Customer = mongoose.model('customer',CustomerSchema,'customer');


module.exports.Re = Re;
module.exports.Agent = Agent;
module.exports.Customer = Customer;

