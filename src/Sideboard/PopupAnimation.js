
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Animation = require('../Popover/Animation');

class PopupAnimation extends Animation {
	prepareStyle() {
		let {layout, anim} = this.state;

		if(layout) {
			var translateY = this.interpolate(0, layout.height);
		}

		return {
			opacity: !layout ? 0 : 1,
			transform: [
				{translateY},
			],
		};
	}
}

module.exports = PopupAnimation;
