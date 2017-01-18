
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Popover = require('../Popover');
var DialogAnimation = require('./DialogAnimation');

class Dialog extends Component {
	static propTypes = {
		title: PropTypes.node,
		children: PropTypes.node,
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
		zDepth: PropTypes.number,
	};

	render() {
		let {
			style,
			title,
			children,
			...other,
		} = this.props;

		if (typeof title === 'string') {
			title = (
				<Text style={styles.titleText}>
					{title}
				</Text>
			);
		}

		return (
			<Popover
				zDepth={0}
				masked={true}
				{...other}
				animation={DialogAnimation}
				layerStyle={styles.layer}
				style={[styles.popover, style]}>
				{title}
				{children}
			</Popover>
		);
	}
}

const styles = {
	layer: {
		justifyContent: 'center',
	},
	popover: {
		borderRadius: 2,
		overflow: 'hidden',
		alignSelf: 'stretch',
    	marginHorizontal: 15,
    },
    titleText: {
    	fontSize: 18,
    	lineHeight: 46,
    	fontWeight: '400',
    	textAlign: 'center',
    }
};

module.exports = Dialog;
