
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Popover = require('../Popover');
var AutoHide = require('./AutoHide');
var ToptipAnimation = require('../Popover/PopoverAnimationVertical').create(
	{onStartShouldSetResponder: () => false}
);

class Toptip extends AutoHide {
	static propTypes = {
		...AutoHide.propTypes,
		text: PropTypes.string,
		children: PropTypes.node,
		type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {
			text,
			duration,
			type,
			style,
			children,
			...other,
		} = this.props;

		const {toptip, spacing} = this.context.uiTheme;
		const paddingTop = spacing.statusbarHeight;
		const backgroundColor = toptip.backgroundColors[type];
		const color = toptip.colors[type];


		let content = children;
		if(typeof text === 'string') {
			content = (
				<Text style={[styles.text, {color}]}>
					{text}
				</Text>
			);
		}

		return (
			<Popover
				layerStyle={styles.layer}
				{...other}
				useLayerForClickAway={true}
				animation={ToptipAnimation}
				style={[styles.toptip, {backgroundColor, paddingTop}, style]}>
				{content}
			</Popover>
		);
	}
}

const styles = {
	layer: {
		right: 0,
	},
	toptip: {
		alignSelf: 'stretch',
    },
    text: {
    	fontSize: 15,
    	padding: 10,
    	fontWeight: 'bold',
    	textAlign: 'center',
    },
};

module.exports = Toptip;
