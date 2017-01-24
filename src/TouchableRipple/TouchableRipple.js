
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Touchable} from 'react-native';
var CircleRipple = require('./CircleRipple');

var TouchableRipple = React.createClass({
	propTypes: {
		disabled: PropTypes.bool,
		onPress: PropTypes.func,
		rippleColor: PropTypes.string,
		rippleOpacity: PropTypes.number,
	},

	contextTypes: {
		uiTheme: PropTypes.object.isRequired,
	},

	mixins: [Touchable.Mixin],

	getInitialState() {
		return {
			 ...this.touchableGetInitialState(),
			nextKey: 0,
			ripples: [],
			layout: {},
		};
	},

	componentDidMount() {
		this._mounted = true; 
	},

	componentWillUnmount() {
		this._mounted = false; 
	},

	getRippleStyle(event) {
		const {layout} = this.state;
		const width = layout.width || 0;
		const height = layout.height || 0;
		const {locationX, locationY} = event.nativeEvent;

		const topLeftDistance = this._getDistanceBetweenPoints(locationX, locationY, 0, 0);
	    const topRightDistance = this._getDistanceBetweenPoints(locationX, locationY, width, 0);
	    const bottomLeftDistance = this._getDistanceBetweenPoints(locationX, locationY, 0, height);
	    const bottomRightDistance = this._getDistanceBetweenPoints(locationX, locationY, width, height);

		const rippleRadius = Math.max(
			topLeftDistance, topRightDistance, bottomLeftDistance, bottomRightDistance
		);
		const rippleSize = rippleRadius * 2;
		const left = locationX - rippleRadius;
		const top = locationY - rippleRadius;

		return {
			height: rippleSize,
			width: rippleSize,
			borderRadius: rippleRadius,
			top: top,
			left: left,
		};
	},

	start(event: Object) {
		const {uiTheme} = this.context;
		const {rippleColor, rippleOpacity} = this.props;

		let {ripples, nextKey} = this.state;

		ripples = [...ripples, (
			<CircleRipple
				key={nextKey}
				color={rippleColor || uiTheme.ripple.color}
				opacity={rippleOpacity || uiTheme.ripple.opacity}
				style={this.getRippleStyle(event)}
				onEnd={this.onRippleEnd}
			/>
		)];

		this.setState({
			nextKey: nextKey + 1,
			ripples: ripples,
		});
	},

	onRippleEnd() {
		this._mounted && this.setState({
			ripples: this.state.ripples.slice(1),
		});
	},

	touchableHandleActivePressIn: function(event: Object) {
		this.start(event);
		this.props.onPressIn && this.props.onPressIn(event);
	},

	touchableHandlePress: function(event: Object) {
		this.props.onPress && this.props.onPress(event);
	},

	onLayout: function(event) {
		this.state.layout = event.nativeEvent.layout;
		this.props.onLayout && this.props.onLayout(event);
	},

	render() {
		const {children, style} = this.props;
    	const {ripples} = this.state;

		return (
			<View 
				pointerEvents='box-only'
				style={[style, styles.container]}
				onLayout={this.onLayout}
				onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
		        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
		        onResponderGrant={this.touchableHandleResponderGrant}
		        onResponderMove={this.touchableHandleResponderMove}
		        onResponderRelease={this.touchableHandleResponderRelease}
		        onResponderTerminate={this.touchableHandleResponderTerminate}>
				{ripples}
				{children}
			</View>
		);
	}
});

const styles = {
	container: {
        overflow: 'hidden',
    },
};

module.exports = TouchableRipple;
