
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Animation = require('./Animation');


class PopoverAnimationVertical extends Animation {
	prepareStyle() {
		let {layout, anim} = this.state;
		return {
			opacity: !layout ? 0 : anim,
			transform: [
				{scaleY: this.interpolate(1)},
				{translateY: this.interpolate(0, -layout.height)}
			],
		};
	}
}

module.exports = PopoverAnimationVertical;
