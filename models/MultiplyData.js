var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

var Schema = mongoose.Schema;

var multiplyDataSchema = new Schema({
    itemId: String,
    num1: String , 
    num2: String,
    multiply: String
});

var multiplyData = mongoose.model('multiplyData',multiplyDataSchema);

module.exports = multiplyData;