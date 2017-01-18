
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Popover = require('../Popover');
var DialogAnimation = require('./DialogAnimation');

class Dialog extends Component {
	static propTypes = {
		title: PropTypes.node,
		children: PropTypes.node,
	};

	static contextTypes = {
		getLayer: PropTypes.func.isRequired,
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
				getLayer={this.context.getLayer}
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
