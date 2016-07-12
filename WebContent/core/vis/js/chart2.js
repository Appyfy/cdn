app.controller('Chart2Ctrl', function($element, $resource, $rootScope, $scope) {

	$scope.drawChart = function(spec) {

		plotChart('/metadata/store/admin/vis/', spec , spec);

	};
});