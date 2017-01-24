
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Easing} from 'react-native';

const easeOut = Easing.bezier(0.23, 1, 0.32, 1);

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
			opacityValue: new Animated.Value(props.opacity),
		};
	}

	componentDidMount() {
		this.animate();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	animate = () => {
		const {opacityValue, rippleValue} = this.state;
		Animated.parallel([
			Animated.timing(opacityValue, {
				toValue: 0,
				easing: easeOut,
				duration: 2000,
			}),
			Animated.timing(rippleValue, {
				toValue: 1,
				easing: easeOut,
				duration: 1000,
			}),
		]).start(this.props.onEnd);
	}

	render() {
		const {
			color,
			style,
		} = this.props;

		const {opacityValue, rippleValue} = this.state;

		const mergedStyle = [
			styles.ripple,
			style,
			{
				backgroundColor: color,
				opacity: opacityValue,
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
