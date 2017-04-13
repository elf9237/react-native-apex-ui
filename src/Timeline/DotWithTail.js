
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, StyleSheet} from 'react-native';
import Dot from './Dot';

class DotWithTail extends Component {
	static propTypes = {
		last: PropTypes.bool,
		color: PropTypes.string,
		width: PropTypes.number,
		dot: PropTypes.element,
		tailColor: PropTypes.string,
	};

	static defaultProps = {
		width: 24,
		tailColor: 'rgba(0,0,0,0.1)',
	};

	shouldComponentUpdate(nextProps, nextState) {
		return false; 
	}

	render() {
		const {
			last,
			color, 
			width,
			dot, 
			tailColor,
			...other,
		} = this.props;

		const left = width && Math.floor(width / 2 - 1);
		const backgroundColor = tailColor;
		const tailElement = last || <View style={[styles.tail, {left, backgroundColor}]} />;

		const dotElement = React.isValidElement(dot) ? 
			dot : <Dot color={color} />;

		return (
			<View {...other} style={[styles.container, {width}]}>
				{tailElement}
				{dotElement}
			</View>
		);
	}
}

const styles = {
	container: {
		alignItems: 'center',
	},
	tail: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: 2,
	},
};

module.exports = DotWithTail;