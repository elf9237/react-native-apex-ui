
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var getUiTheme = require('./getUiTheme');

class UiThemeProvider extends Component {
	static propTypes = {
		children: PropTypes.element,
		uiTheme: PropTypes.object,
	};

	static childContextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	getChildContext() {
		return {
			uiTheme: this.props.uiTheme || getUiTheme(),
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}

module.exports = UiThemeProvider;
