/**
 * http://usejsdoc.org/
 */
var appVar = angular.module('app', [ "ngRoute", "highcharts-ng" ]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		controller : 'ctrl1',
		templateUrl : 'templates/stats.ejs'
	}).when('/prediction', {
		controller : 'baysianCtrl',
		templateUrl : '/templates/baysian.ejs'
	}).when('/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/templates/yearlyanalysis.ejs'
	}).when('/maps#/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/home.ejs'
	})

} ]);

appVar.controller("ctrl1", function($scope, $http) {

	$http({
		method : "POST",
		url : '/getData',
		data : {}
	}).success(function(data) {
		if (data.statusCode == 401) {
			console.log("error");
		} else {
			$scope.tuitionjson = data.schools;
			console.log("Output is" + JSON.stringify($scope.tuitionjson));
			console.log("Success");
		}
	}).error(function(error) {
		console.log("error");
	});

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
			text : 'Air Temperature'
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

	angular.forEach($scope.tuitionjson, function(item) {
		console.log("Items list "+JSON.stringify(item));
		$scope.highchartsNG.xAxis.categories.push(item.time);
	})

	$scope.xSeriesArray = [];
	angular.forEach($scope.tuitionjson, function(item) {
		console.log(item);
		$scope.xSeriesArray.push(item.air_temperature)
	})
	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

	$scope.barcolor = '#166D9C';

	$scope.selectedItemChanged = function() {

		console.log($scope.selection);
		if ($scope.selection == 'Tuition Fees') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.air_temperature)
			})
			$scope.barcolor = '#166D9C';

		} else if ($scope.selection == 'Earnings') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.earn)
			})
			$scope.barcolor = '#1F9C16'

		} else if ($scope.selection == 'Completion Rate') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.Comp)
			})
			$scope.barcolor = '#8B9C16'
		}
		$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

		// $scope.highchartsNG.options.chart.redraw();
	}

	$scope.redirect = function() {
		window.location = "#/baysian.ejs";
	}

});


