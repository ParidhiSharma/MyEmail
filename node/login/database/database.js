var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/users");

//Schema for adding ne user
var newUserInfoSchema = new mongoose.Schema({
	"_id" : Number,
	"firstname":String,
	"lastname":String,
	"username":String,
	"password" : String
});
var addUser = mongoose.model("userInfo" , newUserInfoSchema);

//Schema for population//======================================================================================
// var userAddressSchema = new mongoose.Schema({
// 	"address":String,
// 	"owner" : {type:Number, ref :'userInfo'}
// });
// var addUserAddress = mongoose.model("userAddress" , userAddressSchema);




// var populate = function(){
// 	// var aaron = new addUser({ _id: 0, firstname: 'Aaron'});

// 	// 	aaron.save(function (err) {
// 	// 	  if (err) console.log(err);
		  
// 	// 	  var addUserAddress1 = new addUserAddress({
// 	// 	    address: "something",
// 	// 	    owner: aaron._id    // assign the _id from the person
// 	// 	  });
		  
// 	// 	  addUserAddress1.save(function (err) {
// 	// 	    if (err) console.log(err)
			 
// 	//   		console.log("Done")
// 	// 	  });
// 	// })

//    addUserAddress
// 		.findOne({ address: 'something' })
// 		.populate('owner')
// 		.exec(function (err, story) {
// 		  if (err) return handleError(err);
// 		  console.log('The creator is %s', story.owner.firstname);
// 		  // prints "The creator is Aaron"
// 		})

	
// }
//======================================================================================================================


//Schema for validating user info
var validateUserInfoSchema = new mongoose.Schema({
	"username" : String,
	"password": String
});
var users = mongoose.model("uservalidation" , validateUserInfoSchema);


var validateUserInfo = function(args,callback){
	users.findOne(args,function(err,res){
		if (err) {
			console.log(err.error);
			callback("error")
		}
		else if (res == null) {
			callback("notFound");
		}
		else{
			callback(res);
		}
	});

};

var addNewUser = function(args,callback){
	console.log(args);
	var a = new addUser({"firstname":args.firstname,"lastname":args.lastname,"username":args.username,"password":args.password})
	a.save(function(err) {
			if (err) {
			console.log("erroe"+err)
			}
			else{
				callback(a);
			}
		});
}

module.exports = {
	validateUserInfo : validateUserInfo,
	addNewUser : addNewUser
}
