var myApp = angular.module("MySite", [ 'ui.router']);

myApp.paths = {
    views: '../views/'
};

myApp.constant('VIEWS', myApp.paths.views);

myApp.config(['$stateProvider', '$urlRouterProvider','VIEWS',function ($stateProvider, $urlRouterProvider ,VIEWS) {
	
	$stateProvider
		.state("signup",{
			url:"/signup",
			// views: {
		 //        "A": { templateUrl: "home-detail.html" },
		 //        "B": { templateUrl: "about-detail.html" }
		 //    },
			templateUrl: VIEWS+"signup.hjs",
			controller : "mySiteControllerSignup"
		})

		.state("login",{
			url:"/login",
			// views: {
		 //        "A": { templateUrl: "home-detail.html" },
		 //        "B": { templateUrl: "about-detail.html" }
		 //    },
			templateUrl:VIEWS+"login.hjs",
			controller : "mySiteControllerLogin"
		})

		.state("uploadimage",{
			url:"/uploadimage",
			// views: {
		 //        "A": { templateUrl: "home-detail.html" },
		 //        "B": { templateUrl: "about-detail.html" }
		 //    },
			templateUrl:VIEWS+"uploadimage.hjs",
			controller : "mySiteControllerLogin"
		})

		.state("welcome",{
			url:"/welcome",
			// templateUrl:"about-detail.html",
			// controller : "aboutDetail"
			templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 1000);
            }]
		})
}])

myApp.controller("mySiteControllerLogin",function($scope, $http ,$state){
	$state.go("login");
	$scope.noRecordFound = true;
	$scope.validateLogin = function(){
		var data ={"email":$scope.email,"password":$scope.password,"state":"login"};
		$http({
		    method: 'POST',
		    url: 'http://192.168.1.146:3001/login',
		    data: data
		}).
		success(function(data,status){
			// if (data.error=="No Records Found") {             //Not working. Check why
			// 	$scope.apply(function(){     
			// 		$scope.noRecordFound = false;
			// 	})
			// }
		}).
		error(function(){
		})
	}
});


myApp.controller("mySiteControllerHome",function($scope, $http ,$state){
	// $state.go("home");
	$scope.logout = function(){
		var data = {"state":"logout"}
		$http({
		    method: 'POST',
		    url: 'http://192.168.1.146:3001/login',
		    data : data
		}).
		success(function(data,status){
			
		}).
		error(function(){
		})
	}
});

myApp.controller("mySiteControllerSignup",function($scope, $http ,$state){
	$scope.submitForm = function(){
		var data ={"firstName":$scope.firstName,"lastName":$scope.lastName,"userName":$scope.userName,"password":$scope.password};
		$http({
		    method: 'POST',
		    url: 'http://192.168.1.146:3001/signup',
		    data: data
		}).
		success(function(data,status){

		}).
		error(function(err){

		})
	};

});