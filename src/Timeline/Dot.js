
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

class Dot extends Component {
	static defaultProps = {
		color: '#108ee9',
		radius: 6,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return false; 
	}

	render() {
		const {
			color,
			radius,
			children,
		} = this.props;

		const dotStyles = {
			width: radius * 2,
			height: radius * 2,
			borderRadius: radius,
			borderColor: color,
		};

		return (
			<View style={[styles.dot, dotStyles]}>
				{children}
			</View>
		);
	}
}

const styles = {
	dot: {
		borderWidth: 2,
		justifyContent: 'center',		
		alignItems: 'center',
		backgroundColor: 'white',
	},
};

module.exports = Dot;
