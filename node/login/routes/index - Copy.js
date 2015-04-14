var express = require('express');
var router = express.Router();
var db = require("../database/database.js");
var nodemailer = require("./nodemailer.js");
var userInfo;

/* GET home page. */
router.post('/login', function(req, res, next) {
	var key ={"email":req.body.email,"password":req.body.password};
	db.validateUserInfo(key,function(result){
		userInfo = result;
		if (userInfo!==null) {
			console.log("success");
			res.render("home");
		}
		else {
			res.send({"error":"No Records Found"})
		}
	});


}, function (req, res, next) {
	console.log("dfhdshfdshf")
	res.render('home');
});



/* Sign up and get Home page */
router.post('/signup', function(req, res, next) {
	var key ={"firstname":req.body.firstName, "lastname":req.body.lastName, "username":req.body.userName, "password":req.body.password};
	db.addNewUser(key,function(result){
		if (result!==null) {
			next();
		}
	});
}, function (req, res, next) {
	res.render('home');
});

/* Sign up and get Home page */
router.get('/signup1', function(req, res, next) {
	console.log("dsfgdsgfsgfurgsirsiuuierwtiuerw");
	res.render('home');
});


router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


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


var formidable = require('formidable');
router.get('/contest/vacation-photo', function(req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(),
        month: now.getMont()
    });
});

router.post('/contest/vacation-photo/:year/:month', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/signup1');
    });
});

//TESTING
// router.use(function(req,res,next){
// 		console.log("QWERTYUOKHOGHIGIG");
// 		next();
// });




module.exports = router;



// var express = require('express');
// var router = express.Router();


// var router = require('express')();
// router.use(function(req, res, next) {
//     console.log('\n\nALLWAYS');
//     next();
// });
// router.get('/login', function(req, res, next) {
//     console.log('/a: route terminated');
//     // res.send('a');
//     next();
// });
// router.get('/login', function(req, res,next) {
//     console.log('/a: never called');
//     next();
// });
// router.get('/signup', function(req, res, next) {
//     console.log('/b: route not terminated');
//     next();
// });
// router.use(function(req, res, next) {
//     console.log('SOMETIMES');
//     next();
// });
// router.get('/signup', function(req, res, next) {
//     console.log('/b (part 2): error thrown');
//     throw new Error('b failed');
// });

// router.use('/signup', function(err, req, res, next) {
//     console.log('/b error detected and passed on');
//     next(err);
// });
// router.get('/c', function(err, req) {
//     console.log('/c: error thrown');
//     throw new Error('c failed');
// });
// router.use('/c', function(err, req, res, next) {
//     console.log('/c: error deteccted but not passed on');
//     next();
// });
// router.use(function(err, req, res, next) {
//     console.log('unhandled error detected: ' + err.message);
//     res.send('500 - server error');
// });
// router.use(function(req, res) {
//     console.log('route not handled');
//     res.send('404 - not found');
// });



// module.exports = router;