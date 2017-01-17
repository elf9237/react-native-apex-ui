
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
		getFilledLayer: React.PropTypes.func.isRequired,
		getDockedTopLayer: React.PropTypes.func.isRequired,
		getDockedBottomLayer: React.PropTypes.func.isRequired,
	};

	getChildContext() {
		return {
			uiTheme: this.props.uiTheme || getUiTheme(),
			getFilledLayer: this.getFilledLayer,
			getDockedTopLayer: this.getDockedTopLayer,
			getDockedBottomLayer: this.getDockedBottomLayer,
		};
	}

	getFilledLayer = () => {
        return this.refs.filledLayer;
    }

    getDockedTopLayer = () => {
        return this.refs.dockedTopLayer;
    }

    getDockedBottomLayer = () => {
        return this.refs.dockedBottomLayer;
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
				<Layer ref='dockedTopLayer' style={styles.dockedTopLayer} />
				<Layer ref='dockedBottomLayer' style={styles.dockedBottomLayer} />
				<Layer ref='filledLayer' />
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
	},
	dockedTopLayer: {
		bottom: undefined,
	},
	dockedBottomLayer: {
		top: undefined,
	},
};

module.exports = UiThemeProvider;
