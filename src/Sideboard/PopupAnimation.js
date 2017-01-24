
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';
var Animation = require('../Popover/Animation');

class PopupAnimation extends Animation {
	setAnimationTo = (value) => {
		this.state.anim.stopAnimation();
		Animated.timing(
			this.state.anim,
			{
				toValue: value,
				easing: Easing.bezier(0.215, 0.61, 0.355, 1),
				duration: 250,
			}
		).start();
	}

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
