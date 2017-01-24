
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Animated, Easing} from 'react-native';
var Animation = require('../Popover/Animation');

class DropdownAnimation extends Animation {
	setAnimationTo = (value) => {
		this.state.anim.stopAnimation();
		Animated.timing(
			this.state.anim,
			{
				toValue: value,
				easing: Easing.elastic(.7),
				duration: 350,
			}
		).start();
	}

	prepareStyle() {
		let {layout, anim} = this.state;

		if(layout) {
			var translateY = this.interpolate(0, -layout.height);
		}

		return {
			opacity: this.interpolate([0, 0, 1, 1], [0, .2, .2, 1]),
			transform: [
				{translateY},
			],
		};
	}
}

module.exports = DropdownAnimation;
