
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {fade} from '../utils/colorManipulator';
var VectorIcon = require('../VectorIcon');


const IconType = PropTypes.oneOfType([PropTypes.element, PropTypes.object]);

class Button extends Component {
	static propTypes = {
	  	icon: IconType,
    	caption: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    	color: PropTypes.string,
    	loading: PropTypes.bool,
	};

	render() {
		let {
			icon,
			caption,
			color,
			loading,
			style,
			...other,
		} = this.props;

		if(color) {
			var textColor = 'white';
		}

		if(!React.isValidElement(icon) && icon) {
			icon = <VectorIcon color={textColor} {...icon} />;
		}

		if(loading) {
			color = color && fade(color, 0.5);
			icon = <ActivityIndicator color={textColor} />;
		}

		if(typeof caption === 'string') {
			caption = 
				<Text style={[styles.caption, {color: textColor}]}>
					{caption}
				</Text>
		}

		if(icon && caption) {
			var space = <View style={styles.space} />;
		}

		return (
			<TouchableOpacity 
				style={[styles.container, {backgroundColor: color}, style]}
				activeOpacity={.5}
				disabled={loading}
				{...other}>
				<View style={styles.content}>
					{icon}
					{space}
					{caption}
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	container: {
        padding: 10,
    },
    content: {
    	flex: 1,
    	flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
    },
    caption: {
    	letterSpacing: 1,
    },
    space: {
    	width: 6,
    },
};

module.exports = Button;
