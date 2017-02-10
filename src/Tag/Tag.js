
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableHighlight} from 'react-native';
import {darken, fade, emphasize, lighten} from '../utils/colorManipulator';
var DeleteButton = require('./DeleteButton');

class Tag extends Component {
	static propTypes = {
		backgroundColor: PropTypes.string,
		textColor: PropTypes.string,
		deleteIconColor: PropTypes.string,
		closable: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.node,
	};

	static defaultProps = {
		closable: true,
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	state = {
		closed: false,
	};

	onPressDeleteButton = () => {
		this.setState({closed: true}, this.props.onClose);
	}

	render() {
		if(this.state.closed)
			return null;

		let {
			backgroundColor,
			textColor,
			deleteIconColor,
			closable,
			children,
			style,
		} = this.props;

		const {tag} = this.context.uiTheme;
		const {fontSize, fontWeight} = tag;

		backgroundColor = backgroundColor || tag.backgroundColor;
		textColor = textColor || tag.textColor;
		deleteIconColor = deleteIconColor || tag.deleteIconColor;

		const pressedColor = darken(backgroundColor, 0.08);

		const tagText = typeof children === 'string' ? (
			<Text style={[styles.text, {color: textColor, fontSize, fontWeight}]}>
				{children}
			</Text>
		) : children;

		const deleteIcon = closable ? (
			<DeleteButton 
				onPress={this.onPressDeleteButton}
				underlayColor={pressedColor}
				deleteIconColor={deleteIconColor}
			/>
		) : null;

		return (
			<View 
				onLayout={this.onLayout}
				style={[styles.tag, {backgroundColor}, style]}>
				{tagText}
				{deleteIcon}
			</View>
		);
	}
}

const styles = {
	tag: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden',
		borderRadius: 4,
	},
    text: {
    	lineHeight: 30,
		paddingLeft: 12,
		paddingRight: 12,
    },
};

module.exports = Tag;
