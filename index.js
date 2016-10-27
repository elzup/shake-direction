'use strict';

export default class ShakeDirection {
	constructor(options) {
		// feature detect
		this.hasDeviceMotion = 'ondevicemotion' in window;

		this.options = {
			threshold: 15, // default velocity threshold for shake to register
			timeout: 1000 // default interval between events
		};

		if (typeof options === 'object') {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					this.options[i] = options[i];
				}
			}
		}

		// use date to prevent multiple shakes firing
		this.lastTime = new Date();

		// accelerometer values
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;
		this.eventNames = [
			'shake-x-positive',
			'shake-x-negative',
			'shake-y-positive',
			'shake-y-negative',
			'shake-z-positive',
			'shake-z-negative',
		];

		// create custom event
		if (typeof document.createEvent === 'function') {
			this.events = this.eventNames.map( name => {
				const event = document.createEvent('Event');
				event.initEvent(name, true, true);
				return event;
			})
		}
	}

	// reset timer values
	reset() {
		this.lastTime = new Date();
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;
	};

	// start listening for devicemotion
	start() {
		this.reset();
		if (this.hasDeviceMotion) {
			window.addEventListener('devicemotion', this, false);
		}
	};

	// stop listening for devicemotion
	stop() {
		if (this.hasDeviceMotion) {
			window.removeEventListener('devicemotion', this, false);
		}
		this.reset();
	};

	// calculates if shake did occur
	devicemotion(e) {
		const current = e.acceleration;

		if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
			this.lastX = current.x;
			this.lastY = current.y;
			this.lastZ = current.z;
			return;
		}

		const deltaX = this.lastX - current.x;
		const deltaY = this.lastY - current.y;
		const deltaZ = this.lastZ - current.z;

		let activedEventName = null;
		if (deltaX > this.options.threshold) {
			activedEventName = 'shake-x-positive';
		} else if (-deltaX > this.options.threshold) {
			activedEventName = 'shake-x-negative';
		} else if (deltaY > this.options.threshold) {
			activedEventName = 'shake-y-positive';
		} else if (-deltaY > this.options.threshold) {
			activedEventName = 'shake-y-negative';
		} else if (deltaZ > this.options.threshold) {
			activedEventName = 'shake-z-positive';
		} else if (-deltaZ > this.options.threshold) {
			activedEventName = 'shake-z-negative';
		}
		if (activedEventName != null) {
			const currentTime = new Date();
			const timeDifference = currentTime.getTime() - this.lastTime.getTime();

			if (timeDifference > this.options.timeout) {
				window.dispatchEvent(this.events[this.eventNames.indexOf(activedEventName)]);
				this.lastTime = new Date();
			}
		}

		this.lastX = current.x;
		this.lastY = current.y;
		this.lastZ = current.z;

	};

	// event handler
	handleEvent(e) {
		if (typeof (this[e.type]) === 'function') {
			return this[e.type](e);
		}
	};

};
