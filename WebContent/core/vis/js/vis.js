function fetchSpec(specPath, specName, afterFetch) {

	var uri = specPath + specName + '.json';

	d3.xhr(uri, function(response) {
		afterFetch(response);
	});

}

function plotVega(vgspec, elem) {

	vg.parse.spec(vgspec, function(chart) {

		var view = chart({
			el : "#" + elem,
			renderer : 'svg'
		});

		view.update();
	});

}

function plotVegaChart(specPath, specName, elem) {

	fetchSpec(specPath, specName, function(response) {
		var vgspec = JSON.parse(response.responseText);
		plotVega(vgspec, elem);
	});

}

function plotChart(specPath, specName, elem) {
	plotCharts(specPath, [ specName ], elem);
}

function plotCharts(specPath, specNames, elem) {

	d3.select("#" + elem).selectAll("*").remove();

	for (var i = 0; i < specNames.length; i++) {
		plotVegaChart(specPath, specNames[i], elem);
	}

}