appVar.controller('yearlyctrl', function($scope, $http) {
	$scope.collegeNames = [];
	 $scope.yearly = [{
			"array": [
			      	[

			      		{
			      			"year": 2011,
			      			"cost": 7820,
			      			"earn": 43000,
			      			"Comp": 0.7797,
			      			"MALE_RPY_1YR_RT": 0.93679,
			      			"name": "Brigham Young University-Provo"
			      		}, {
			      			"year": 2012,
			      			"cost": 7880,
			      			"earn": 44300,
			      			"Comp": 0.7797,
			      			"MALE_RPY_1YR_RT": 0.93679,
			      			"name": "Brigham Young University-Provo"
			      		}, {
			      			"year": 2013,
			      			"cost": 7900,
			      			"earn": 44000,
			      			"Comp": 0.7797,
			      			"MALE_RPY_1YR_RT": 0.93679,
			      			"name": "Brigham Young University-Provo"
			      		}, {
			      			"year": 2014,
			      			"cost": 7911,
			      			"earn": 44900,
			      			"Comp": 0.7797,
			      			"MALE_RPY_1YR_RT": 0.93679,
			      			"name": "Brigham Young University-Provo"
			      		}
			      	],
			      	[
			      		{
			      			 "year": 2011,
			      			 "cost": 4260,
			          		 "earn": 32400,
			          		 "Comp": 0.6972,
			                   "MALE_RPY_1YR_RT": 0.933,
			                   "name": "California Polytechnic State University-San Luis Obispo"
			      		}, {
			      			 "year": 2012,
			      			 "cost": 4290,
			          		 "earn": 34400,
			          		 "Comp": 0.6972,
			                   "MALE_RPY_1YR_RT": 0.933,
			                   "name": "California Polytechnic State University-San Luis Obispo"
			      		}, {
			      			 "year": 2013,
			      			 "cost": 4310,
			          		 "earn": 35400,
			          		 "Comp": 0.6972,
			                   "MALE_RPY_1YR_RT": 0.933,
			                   "name": "California Polytechnic State University-San Luis Obispo"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 4360,
			          		 "earn": 35200,
			          		 "Comp": 0.6972,
			                   "MALE_RPY_1YR_RT": 0.933,
			                   "name": "California Polytechnic State University-San Luis Obispo"
			      		}
			      	],
			      	[
			      		{
			      			 "year": 2011,
			      			 "cost": 5250,
			          		 "earn": 39900,
			          		 "Comp": 0.6687,
			          		 "MALE_RPY_1YR_RT": 0.831683,
			          		 "name": "CUNY Bernard M Baruch College"
			      		}, {
			      			 "year": 2012,
			      			 "cost": 5320,
			          		 "earn": 40000,
			          		 "Comp": 0.6687,
			          		 "MALE_RPY_1YR_RT": 0.831683,
			          		 "name": "CUNY Bernard M Baruch College"
			      		}, {
			      			 "year": 2013,
			      			 "cost": 5450,
			          		 "earn": 41100,
			          		 "Comp": 0.6687,
			          		 "MALE_RPY_1YR_RT": 0.831683,
			          		 "name": "CUNY Bernard M Baruch College"
			      		}, {
			      			 "year": 2014,
			      			"cost": 5550,
			          		 "earn": 41100,
			          		 "Comp": 0.6687,
			          		 "MALE_RPY_1YR_RT": 0.831683,
			          		 "name": "CUNY Bernard M Baruch College"
			      		}
			      	],
			      	[
			      		{
			      			 "year": 2011,
			      			 "cost": 7386,
			          		 "earn": 34700,
			          		 "Comp": 0.681,
			          		 "MALE_RPY_1YR_RT": 0.88863,
			          		 "name": "Iowa State University"
			      		}, {
			      			 "year": 2012,
			      			 "cost": 7416,
			          		 "earn": 33700,
			          		 "Comp": 0.681,
			          		 "MALE_RPY_1YR_RT": 0.88863,
			          		 "name": "Iowa State University"
			      		}, {
			      			 "year": 2013,
			      			 "cost": 7486,
			          		 "earn": 34700,
			          		 "Comp": 0.681,
			          		 "MALE_RPY_1YR_RT": 0.88863,
			          		 "name": "Iowa State University"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 7486,
			          		 "earn": 37700,
			          		 "Comp": 0.681,
			          		 "MALE_RPY_1YR_RT": 0.88863,
			          		 "name": "Iowa State University"
			      		}
			      	],
			      	[
			      		{
			      			 "year": 2011,
			      			 "cost": 6397,
			         			 "earn": 61900,
			          		 "Comp": 0.6667,
			          		 "MALE_RPY_1YR_RT": 0.387643,
			          		 "name": "Massachusetts Maritime Academy"
			      		}, {
			      			 "year": 2012,
			      			 "cost": 6447,
			         			 "earn": 62200,
			          		 "Comp": 0.6667,
			          		 "MALE_RPY_1YR_RT": 0.387643,
			          		 "name": "Massachusetts Maritime Academy"
			      		}, {
			      			 "year": 2013,
			      			 "cost": 6447,
			         			 "earn": 62300,
			          		 "Comp": 0.6667,
			          		 "MALE_RPY_1YR_RT": 0.387643,
			          		 "name": "Massachusetts Maritime Academy"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 6867,
			         			 "earn": 62900,
			          		 "Comp": 0.6667,
			          		 "MALE_RPY_1YR_RT": 0.387643,
			          		 "name": "Massachusetts Maritime Academy"
			      		}
			      	],
			      	[
			      		{
			      			 "year": 2011,
			      			 "cost": 6840,
			          		 "earn": 35100,
			          		 "Comp": 0.7359,
			          	     "MALE_RPY_1YR_RT": 0.913169,
			                   "name": "North Carolina State University at Raleigh"
			      		}, {
			      			 "year": 2012,
			      			"cost": 6998,
			          		 "earn": 37100,
			          		 "Comp": 0.7359,
			          	     "MALE_RPY_1YR_RT": 0.913169,
			                   "name": "North Carolina State University at Raleigh"
			      		}, {
			      			 "year": 2013,
			      			"cost": 6998,
			          		 "earn": 36900,
			          		 "Comp": 0.7359,
			          	     "MALE_RPY_1YR_RT": 0.913169,
			                   "name": "North Carolina State University at Raleigh"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 7018,
			          		 "earn": 37200,
			          		 "Comp": 0.7359,
			          	     "MALE_RPY_1YR_RT": 0.913169,
			                   "name": "North Carolina State University at Raleigh"	
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 0,
			          		"earn": 37000,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			"year": 2012,
			      			"cost": 0,
			          		"earn": 37100,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			"year": 2013,
			      			"cost": 0,
			          		"earn": 37200,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 0,
			          		"earn": 37200,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"	
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 0,
			          		"earn": 37000,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			"year": 2012,
			      			"cost": 0,
			          		"earn": 37100,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			"year": 2013,
			      			"cost": 0,
			          		"earn": 37200,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"
			      		}, {
			      			 "year": 2014,
			      			 "cost": 0,
			          		"earn": 37200,
			          		"Comp": 0.6667,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Palmer College of Chiropractic-Davenport"	
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 7232,
			          		"earn": 36500,
			          		"Comp": 0.6681,
			          		"MALE_RPY_1YR_RT": 0.851809,
			          		"name": "Salisbury University"
			      		}, {
			      			"year": 2012,
			      			"cost": 7262,
			          		"earn": 36900,
			          		"Comp": 0.6681,
			          		"MALE_RPY_1YR_RT": 0.851809,
			          		"name": "Salisbury University"
			      		}, {
			      			"year": 2013,
			      			"cost": 7432,
			          		"earn": 37300,
			          		"Comp": 0.6681,
			          		"MALE_RPY_1YR_RT": 0.851809,
			          		"name": "Salisbury University"
			      		}, {
			      			"year": 2014,
			      			"cost": 7332,
			          		"earn": 38500,
			          		"Comp": 0.6681,
			          		"MALE_RPY_1YR_RT": 0.851809,
			          		"name": "Salisbury University"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 6810,
			          		"earn": 38100,
			          		"Comp": 0.6593,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Stony Brook University"
			      		}, {
			      			"year": 2012,
			      			"cost": 6924,
			          		"earn": 38500,
			          		"Comp": 0.6593,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Stony Brook University"
			      		}, {
			      			"year": 2013,
			      			"cost": 6954,
			          		"earn": 39000,
			          		"Comp": 0.6593,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Stony Brook University"
			      		}, {
			      			"year": 2014,
			      			"cost": 6994,
			          		"earn": 39100,
			          		"Comp": 0.6593,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Stony Brook University"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 7090,
			          		"earn": 39040,
			          		"Comp": 0.8077,
			          		"MALE_RPY_1YR_RT": 0.898822,
			          		"name": "SUNY at Binghamton"
			      		}, {
			      			"year": 2012,
			      			"cost": 7130,
			          		"earn": 39540,
			          		"Comp": 0.8077,
			          		"MALE_RPY_1YR_RT": 0.898822,
			          		"name": "SUNY at Binghamton"
			      		}, {
			      			"year": 2013,
			      			"cost": 7216,
			          		"earn": 39940,
			          		"Comp": 0.8077,
			          		"MALE_RPY_1YR_RT": 0.898822,
			          		"name": "SUNY at Binghamton"
			      		}, {
			      			"year": 2014,
			      			"cost": 7216,
			          		"earn": 41000,
			          		"Comp": 0.8077,
			          		"MALE_RPY_1YR_RT": 0.898822,
			          		"name": "SUNY at Binghamton"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 8222,
			          		"earn": 40798,
			          		"Comp": 0.7908,
			          		"MALE_RPY_1YR_RT": 0.906257,
			          		"name": "Texas A & M University-College Station"
			      		}, {
			      			"year": 2012,
			      			"cost": 8222,
			          		"earn": 41000,
			          		"Comp": 0.7908,
			          		"MALE_RPY_1YR_RT": 0.906257,
			          		"name": "Texas A & M University-College Station"
			      		}, {
			      			"year": 2013,
			      			"cost": 8380,
			          		"earn": 41150,
			          		"Comp": 0.7908,
			          		"MALE_RPY_1YR_RT": 0.906257,
			          		"name": "Texas A & M University-College Station"
			      		}, {
			      			"year": 2014,
			      			"cost": 8421,
			          		"earn": 42700,
			          		"Comp": 0.7908,
			          		"MALE_RPY_1YR_RT": 0.906257,
			          		"name": "Texas A & M University-College Station"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 7406,
			          		"earn": 38765,
			          		"Comp": 0.655,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Towson University"
			      		}, {
			      			"year": 2012,
			      			"cost": 7566,
			          		"earn": 39100,
			          		"Comp": 0.655,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Towson University"
			      		}, {
			      			"year": 2013,
			      			"cost": 7696,
			          		"earn": 39600,
			          		"Comp": 0.655,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Towson University"
			      		}, {
			      			"year": 2014,
			      			"cost": 7906,
			          		"earn": 39500,
			          		"Comp": 0.655,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "Towson University"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 0,
			          		"earn": 70100,
			          		"Comp": 0.7365,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "United States Merchant Marine Academy"
			      		}, {
			      			"year": 2012,
			      			"cost": 0,
			          		"earn": 70255,
			          		"Comp": 0.7365,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "United States Merchant Marine Academy"
			      		}, {
			      			"year": 2013,
			      			"cost": 0,
			          		"earn": 70600,
			          		"Comp": 0.7365,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "United States Merchant Marine Academy"
			      		}, {
			      			"year": 2014,
			      			"cost": 0,
			          		"earn": 70600,
			          		"Comp": 0.7365,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "United States Merchant Marine Academy"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 7138,
			          		"earn": 35500,
			          		"Comp": 0.72,
			          		"MALE_RPY_1YR_RT": 0.852499,
			          		"name": "University at Buffalo"
			      		}, {
			      			"year": 2012,
			      			"cost": 7257,
			          		"earn": 36000,
			          		"Comp": 0.72,
			          		"MALE_RPY_1YR_RT": 0.852499,
			          		"name": "University at Buffalo"
			      		}, {
			      			"year": 2013,
			      			"cost": 7372,
			          		"earn": 37200,
			          		"Comp": 0.72,
			          		"MALE_RPY_1YR_RT": 0.852499,
			          		"name": "University at Buffalo"
			      		}, {
			      			"year": 2014,
			      			"cost": 7482,
			          		"earn": 37700,
			          		"Comp": 0.72,
			          		"MALE_RPY_1YR_RT": 0.852499,
			          		"name": "University at Buffalo"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 5657,
			          		"earn": 34420,
			          		"Comp": 0.8654,
			          		"MALE_RPY_1YR_RT": 0.840121,
			          		"name": "University of Florida"
			      		}, {
			      			"year": 2012,
			      			"cost": 5657,
			          		"earn": 35500,
			          		"Comp": 0.8654,
			          		"MALE_RPY_1YR_RT": 0.840121,
			          		"name": "University of Florida"
			      		}, {
			      			"year": 2013,
			      			"cost": 5657,
			          		"earn": 37950,
			          		"Comp": 0.8654,
			          		"MALE_RPY_1YR_RT": 0.840121,
			          		"name": "University of Florida"
			      		}, {
			      			"year": 2014,
			      			"cost": 5657,
			          		"earn": 38500,
			          		"Comp": 0.8654,
			          		"MALE_RPY_1YR_RT": 0.840121,
			          		"name": "University of Florida"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 7465,
			          		"earn": 34170,
			          		"Comp": 0.6962,
			          		"MALE_RPY_1YR_RT": 0.866092,
			          		"name": "University of Iowa"
			      		}, {
			      			"year": 2012,
			      			"cost": 7475,
			          		"earn": 36875,
			          		"Comp": 0.6962,
			          		"MALE_RPY_1YR_RT": 0.866092,
			          		"name": "University of Iowa"
			      		}, {
			      			"year": 2013,
			      			"cost": 7765,
			          		"earn": 37129,
			          		"Comp": 0.6962,
			          		"MALE_RPY_1YR_RT": 0.866092,
			          		"name": "University of Iowa"
			      		}, {
			      			"year": 2014,
			      			"cost": 7765,
			          		"earn": 38100,
			          		"Comp": 0.6962,
			          		"MALE_RPY_1YR_RT": 0.866092,
			          		"name": "University of Iowa"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 6745,
			          		"earn": 36314,
			          		"Comp": 0.9002,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "University of North Carolina at Chapel Hill"
			      		}, {
			      			"year": 2012,
			      			"cost": 6893,
			          		"earn": 36531,
			          		"Comp": 0.9002,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "University of North Carolina at Chapel Hill"
			      		}, {
			      			"year": 2013,
			      			"cost": 6975,
			          		"earn": 37965,
			          		"Comp": 0.9002,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "University of North Carolina at Chapel Hill"
			      		}, {
			      			"year": 2014,
			      			"cost": 7009,
			          		"earn": 38600,
			          		"Comp": 0.9002,
			          		"MALE_RPY_1YR_RT": 0.387643,
			          		"name": "University of North Carolina at Chapel Hill"
			      		}
			      	],
			      	[
			      		{
			      			"year": 2011,
			      			"cost": 8145,
			          		"earn": 34340,
			          		"Comp": 0.6629,
			          		"MALE_RPY_1YR_RT": 0.84478,
			          		"name": "University of Oklahoma-Norman Campus"
			      		}, {
			      			"year": 2012,
			      			"cost": 8216,
			          		"earn": 36532,
			          		"Comp": 0.6629,
			          		"MALE_RPY_1YR_RT": 0.84478,
			          		"name": "University of Oklahoma-Norman Campus"
			      		}, {
			      			"year": 2013,
			      			"cost": 8325,
			          		"earn": 36120,
			          		"Comp": 0.6629,
			          		"MALE_RPY_1YR_RT": 0.84478,
			          		"name": "University of Oklahoma-Norman Campus"
			      		}, {
			      			"year": 2014,
			      			"cost": 8325,
			          		"earn": 37900,
			          		"Comp": 0.6629,
			          		"MALE_RPY_1YR_RT": 0.84478,
			          		"name": "University of Oklahoma-Norman Campus"
			      		}
			      	]

			      	]
			      }];


	$scope.years = [ '2011', '2012', '2013', '2014' ];

	$scope.option = 0;

	for (var i = 0; i < $scope.yearly[0].array.length; i++) {
		var arr = $scope.yearly[0].array[i];
		$scope.collegeNames.push({
			"id" : $scope.option++,
			"name" : arr[0].name
		});
	}
	$scope.collegeName = $scope.collegeNames[0];
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
		tooltip : {
			pointFormat : "Value: {point.y:,.1f} mm"
		},
		series : [ {
			data : [],
			pointStart : Date.UTC(2011, 0, 1),
			pointInterval : 366 * (24 * 3600 * 1000),
			name : 'Years'

		} ],
		title : {
			text : $scope.collegeName
		},
		xAxis : {
			type : 'datetime',
			labels : {
				format : '{value:%Y}'
			},
			title : {
				text : []
			}
		},
		yAxix : {
			cost : [],
			title : {
				text : 'Cost'
			}
		},
		loading : false
	}

	var yeardata = $scope.yearly[0].array[0];
	$scope.xSeriesArray = [];
	for (var i = 0; i < yeardata.length; i++) {
		$scope.xSeriesArray.push(yeardata[i].cost)
	}
	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
	$scope.highchartsNG.xAxis.years = $scope.years;
	$scope.highchartsNG.title.text = $scope.collegeName.name

	$scope.selectedItemChanged = function(selection) {
		$scope.xSeriesArray = [];
		$scope.highchartsNG.series[0].data = [];
		$scope.data = $scope.yearly[0].array[selection];
		for (var i = 0; i < $scope.data.length; i++) {
			$scope.xSeriesArray.push($scope.data[i].earn - $scope.data[i].cost)
		//	$scope.xSeriesArray.push(((($scope.data[i].earn*5) - ($scope.data[i].cost))/($scope.data[i].cost))*100)
		}
		$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
		$scope.highchartsNG.title.text = $scope.collegeNames[selection].name
	}

});

appVar.controller('decisionCtrl', function($scope) {

	$scope.decision = [ {
		"name" : "Queens",
		"cost" : "high",
		"MALE_RPY" : "No",
		"earn" : "high",
		"comp" : "high"
	} ];

	$scope.print1 = ""

	$scope.jsondata = [ ({
		'cost' : {
			'average' : {
				'earn' : {
					'low' : 'no',
					'high' : 'yes'
				}
			},
			'low' : 'yes',
			'high' : 'no'
		}
	}) ];
	angular.toJson($scope.jsondata);
	angular.forEach($scope.jsondata, function(item) {

		angular.forEach(item.cost, function(item) {
			console.log(item)
			// if(angular.isObject($scope.jsondata[0].cost.average))
			// {
			// if(angular.isObject($scope.jsondata[0].cost.average.earn))
			// {
			// console.log("cost->average->earn->low->"+$scope.jsondata[0].cost.average.earn.low)
			// console.log("cost->average->earn->high->"+$scope.jsondata[0].cost.average.earn.high)
			// }
			// }
			// else
			// {
			// console.log("cost->average->"+$scope.jsondata[0].cost.average)
			// }
		})

	})

})
