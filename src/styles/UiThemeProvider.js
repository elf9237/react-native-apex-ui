
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var getUiTheme = require('./getUiTheme');
var Layer = require('../Layer');

class UiThemeProvider extends Component {
	static propTypes = {
		uiTheme: PropTypes.object,
	};

	static childContextTypes = {
		uiTheme: PropTypes.object.isRequired,
		getLayer: React.PropTypes.func,
	};

	getChildContext() {
		return {
			uiTheme: this.props.uiTheme || getUiTheme(),
			getLayer: this.getLayer,
		};
	}

	getLayer() {
        return this.refs.layer;
    }

	render() {
		const {
			style,
			children,
			...other,
		} = this.props;

		return (
			<View 
				{...other}
				style={[styles.container, style]}>
				{children}
				<Layer ref='layer' />
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
	}
};

module.exports = UiThemeProvider;
