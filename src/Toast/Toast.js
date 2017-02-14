
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Popover = require('../Popover');
var AutoHide = require('../Toptip/AutoHide');
var FadeAnimation = require('./FadeAnimation').create({duration: 150});

class Toast extends AutoHide {
	static propTypes = {
		...AutoHide.propTypes,
		message: PropTypes.string,
		children: PropTypes.node,
	};

	static defaultProps = {
		duration: 2000,
	};

	render() {
		const {
			message,
			duration,
			children,
			style,
			...other,
		} = this.props;

		let content = children;
		if(typeof message === 'string') {
			content = (
				<Text style={styles.message}>
					{message}
				</Text>
			);
		}

		return (
			<Popover
				{...other}
				animation={FadeAnimation}
				layerStyle={styles.layer}
				style={[styles.toast, style]}>
				{content}
			</Popover>
		);
	}
}

const styles = {
	layer: {
		justifyContent: 'center',
	},
	toast: {
		alignSelf: 'center',
		backgroundColor: 'rgba(40,40,40,.75)',
		borderRadius: 5,
		paddingVertical: 8,
		paddingHorizontal: 15,
		marginHorizontal: 15,
    },
    message: {
    	color: 'white',
    	textAlign: 'center',
    	fontSize: 16,
    },
};

module.exports = Toast;
