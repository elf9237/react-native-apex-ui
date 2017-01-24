
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {fade} from '../utils/colorManipulator';
var VectorIcon = require('../VectorIcon');

class Button extends Component {
	static propTypes = {
	  	icon: PropTypes.oneOfType([
	  		PropTypes.element, PropTypes.object
	  	]),
    	caption: PropTypes.node,
    	color: PropTypes.string,
    	loading: PropTypes.bool,
    	touchableComponent: PropTypes.func,
	};

	static defaultProps = {
		touchableComponent: TouchableOpacity,
	};

	render() {
		let {
			icon,
			caption,
			color,
			loading,
			style,
			captionStyle,
			touchableComponent: TouchableComponent,
			...other,
		} = this.props;

		if(color) {
			var textColor = 'white';
		}

		if(!React.isValidElement(icon) && icon) {
			icon = <VectorIcon color={textColor} {...icon} style={styles.icon} />;
		}

		if(loading) {
			color = color && fade(color, 0.5);
			icon = <ActivityIndicator color={textColor} />;
		}

		if(typeof caption === 'string') {
			caption = 
				<Text style={[styles.caption, {color: textColor}, captionStyle]}>
					{caption}
				</Text>
		}

		if(icon && caption) {
			var space = <View style={styles.space} />;
		}

		return (
			<TouchableComponent 
				style={[styles.container, {backgroundColor: color}, style]}
				activeOpacity={.5}
				disabled={loading}
				{...other}>
				{icon}
				{space}
				{caption}
			</TouchableComponent>
		);
	}
}

const styles = {
	container: {
        padding: 10,
        flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
    },
    caption: {
    	letterSpacing: 0,
    	fontWeight: '500',
    	backgroundColor: 'transparent',
    },
    icon: {
    	backgroundColor: 'transparent',
    },
    space: {
    	width: 6,
    },
};

module.exports = Button;
