
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';

class CircleRipple extends Component {
	static propTypes = {
		color: PropTypes.string,
		opacity: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		opacity: .1
	};

	constructor(props) {
		super(props);
		this.state = {
			rippleValue: new Animated.Value(0),
			opacityValue: new Animated.Value(0),
		};
	}

	componentDidMount() {
		this.animate();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	easeOut = (anim, duration, toValue = 1) => {
		return Animated.timing(anim, {
			toValue,
			duration,
			easing: Easing.bezier(0.23, 1, 0.32, 1),
		});
	}

	animate = () => {
		const {opacityValue, rippleValue} = this.state;
		Animated.parallel([
			this.easeOut(opacityValue, 2000),
			this.easeOut(rippleValue, 1000),
		]).start(this.props.onEnd);
	}

	render() {
		const {
			color,
			opacity,
			style,
		} = this.props;

		const {opacityValue, rippleValue} = this.state;

		const mergedStyle = [
			styles.ripple,
			style,
			{
				backgroundColor: color,
				opacity: opacityValue.interpolate({
					inputRange: [0, 0.05, 1],
					outputRange: [0, opacity, 0],
				}),
				transform: [{scale: rippleValue}],
			},
		];

		return <Animated.View pointerEvents='none' style={mergedStyle} />;
	}
}

const styles = {
	ripple: {
		position: 'absolute',
		top: 0,
		left: 0,
    },
};

module.exports = CircleRipple;
