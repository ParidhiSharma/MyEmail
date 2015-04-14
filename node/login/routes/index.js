var express = require('express');
var router = express.Router();
var db = require("../database/database.js");
var nodemailer = require("./nodemailer.js");
var userInfo;
var fs = require('fs');
var process = require('child_process');


/* Login page. */
router.post('/login', function(req, res, next) {
	if (req.body.state!=="logout") {
		var key ={"username":req.body.email,"password":req.body.password};
		db.validateUserInfo(key,function(result){
			userInfo = result;
			if (userInfo == "notFound") {
				res.send({"error":"User not registered"})
				res.redirect(302,'login');
			}
			else if(userInfo!==null) {
				console.log("success");
				req.session.views = 1;
				//res.redirect(302,'/home');
				res.render('home');
			}
		});
	}
	else {
		console.log("log out");
		req.session.views = 0;
		res.redirect(302,'login');
	}
//======================================================================
	// for(var i=0; i<10; i++) {
	// 	debugger;
	// 	var ls = process.exec('node worker.js ', function (error, stdout, stderr) {
	// 	   if (error) {
	// 	     console.log(error.stack);
	// 	     console.log('Error code: '+error.code);
	// 	     console.log('Signal received: '+error.signal);
	// 	   }
	// 	   console.log('stdout: ' + stdout);
	// 	   console.log('stderr: ' + stderr);
		   
	// 	 });
		
	// 	 ls.on('exit', function (code) {
	// 	   console.log('Child process exited with exit code '+code);
	// 	 });
	// }


	
//=========================================================================	

// db.populate();

});


/*Home page*/
router.get('/home', function(req, res) {
	// console.log(req.session.views);
	// var n = req.session.views || 0;
	// if (n>0) {
	// 	req.session.views = ++n;
	// 	console.log(n + ' views');
	// 	res.render('home');
	// }
	res.render('home');
});

/*Error page*/
router.get('/error', function(req, res) {
	console.log("dfuisdfsduifsdhfdshfudsufsdu");
	res.render('error',{"error":"Log out"});
});


/* Sign up */
router.post('/signup', function(req, res, next) {
	var key ={"firstname":req.body.firstName, "lastname":req.body.lastName, "username":req.body.userName, "password":req.body.password};
	db.addNewUser(key,function(result){
		if (result!==null) {
			req.session.views = 1;
			next();
		}
	});
}, function (req, res, next) {
	res.redirect(302,'/home');
});

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });

});

/* Sign up and get Home page */
router.get('/signup1', function(req, res) {
	console.log("SIGN UP");
	// for (key in req.session) {
	// 	console.log(req.session[key])
	// 	// res.send({"a":req.session[key]})
	// };
	// console.log(req.session.cookies);
	// res.send({"a":req.cookies})
	res.render('uploadimage.hjs');
});

// router.get('/login', function(req, res, next) {
// 	// req.session.a="paridsds";
// 	// console.log(req.session);
// 	// console.log("dsfgdsgfsgfurgsirsiuuierwtiuerw");
// 	// res.render('home');
// 	console.log("dfhdshfdhudfhguhdfghdfghudfhguidfguid")
	
// });





var mailOptions = {
    from: 'Fred Foo ✔ <pari30989@gmail.com>', // sender address
    to: 'jarngalr@gmail.com,pari30989@gmail.com', // list of receivers
    subject: 'Ban gyi email ', // Subject line
    text: 'Yipppeeeeeeee', // plaintext body
    html: '<b>Hey tingoo</b>' // html body
};

/*Home page */
router.get('/send', function(req, res, next) {
	console.log(nodemailer);
	nodemailer.sendEmail(mailOptions);
});

//Formidable
// var formidable = require('formidable');
// router.get('/contest/vacation-photo', function(req, res) {
//     var now = new Date();
//     res.render('contest/vacation-photo', {
//         year: now.getFullYear(),
//         month: now.getMont()
//     });
// });

// router.post('/contest/vacation-photo/:year/:month', function(req, res) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         if (err) return res.redirect(303, '/error');
//         console.log('received fields:');
//         console.log(fields);
//         console.log('received files:');
//         console.log(files);
//         res.redirect(303, '/signup1');
//     });
// });

//TESTING
// router.use(function(req,res,next){
// 		console.log("QWERTYUOKHOGHIGIG");
// 		next();
// });




module.exports = router;
