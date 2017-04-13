
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Animation = require('../Popover/Animation');
var VectorIcon = require('../VectorIcon');

class ArrowAnimation extends Animation {
	prepareStyle() {
		return {
			transform: [
				{rotate: this.interpolate('90deg', '0deg')}
			]
		};
	}
}

class Arrow extends Component {
	static propTypes = {
		expanded: PropTypes.bool,
		icon: PropTypes.element,
	};

	render() {
		const {expanded, icon} = this.props;
		return (
			<ArrowAnimation 
				open={expanded} 
				zDepth={0} 
				style={styles.animation}
			>
				{React.isValidElement(icon) ?
					React.cloneElement(icon, {expanded})
					: <VectorIcon 
						style={styles.icon} 
						type='ionicon' 
						name='ios-arrow-forward' 
					/>
				}
			</ArrowAnimation>
		);
	}
}

const styles = {
	animation: {
		backgroundColor: 'transparent',
	},
	icon: {
		fontSize: 15,
	    lineHeight: 21,
	    width: 22,
		textAlign: 'center',
		color: '#99A7B9',
	}
};

module.exports = Arrow;