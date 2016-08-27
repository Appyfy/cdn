document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	console.log("device is ready");
}

function DeviceCtrl($rootScope) {

	// Bar code
	$rootScope.scan = function(target) {
		cordova.plugins.barcodeScanner.scan(function(value) {
			$rootScope.data[target] = value.text;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	// Location
	$rootScope.getCurrentLocation = function(lat, long, alt) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$rootScope.data[lat] = //'Lat: ' + 
				position.coords.latitude;
			$rootScope.data[long] = //'Long: ' + 
				position.coords.longitude;
			$rootScope.data[alt] = //'Alt: ' + 
				position.coords.altitude;
			/*
			 * alert('Latitude: ' + position.coords.latitude + '\n' +
			 * 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' +
			 * position.coords.altitude + '\n' + 'Accuracy: ' +
			 * position.coords.accuracy + '\n' + 'Altitude Accuracy: ' +
			 * position.coords.altitudeAccuracy + '\n' + 'Heading: ' +
			 * position.coords.heading + '\n' + 'Speed: ' +
			 * position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp +
			 * '\n');
			 */
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			maximumAge : 1000,
			enableHighAccuracy : true
		});
	};

	$rootScope.watchPosition = function(lat, long, alt) {
		navigator.geolocation.watchPosition(function(position) {
			$rootScope.data[lat] = //'Lat: ' + 
				position.coords.latitude;
			$rootScope.data[long] = //'Long: ' + 
				position.coords.longitude;
			$rootScope.data[alt] = //'Alt: ' + 
				position.coords.altitude;
			$rootScope.$apply();
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			maximumAge : 1000,
			enableHighAccuracy : true
		});
	};

	// Acceleration
	$rootScope.getCurrentAcceleration = function(x, y, z) {
		navigator.accelerometer.getCurrentAcceleration(function(acceleration) {
			$rootScope.data[x] = //'X: ' + 
				acceleration.x;
			$rootScope.data[y] = //'Y: ' + 
				acceleration.y;
			$rootScope.data[z] = //'Z: ' + 
				acceleration.z;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};
	
	function doubleToInt(double) {
		if(!double) {
			return 0;
		}
		double = "" + double;
		return parseInt(double.substring(0, double.indexOf('.')));
	}

	$rootScope.watchAcceleration = function(x, y, z) {

//		navigator.accelerometer.watchAcceleration(function(acceleration) {
//			$rootScope.data[x] = 'X: ' + acceleration.x;
//			$rootScope.data[y] = 'Y: ' + acceleration.y;
//			$rootScope.data[z] = 'Z: ' + acceleration.z;
//			$rootScope.$apply();
//		}, function(error) {
//			alert('Error Occured' + error);
//		}, {
//			period : 100
//		});
		
		$rootScope.data['dx'] = [];
		$rootScope.data['dy'] = [];
		$rootScope.data['dz'] = [];

		createTable('shock', 'timeOfEvent TEXT, lat TEXT, long TEXT, alpha TEXT, beta TEXT, gamma TEXT');
		
		window.addEventListener('deviceorientation', function(eventData) {

			var idle = true;

			// alpha is the compass direction the device is facing in degrees
			var dir = doubleToInt(eventData.alpha);
			var dX = $rootScope.data[x] - dir;
			$rootScope.data[x] = dir;

			if (dX > 10) {
				$rootScope.data['dx'].push(dX);
				idle = false;
			}
			
			// beta is the front-to-back tilt in degrees, where front is positive
			var tiltFB = doubleToInt(eventData.beta);
			var dY = $rootScope.data[y] - tiltFB;
			$rootScope.data[y] = tiltFB;

			if (dY > 10) {
				$rootScope.data['dy'].push(dY);
				idle = false;
			}

			// gamma is the left-to-right tilt in degrees, where right is positive
			var tiltLR = doubleToInt(eventData.gamma);
			var dZ = $rootScope.data[z] - tiltLR;
			$rootScope.data[z] = tiltLR;

			if (dZ > 10) {
				$rootScope.data['dz'].push(dZ);
				idle = false;
			}

			if(idle == false){
				$rootScope.data['idle'] = 0;
			} else {
				$rootScope.data['idle'] = $rootScope.data['idle'] + 1;
			}
						 
			if ($rootScope.data['idle'] > 25) {
				
				$rootScope.data['idle'] = 0;

				if($rootScope.data['dx'].length > 0 ||
						$rootScope.data['dy'].length > 0 ||
						$rootScope.data['dz'].length > 0 ) {
					
				saveRow("shock", { 
						"timeOfEvent"  : eventData.timeStamp, 
						"lat"   : $rootScope.data['lat'], 
						"long"  : $rootScope.data['long'], 
						"alpha" : JSON.stringify($rootScope.data['dx']),
						"beta" : JSON.stringify($rootScope.data['dy']),
						"gamma" : JSON.stringify($rootScope.data['dz'])
						});
				
				$rootScope.data['dx'] = []; // $rootScope.data['dx'].splice(5);
				$rootScope.data['dy'] = [];
				$rootScope.data['dz'] = []; 
				
				}
			}

			$rootScope.$apply();
		
		 }, false);
	};

	// Motion
	$rootScope.getCurrentHeading = function(heading) {
		navigator.accelerometer.getCurrentHeading(function(compass) {
			$rootScope.data[heading] = 'Heading: ' + compass.magneticHeading;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	$rootScope.watchHeading = function(heading) {
		navigator.compass.watchHeading(function(compass) {
			$rootScope.data[heading] = 'Heading: ' + compass.magneticHeading;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	// Camera
	$rootScope.getPicture = function(img) {
		navigator.camera.getPicture(function(imageURI) {
			var image = document.getElementById(img);
			image.src = imageURI;
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI
		});

	};
	
	// Auth
	
	$rootScope.login = function() {
		window.plugins.googleplus.login( {
			      'scopes': 'profile email', // optional space-separated list of scopes, the default is sufficient for login and basic profile info 
			      'offline': true, // optional, used for Android only - if set to true the plugin will also return the OAuth access token ('oauthToken' param), that can be used to sign in to some third party services that don't accept a Cross-client identity token (ex. Firebase) 
			      'webApiKey': 'api of web app', // optional API key of your Web application from Credentials settings of your project - if you set it the returned idToken will allow sign in to services like Azure Mobile Services 
			      // there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4) 
			    },
			    function (obj) {
			      alert(JSON.stringify(obj)); // do something useful instead of alerting 
			    },
			    function (msg) {
			      alert('error: ' + msg);
			    }
		);
	};
	
	$rootScope.logout = function(img) {
		window.plugins.googleplus.logout(
		    function (msg) {
		      alert(msg); // do something useful instead of alerting 
		    }
		);
	};
}