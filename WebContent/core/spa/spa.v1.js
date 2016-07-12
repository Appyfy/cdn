'use strict';

angular.module('spa', [ 'ngRoute', 'ngResource', 'ui' ]).//
config([ '$resourceProvider', '$routeProvider',//
function($resourceProvider, $routeProvider) {

	$routeProvider.

	when('/home', {
		templateUrl : 'lib/spa/template/home.html',
		controller : 'HomeCtrl'
	}).//

	when('/visualize', {
		templateUrl : 'app/template/visualize/dashboard.html',
		controller : 'DashboardCtrl'
	}).//

	when('/about', {
		templateUrl : 'lib/spa/template/about.html',
		controller : function() {
		}
	}).

	otherwise({
		redirectTo : '/home'
	});

} ]);