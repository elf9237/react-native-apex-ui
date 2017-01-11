
'use strict';

var spacing = require('./spacing');
var palette = require('./palette');
var PlatformStyleSheet = require('../../utils/PlatformStyleSheet');

function createStyle(style) {
	return PlatformStyleSheet.create(style);
}

module.exports = {
	spacing,
	palette,
	navBar: {
		backgroundColor: 'white',
	},
	vectorIcon: {
		size: 24,
	},
	listItem: {
		underlayColor: '#ececec',
	},
};
