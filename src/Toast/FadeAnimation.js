
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';
var Animation = require('../Popover/Animation');

class FadeAnimation extends Animation {
	prepareStyle() {
		const opacity = this.state.anim;
		return {opacity};
	}
}

module.exports = FadeAnimation;
