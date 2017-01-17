
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Animation = require('./Animation');

class MaskedAnimation extends Animation {
	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	static defaultProps = {
		onStartShouldSetResponder: () => false,
	};

	prepareStyle() {
		const {mask} = this.context.uiTheme;
		let backgroundColor = this.interpolate(mask.backgroundColor, 'transparent');
		return [styles.mask, {backgroundColor}];
	}
}

const styles = {
	mask: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
};

module.exports = MaskedAnimation;
