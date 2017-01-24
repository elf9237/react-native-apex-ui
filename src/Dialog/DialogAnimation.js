
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Animation = require('../Popover/Animation');

class DialogAnimation extends Animation {
	prepareStyle() {
		let {layout, anim} = this.state;
		return {
			opacity: anim,
			transform: [
				{scale: this.interpolate(1, .85)},
			],
		};
	}
}

module.exports = DialogAnimation;
