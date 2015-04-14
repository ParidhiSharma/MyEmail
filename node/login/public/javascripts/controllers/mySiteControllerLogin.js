myApp.controller("mySiteControllerLogin",function($scope, $http){
		$scope.validateLogin = function(){
			var data ={"username":$scope.userName,"password":$scope.password};
			$http({
			    method: 'GET',
			    url: 'http://localhost:3000/html',
			    data: data
			}).
			success(function(data,status){

			}).
			error(function(){

			})
		}
});
