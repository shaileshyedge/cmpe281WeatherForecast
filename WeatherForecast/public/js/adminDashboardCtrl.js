var app = angular.module('app', ["ngRoute"]);



app.config([ '$routeProvider', function($routeProvider) {
	console.log("trying to route");
	$routeProvider.when('/addSensor', {
		controller : 'addSensorCtrl',
		templateUrl : 'templates/addSensor.ejs'
	}).when('/manageSensor', {
		controller : 'manageSensorCtrl',
		templateUrl : 'templates/manageSensor.ejs'
	}).when('/userlist', {
		controller : 'userlistCtrl',
		templateUrl : 'templates/userList.ejs'
	}).when('/manageSensorHub', {
		controller : 'manageHubCtrl',
		templateUrl : 'templates/manageHub.ejs'
	})
} ]);

app.controller("addSensorCtrl", function($scope, $http)
{
	console.log("Inside Add sensor Controller");
	
	$scope.addSensor= function(){
	console.log("sensorName is: "+$scope.sensorName);
	console.log("describe the sensor: "+$scope.description);
	console.log("active / inactive status: "+$scope.activate);
	
	$http({
    	method : "POST",
    	url : "/addNewSensor",
    	data : {
			"sensorName" : $scope.sensorName,
			"description" : $scope.description,
			"sensorType" : $scope.sensorType,
			"activate" : $scope.activate,
			"location" : $scope.location
    			}
    	}).success(function (res){
    		if(res)
    		{ 
    			console.log("successfully added the sensor into the sensor network");
    			if(res.sensorStatus.nModified == 1)
    				{
    			$("#success-alert1").show();
	            $("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
    				}
    			else{
    				$("#success-alert2").show();
    	            $("#success-alert2").fadeTo(2000, 1000).slideUp(1000, function(){
    	            });
    			}
            }
    	}).error(function (res){
    		console.log("error while adding a sensor");
    		$("#failure-alert").show();
            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
            });
    	});
	}
	
});

app.controller("manageSensorCtrl", function($scope, $http, $routeParams) {
	console.log("inside Sensor manager controller");
	
	  $scope.update_success = true;
	  $scope.update_failure = true;
	  $scope.sensorsList = {};  
		$scope.getSensorDetails = function() {
			$http({
				method : 'POST',			
				url : '/getSensorDetails',
				data: {}
			}).success(function(data) {
				if(data){
					$scope.sensorsList = data.allSensorList;
					console.log("Success in retrieving the sensor metadata");
					console.log("sensor list is: "+JSON.stringify($scope.sensorsList));
					
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
		
		$scope.deleteSensor = function(sensor) {
			console.log("sensor to be deleted is: "+ sensor.sensorname);	
			console.log("sensor is located in: "+ sensor.location);
			$http({
				method : 'POST',
				url : '/deleteSensor',
				data : {"sensorname" : sensor.sensorname,
						"location" : sensor.location
					   }
			}).success(function(data){
				//if(data.statusCode == 200){
					console.log("sensor delete success ");
					$("#delete-success").show();
		            $("#delete-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				//}
			}).error(function(error){
				console.log("error is: "+error);
				$("#delete-fail").show();
	            $("#delete-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.deactivateSensor = function(sensor) {
			console.log("sensor to be deactivated is: "+ sensor.sensorname);	
			console.log("sensor is in the location: "+ sensor.location);
			$http({
				method : 'POST',
				url : '/deactivateSensor',
				data : {"sensorname" : sensor.sensorname,
						"location" : sensor.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor deactivation success ");
					$("#deactivate-success").show();
		            $("#deactivate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#deactivate-fail").show();
	            $("#deactivate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.activateSensor = function(sensor) {
			console.log("sensor to be activated is: "+ sensor.sensorname);	
			console.log("sensor is located in: "+ sensor.location);
			$http({
				method : 'POST',
				url : '/activateSensor',
				data : {"sensorname" : sensor.sensorname,
						"location" : sensor.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor activation success ");
					$("#activate-success").show();
		            $("#activate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#activate-fail").show();
	            $("#activate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
	});

app.controller("manageHubCtrl", function($scope, $http, $routeParams) {
	console.log("inside Hub  manager controller");
	  $scope.isCollapsed = true;	
	  $scope.update_success = true;
	  $scope.update_failure = true;
	  $scope.hubList = {};  
		$scope.getHubDetails = function() {
			$http({
				method : 'POST',			
				url : '/getHubDetails',
				data: {}
			}).success(function(data) {
				if(data){
					$scope.hubList = data.allHubList;
					console.log("Success in retrieving the Hub metadata");
					console.log("Hub list is: "+JSON.stringify($scope.hubList));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
		
		$scope.deleteHub = function(hub) {
			console.log("Hub to be deleted is: "+ hub.sensorname);	
			console.log("Hub is located in: "+ hub.location);
			$http({
				method : 'POST',
				url : '/deleteHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor delete success ");
					$("#delete-success").show();
		            $("#delete-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#delete-fail").show();
	            $("#delete-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.deactivateHub = function(hub) {
			console.log("Hub to be deactivated is: "+ hub.hubName);	
			console.log("Hub is in the locattion: "+ hub.location);
			$http({
				method : 'POST',
				url : '/deactivateHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("Hub deactivation success ");
					$("#deactivate-success").show();
		            $("#deactivate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#deactivate-fail").show();
	            $("#deactivate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.activateHub = function(hub) {
			console.log("Hub to be activated is: "+ hub.hubName);	
			console.log("Hub is located in: "+ hub.location);
			$http({
				method : 'POST',
				url : '/activateHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor activation success ");
					$("#activate-success").show();
		            $("#activate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#activate-fail").show();
	            $("#activate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
	});


app.controller("userlistCtrl", function($scope, $http, $routeParams) {
	console.log("inside userlist controller");
	
	  $scope.userlist = {};  
		$scope.getUserlist = function() {
			$http({
				method : 'POST',			
				url : '/getUserlist',
				data: {}
			}).success(function(data) {
				if(data){
					console.log("users list is: "+JSON.stringify(data));
					$scope.userlist = data.allUserlist;
					console.log("Success in retrieving the sensor metadata");
					console.log("users list is: "+JSON.stringify($scope.userlist));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
});


