
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var getUiTheme = require('./getUiTheme');
var LayerContainer = require('../Layer/LayerContainer');

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

	render() {
		const {
			children,
			...other,
		} = this.props;

		return (
			<LayerContainer {...other} ref='layerContainer'>
				{children}
			</LayerContainer>
		);
	}
}

module.exports = UiThemeProvider;
