var MultiplyData = require("../models/MultiplyData.js");
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.get('/api/multiplyData',function(req,res){
        console.log('comming to multiplyData');
        MultiplyData.find(function(err , multiplyData){

            if(err) throw err;

            res.send(multiplyData);

        }).sort({_id:1})

    })
     app.post('/api/saveMultiplyData', function(req, res) {
      console.log('data recieved to save to database');
       var newMultiplyData = MultiplyData({
        itemId: req.body.itemId,
        num1: req.body.num1 , 
        num2: req.body.num2,
        multiply: req.body.multiply
       })

       newMultiplyData.save(function(err){
        if (err) throw err;
        res.send("Success");
       })
         
     });



}