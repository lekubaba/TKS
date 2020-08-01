var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
	title:{type:String,lowercase:true},
	tel:{type:String,index:true}
})

var Story = mongoose.model('storys',StorySchema,'storys');


module.exports.Story = Story;

