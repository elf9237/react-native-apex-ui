
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated} from 'react-native';
var Paper = require('../Paper');

class Animation extends Component {
	static propTypes = {
		open: PropTypes.bool,
	};

	static defaultProps = {
		onStartShouldSetResponder: () => true,
	};

	state = {
		layout: {width: 0, height: 0},
		anim: new Animated.Value(0),
	};

	componentDidMount() {
		if(this.props.open) {
			this.setAnimationTo(1);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.open != nextProps.open) {
			this.setAnimationTo(nextProps.open ? 1 : 0);
		}
	}

	setNativeProps = (props) => {
		this.refs.paper.setNativeProps(props);
	}

	setAnimationTo = (value) => {
		this.state.anim.stopAnimation();
		Animated.timing(
			this.state.anim,
			{
				toValue: value,
				duration: 220,
			}
		).start();
	}

	handleLayout = (e) => {
		let layout = e.nativeEvent.layout;
		if(layout.height && layout.width) {
			this.setState({layout});
		}
	}

	interpolate = (to, from = 0) => {
		return this.state.anim.interpolate({
			inputRange: [0, 1],
			outputRange: [from, to],
		});
	}

	prepareStyle() {
		//返回需要执行动画的样式，由具体的子类实现
	}

	render() {
		const {
			style,
			children,
			...other,
		} = this.props;

		let transformStyle = this.prepareStyle();

		return (
			<Paper 
				{...other}
				ref='paper'
				onLayout={this.handleLayout}
				style={[styles.pager, style, transformStyle]}
			>
				{children}
			</Paper>
		);
	}
}

const styles = {
	pager: {
        alignSelf: 'flex-start',
    },
    hidden: {
    	opacity: 0,
    }
};

module.exports = Animation;
