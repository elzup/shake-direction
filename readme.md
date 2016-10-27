# shake-direction [![Build Status](https://travis-ci.org/elzup/shake-direction.svg?branch=master)](https://travis-ci.org/elzup/shake-direction)

> A custom &#39;shake&#39; event with direction JavaScript plugin for mobile web browsers using device accelerometer.


## Install

```
$ npm install --save shake-direction
```


## Usage

```js
'use strict';


import ShakeDirection from './';

var se = new ShakeDirection({
	threshold: 20,
	timeout: 1000
});
se.start();

window.addEventListener('shake-x-positive', () => {
	console.log('X Positive!');
}, false);
window.addEventListener('shake-x-negative', () => {
	console.log('X Negative!');
}, false);
window.addEventListener('shake-y-positive', () => {
	console.log('Y Positive!');
}, false);
window.addEventListener('shake-y-negative', () => {
	console.log('Y Negative!');
}, false);
window.addEventListener('shake-z-positive', () => {
	console.log('Z Positive!');
}, false);
window.addEventListener('shake-z-negative', () => {
	console.log('Z Negative!');
}, false);
```


## API

### ShakeDirection(threshold, timeout)

#### threshold

Type: `int`<br>
Default: 15

optional shake strength threshold.

#### options

##### timeout

Type: `int`<br>
Default: 1000

determines the frequency of event generation.

## License

MIT © [elzup](http://elzup.com)
