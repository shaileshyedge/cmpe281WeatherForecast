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

	 $scope.signUpUser = function(){
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
			 else
			 {
				 alert("User Already Exists");
			 }
		 }).error(function (res){
			 alert("Error while Sign Up: Please try again Later");
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
    			"email" : $scope.email
    			}
    	}).success(function (res) {
    		console.log("The return value: "+JSON.stringify(res));
    		if(res)
    		{   if(res.statuscode == 200) {
				var data = res.data;
				console.log("Data is :" + JSON.stringify(data));
				console.log("flag is: " + data.isAdmin);
				$scope.firstname = data.firstname;
				$scope.lastname = data.lastname;
				console.log("first name is: " + $scope.firstname);
				console.log("last name is: " + $scope.lastname);
				if (data.isAdmin == 0) {
					window.location.assign("/userDashboard");
				}
				else {
					window.location.assign("/adminDashboard");
				}

			}
				else
			{
				alert("Invalid Login Credentials: Please try again");
			}
	            //});
    		  		
    		}
    		else
    		{    alert("Auth FAILURE");
    			console.log("Authentication failure after success");
    		}
    		
    		}).error(function (error){
    		console.log("error while login: " +error);
    	});
    };
    
    
});
