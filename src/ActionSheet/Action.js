
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Button = require('../Button');

class Action extends Component {
	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {
			style,
			captionStyle,
			...other,
		} = this.props;

		const {
			backgroundColor,
			separatorColor,
			buttonHeight,
			buttonTextSize,
			buttonTextColor,
		} = this.context.uiTheme.actionSheet;

		return (
			<Button 
        		activeOpacity={.8} 
        		backgroundColor={backgroundColor}
				captionColor={buttonTextColor}
				style={[{height: buttonHeight, borderColor: separatorColor}, style]}
				captionStyle={[{fontSize: buttonTextSize}, captionStyle]}
				{...other}
			/>
		);
	}
}

module.exports = Action;