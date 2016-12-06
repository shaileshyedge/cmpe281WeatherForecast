var app = angular.module('app', [ "ngRoute", "highcharts-ng" ]);

/*
 * app.config([ '$routeProvider', function($routeProvider) {
 * $routeProvider.when('/requestWater', { controller : 'requestWaterCtrl',
 * templateUrl : 'templates/requestWaterQuality.ejs' }).when('/billing', {
 * controller : 'billingCtrl', templateUrl : '/templates/billing.ejs'
 * }).when('/yearly', { controller : 'yearlyctrl', templateUrl :
 * '/templates/yearlyanalysis.ejs' }) } ]);
 */

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/requestWater', {
		controller : 'requestWaterCtrl',
		templateUrl : 'templates/requestWaterQuality.ejs'
	})
} ]);


app.controller("locateSensorCtrl", function($scope, $http) {
	console.log("Inside locateSensor Controller");
	alert("ssssss");

	$scope.generateBill = function(req, res) {

		window.location.assign("/billing");
	}






	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}

});

app.controller("billingCtrl", function($scope, $http, $window) {
	console.log("Inside billing Controller");
	alert("Billsss")
	$scope.billDetails = {};
	
	$scope.billData = function(){
		$http({
			method: 'POST',
			url: '/getBillList',
			data: {}
		}).success(function(data){
			if(data)
				{   alert(data.totalBill);
					console.log("Bill List is :" + JSON.stringify(data));
					$scope.billDetails = data.response.usersdata;
					$scope.bill = data.response.totalBill;
					//console.log("bill amount is : " + $scope.bill);
					console.log("Success");
				}
		}).error(function(err){
			console.log(err);
		});
	}
	
	$scope.paymentInvoice = function(){
		$http({
			method: 'POST',
			url: '/resetBill',
			data: {}
		}).success(function(data){
			if(data)
				{
					console.log("Bill is reset"+JSON.stringify(data));
					console.log("Bill payment successful");
	    			$("#success-alert1").show();
		            $("#success-alert1").fadeTo("slow", 2000).slideUp("slow", function(){
		            });
					//$window.alert("Successfully paid the bill.Thanks for using our application");
					window.location.assign("/billing");
				}
			else{
				console.log("error while paying the bill");
	    		$("#failure-alert").show();
	            $("#failure-alert").fadeTo("slow", 2000).slideUp("slow", function(){
	            });
			}
		}).error(function(err){
			console.log(err);
		});
		
	}

	$scope.generateBill = function(req, res) {
	
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}
	
});


app.controller("requestWaterCtrl", function($scope, $http) {	
	$scope.generateBill = function(req, res) {
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}
	
	console.log("Inside Request Water Controller");
	$scope.update = function(){
	console.log("item changed is: "+ $scope.location);
	$scope.formDetails = {};  
	$http({
		 	method : "POST",
		    url : "/getDropDownDetails",
		    data : {
			"location" : $scope.location
				    }
		    	}).success(function (res){
		    		if(res)
		    		{ 
		    			console.log("success!!! :D");
		    			console.log("Data retrieved is: "+ JSON.stringify(res.schools));
		    			$scope.formDetails = res.schools;
		            }
		    	}).error(function (res){
		    		console.log("error :'( ");
		    		
		    	});
			}

	$scope.submit = function (){
		
			var date1 = JSON.stringify($scope.date1);
			var date2 = JSON.stringify($scope.date2);
			var location = $scope.location;
			var sensorname = $scope.sensor1;
			console.log("item changed in first select it: "+ $scope.location);
			console.log("item changed in second select it: "+ $scope.sensor1);
			console.log("item changed in Date1: "+ date1);
			console.log("item changed in Date2: "+ date2);
		alert("Called");

	$http({
		method : "POST",
		url : '/getSensorData',
		data : {
					"location":    "San Francisco",
					"sensorname":  "SPC Infotech",
					"fromDate" : date1,
					"toDate" : date2
			   }
	}).success(function(data) {
		if(data) {
			alert(data.data);
			$scope.tuitionjson = data.data;
			console.log("Output is" + JSON.stringify($scope.tuitionjson));
			console.log("Success");
			
			//Highcharts Initiating part
			$scope.highchartsNG = {
					options : {
						chart : {
							type : 'line',
							events : {
								redraw : function() {
								}

							}
						}
					},
					series : [ {
						color : $scope.barcolor,
						data : []
					} ],
					title : {
						text : sensorname
							},
							
							 plotOptions: {
			                        spline: {
			                            turboThreshold: 998,
			                            lineWidth: 2,
			                            states: {
			                                hover: {
			                                    enabled: true,
			                                    lineWidth: 3
			                                }
			                            }
			                        }
							 },
							
					xAxis : {
						title : {
							text : 'Time'
						},
						categories : []
					},
					yAxix : {

					},
					loading : false
				}
			var data2 = [];
			console.log("Loc1");
				angular.forEach($scope.tuitionjson, function(item) {
					console.log("BEFORE ITEM LIST");
					console.log("Items list " + JSON.stringify(item));
					data2.push([item.date, item.humidity]);

				});
			$scope.highchartsNG.series[0].data = data2;
			console.log("Loc2");
				$scope.xSeriesArray = [];
				angular.forEach($scope.tuitionjson, function(item) {
					console.log("Item: " + JSON.stringify(item));
					$scope.xSeriesArray.push(item[sensorname])
				})
				//$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
				$scope.barcolor = '#166D9C';
				//$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
		}
	}).error(function(error) {
		console.log("error :(");
	});
}
});

app.controller("getDataFromURlCtrl", function($scope, $http) {
	$scope.submit=function()
	{
		var location = $scope.location;
		var sensorName = $scope.sensorName;
	
	$http({
	 	method : "POST",
	    url : "/getDropDownDetails",
	    data : {
		"location" : $scope.location
			    }
	    	}).success(function (res){
	    		if(res)
	    		{ 
	    			console.log("success!!! :D");
	    			console.log("Data retrieved is: "+ JSON.stringify(res.schools));
	    			$scope.formDetails = res.schools;
	            }
	    	}).error(function (res){
	    		console.log("error :'( ");
	    		
	    	});
	}
});

