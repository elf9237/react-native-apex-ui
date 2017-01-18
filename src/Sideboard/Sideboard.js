
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {PanResponder, Animated, InteractionManager} from 'react-native';
var Popover = require('../Popover');
var DropdownAnimation = require('./DropdownAnimation');
var PopupAnimation = require('./PopupAnimation');

class Sideboard extends Component {
	static propTypes = {
		docked: PropTypes.oneOf(['top', 'bottom']),
		masked: PropTypes.bool,
		gestureEnabled: PropTypes.bool,
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
		zDepth: PropTypes.number,
	};

	static defaultProps = {
		docked: 'bottom',
		gestureEnabled: true,
		zDepth: 3,
	};

	state = {
		offset: new Animated.Value(0),
	};

	componentWillMount() {
		this._gestureResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderMove: Animated.event([
				null, {dy: this.state.offset},
			]),
		});
	}

	onMoveShouldSetPanResponder = (e: Object, gestureState: Object) => {
		const dy = Math.floor(Math.abs(gestureState.dy));
		return dy > 10;
	}

	onPanResponderRelease = (e, gestureState) => {
		if(this.isOppositeToPosition()) {
			Animated.spring(
				this.state.offset,
				{toValue: 0}
			).start();
		} else {
			const dy = Math.abs(gestureState.dy);
			if(this.props.onRequestClose && dy > 10) {
				this.props.onRequestClose();
			}
			InteractionManager.runAfterInteractions(
				() => this.state.offset.setValue(0)
			);
		}
	}

	isOppositeToPosition(value) {
		return this.state.offset.__getValue() 
			* (this.props.docked === 'bottom' ? 1 : -1) < 0;
	}

	render() {
		const {
			docked,
			masked,
			style,
			children,
			gestureEnabled,
			...other,
		} = this.props;

		if(gestureEnabled) {
			var panHandlers = this._gestureResponder.panHandlers;
		}

		const Animation = Animations[docked];
		const layerStyle = masked ? styles.maskedlayer[docked] : styles.dockedlayer[docked];

		return (
			<Popover
				animation={Animation}
				{...other}
				masked={masked}
				layerStyle={layerStyle}
				style={[styles.popover, style, {top: this.state.offset}]}
				{...panHandlers}
			>
				{children}
			</Popover>
		);
	}
}

const Animations = {
	top: DropdownAnimation,
	bottom: PopupAnimation,
}

const styles = {
	dockedlayer: {
        top: {
        	top: 0,
        	bottom: undefined,
        },
        bottom: {
        	top: undefined,
        	bottom: 0,
        }
    },
    maskedlayer: {
    	top: {
    		top: 0,
    		bottom: 0,
    		justifyContent: 'flex-start',
    	},
    	bottom: {
    		top: 0,
    		bottom: 0,
    		justifyContent: 'flex-end',
    	}
    },
    popover: {
		alignSelf: 'stretch',
    },
};

module.exports = Sideboard;
