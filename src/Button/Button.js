
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {fade} from '../utils/colorManipulator';
var VectorIcon = require('../VectorIcon');

class FlatButton extends Component {
	static propTypes = {
	  	icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
    	caption: PropTypes.node,
    	backgroundColor: PropTypes.string,
    	captionColor: PropTypes.string,
    	captionStyle: Text.propTypes.style,
    	loading: PropTypes.bool,
    	disabled: PropTypes.bool,
    	touchableComponent: PropTypes.func,
	};

	static defaultProps = {
		touchableComponent: TouchableOpacity,
	};

	render() {
		let {
			icon,
			caption,
			backgroundColor,
			captionColor,
			loading,
			disabled,
			style,
			captionStyle,
			touchableComponent: TouchableComponent,
			...other,
		} = this.props;

		if(disabled || loading) {
			backgroundColor = backgroundColor && fade(backgroundColor, 0.35);
		}
		
		if(loading) {
			icon = <ActivityIndicator color={backgroundColor} />;
		} else if(React.isValidElement(icon)) {
			icon = icon;
		} else if(typeof icon == 'object') {
			icon = <VectorIcon style={styles.transparent} {...icon} />;
		}


		if(typeof caption === 'string') {
			caption = (
				<Text style={[styles.transparent, {color: captionColor}, captionStyle]}>
					{caption}
				</Text>
			);
		}

		if(icon && caption) {
			var space = <View style={styles.space} />;
		}

		return (
			<TouchableComponent 
				style={[styles.button, {backgroundColor}, style]}
				disabled={disabled || loading}
				{...other}>
				{icon}
				{space}
				{caption}
			</TouchableComponent>
		);
	}
}

const styles = {
	button: {
		minWidth: 88,
		minHeight: 36,
		paddingVertical: 6,
		paddingHorizontal: 10,
        flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
    },
    transparent: {
    	backgroundColor: 'transparent',
    },
    space: {
    	width: 8,
    },
};

module.exports = FlatButton;
