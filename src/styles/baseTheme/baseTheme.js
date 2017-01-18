
'use strict';

var spacing = require('./spacing');
var palette = require('./palette');
var PlatformStyleSheet = require('../../utils/PlatformStyleSheet');
import {fade} from '../../utils/colorManipulator';

module.exports = PlatformStyleSheet.create({
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
	paper: {
		backgroundColor: palette.canvasColor,
		ios: {
			zDepthShadows: [
				[1, 4, 0.24],
		        [3, 10, 0.39],
		        [6, 10, 0.42],
		        [10, 18, 0.47],
		        [15, 20, 0.52],
			].map(d => ({
				shadowOffset: {width: 0, height: d[0]},
				shadowRadius: d[1],
				shadowColor: fade(palette.shadowColor, d[2]),
				shadowOpacity: 1,
			})),
		},
		android: {
			zDepthShadows: [1,2,3,4,5].map(d => ({
				borderWidth: 1,
				borderColor: 'rgba(0,0,0,.12)',
			})),
		}
	},
	mask: {
    	backgroundColor: 'rgba(0, 0, 0, 0.54)',
    },
});
