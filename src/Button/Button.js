
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
    	backgroundColor: PropTypes.string,
    	iconColor: PropTypes.string,
    	captionColor: PropTypes.string,
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
			backgroundColor,
			iconColor,
			captionColor,
			loading,
			style,
			touchableComponent: TouchableComponent,
			...other,
		} = this.props;

		if(loading) {
			icon = <ActivityIndicator color={iconColor} />;
			backgroundColor = backgroundColor && fade(backgroundColor, 0.5);
		} else if(React.isValidElement(icon)) {
			icon = icon;
		} else if(typeof icon == 'object') {
			icon = (
				<VectorIcon 
					color={iconColor} 
					{...icon} 
					style={styles.icon} 
				/>
			);
		}

		if(typeof caption === 'string') {
			caption = (
				<Text style={[styles.caption, {color: captionColor}]}>
					{caption}
				</Text>
			);
		}

		if(icon && caption) {
			var space = <View style={styles.space} />;
		}

		return (
			<TouchableComponent 
				style={[styles.container, {backgroundColor}, style]}
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
    	fontWeight: 'normal',
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
