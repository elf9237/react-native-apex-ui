
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';
var Animation = require('../Popover/Animation');

class TooltipAnimation extends Animation {
	prepareStyle() {
		const {
			placement,
			open,
		} = this.props;
    	const tooltipPlacement = placement.split('-');

    	const verticalPlacement = tooltipPlacement [0];
        const horizontalPlacement = tooltipPlacement[1];

        const offset = verticalPlacement === 'bottom' ? 5 : -5;

		const {anim} = this.state;
		return {
			opacity: this.interpolate(1),
			transform: [
				{translateY: open ? this.interpolate(offset, -offset) : -10000},
			],
		};
	}
}

module.exports = TooltipAnimation;
