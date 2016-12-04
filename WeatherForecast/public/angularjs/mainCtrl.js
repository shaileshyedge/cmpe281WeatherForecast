var sensorApp= angular.module('sensorApp',[]);
 sensorApp.controller('mainPageCtrl', function($scope, $http, $location) {
 $scope.signup=function(){	
	 console.log("inside mainpage ctrl --inside signup controller");
      		window.location.assign("/signup");
    };   
    
    $scope.login=function(){	
   	 console.log("inside mainpage ctrl --login controller");
     window.location.assign("/login");
    }; 
    
       
      $scope.index=function(){	
    	  console.log("inside mainpage ctrl --home controller");
    	  window.location.assign("/home");
    };
   
    $scope.addUser = function(){
    	console.log("inside mainpage ctrl -- sign up of a user");
    	console.log("email is: "+$scope.email);
    	console.log("password is: "+$scope.password);
    	$http({
    		method : "POST",
    		url : "/addUser",
    		data : {
    			"firstname" : $scope.firstname,
    			"lastname" : $scope.lastname,
    			"password" : $scope.password,
    			"cpswd" : $scope.cpswd,
    			"email" : $scope.email,
    			"phone" : $scope.phone,
    			"address" : $scope.address,
    			"state" : $scope.state,
    			"country" : $scope.country,
    			"city" : $scope.city,
    			"gender" : $scope.gender
    		}
    	}).success(function (res){
    		if(res.statusCode == 200)
    		{ 
    			console.log("successfully signed up");
    			$("#success-alert1").show();
	            $("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
	            window.location.assign("/login");
	            });
    		  		
    		}
    		}).error(function (res){
    		console.log("error while sign up");
    	});
    };
    
    $scope.userLogin = function(){
    	console.log("inside mainpage ctrl -- login of a user");
    	console.log("email is: "+$scope.email);
    	console.log("password is: "+$scope.password);
    	$http({
    		method : "POST",
    		url : "/userLogin",
    		data : {
    			"password" : $scope.password,
    			"email" : $scope.email,
    			"login" : $scope.login
    			}
    	}).success(function (res) {
    		console.log("The return value: "+JSON.stringify(res));
    		if(res)
    		{ 
    			console.log("successfully loggedin");
    			var data = res.data;
    			console.log("Data is :"+JSON.stringify(data));
    			console.log("flag is: "+ data.flag);
    			$scope.firstname = data.firstname;
				$scope.lastname = data.lastname;
				console.log("first name is: "+$scope.firstname);
				console.log("last name is: "+$scope.lastname);
    			if(data.flag == 0)
    				
    			//$("#success-alert1").show();
	            //$("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
	            window.location.assign("/userDashboard");
    			
    			else
    				window.location.assign("/adminDashboard");
	            //});
    		  		
    		}
    		else
    		{
    			console.log("Auhentication failure after success");
    		}
    		
    		}).error(function (error){
    		console.log("error while login: " +error);
    	});
    };
    
    
});
