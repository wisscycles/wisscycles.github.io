var App = window.App || {

	beacon: $('.beacon').css('width'),

	// Store the beacon Value
	lastBeacon: this.beacon,

	init: function () {
		// Fire the initial functions for first screen size
		this.getBeacon(this.beacon);
	},

	resize: function () {
		var newBeacon = $('.beacon').css('width');

		// If the screen size has changed fire the functions for the new screen size
		if (this.lastBeacon !== newBeacon) {
			this.lastBeacon = newBeacon;
			this.getBeacon(newBeacon);
		}
	},

	getBeacon: function(beacon) {
		switch(beacon) {
		case "768px":
			this.setHeights();
			break;
		case "1024px":
			this.setHeights();
			break;
		default:
			console.log('Error: No beacon match found');
		}
	},

	setHeights: function() {
		var $mainHeight = $('#main').height(),
			$sidebarHeight = $('#sidebar').height(),
			$pageWrapper = $('#page-wrapper');

		if ($mainHeight > $sidebarHeight) {
			$pageWrapper.css('min-height', $mainHeight + 'px')
		}
	}

};

$().ready(function () {
	App.init();
	App.setHeights();

	var newDate = new Date(),
		currentDay = newDate.getDay(),
		currentHours = newDate.getHours(),
		currentMinutes = newDate.getMinutes(),
		currentTime = currentHours + ':' + currentMinutes,
		storeHours = [
			'Closed',
			'10am - 6pm',
			'10am - 6pm',
			'10am - 8pm',
			'10am - 6pm',
			'10am - 6pm',
			'10am - 5pm'
		],
		closingTime = [
			'00:00',
			'18:00',
			'18:00',
			'20:00',
			'18:00',
			'18:00',
			'17:00'
		]

	console.log(currentTime);

	$('#hours').html(storeHours[currentDay]);

	if (currentHours < 10) {
		$('#status').html('closed');
	} else if (closingTime[currentDay] <= currentTime) {
		$('#status').html('closed');
	} else {
		$('#status').html('open');
	}

	if (currentDay === 0) {
		$('#current-status').hide();
		currentDay === 7;
	}

	$('.hours-list--day:nth-of-type(' + (currentDay) + ')').addClass('current');
	$('.hours-list--hours:nth-of-type(' + (currentDay) + ')').addClass('current');
});

$(window).resize(function () {
	App.resize();
});