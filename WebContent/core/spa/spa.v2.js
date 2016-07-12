'use strict';

var spa2 = angular.//
module('spa2', [ "ngResource", "ui", "ui.router" ]).//
config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/content");

	$stateProvider.state('content', {
		// abstract : true,
		url : "/content",
		templateUrl : "app/template/content.html",
	});

});