
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var getUiTheme = require('./getUiTheme');
var LayerContainer = require('../Layer/LayerContainer');
var WindowEventEmitter = require('../EventEmitter/WindowEventEmitter');

class UiThemeProvider extends Component {
	static propTypes = {
		uiTheme: PropTypes.object,
	};

	static childContextTypes = {
		uiTheme: PropTypes.object,
		getLayerContainer: React.PropTypes.func,
	};

	getChildContext() {
		return {
			uiTheme: this.props.uiTheme || getUiTheme(),
			getLayerContainer: this.getLayerContainer,
		};
	}

	getLayerContainer = () => {
        return this.refs.layerContainer;
    }

    onTouchStart = (e) => {
    	const {touchStartTarget} = e.nativeEvent;
    	if(touchStartTarget !== 'popover') {
    		WindowEventEmitter.emit('touchstart');
    	}
    }

	render() {
		const {
			children,
			...other,
		} = this.props;

		return (
			<LayerContainer 
				{...other} 
				ref='layerContainer'
				onTouchStart={this.onTouchStart}>
				{children}
			</LayerContainer>
		);
	}
}

module.exports = UiThemeProvider;
