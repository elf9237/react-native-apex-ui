
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';
var Animation = require('../Popover/Animation');

class PopupAnimation extends Animation {
	static defaultProps = {
		...Animation.defaultProps,
		duration: 250,
		easing: Easing.bezier(0,0,.58,1),
	};

	prepareStyle() {
		let {layout, anim} = this.state;

		if(layout) {
			var translateY = this.interpolate(0, layout.height);
		}

		return {
			opacity: this.interpolate([0, 0, 1, 1], [0, .2, .2, 1]),
			transform: [
				{translateY},
			],
		};
	}
}

module.exports = PopupAnimation;
