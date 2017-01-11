
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
var VectorIcon = require('../VectorIcon');

const TitleType = PropTypes.oneOfType([PropTypes.element, PropTypes.string]);

class ListItem extends Component {
	static propTypes = {
		title: TitleType,
		description: TitleType,
		leftIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
		rightItem: PropTypes.element,
		hideChevron: PropTypes.bool,
		hideSeparator: PropTypes.bool,
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	static defaultProps = {
	  	hideChevron: false,
	  	hideSeparator: false,
	};

	createTextElement(text, styles) {
		if (React.isValidElement(text)) {
			return text;
		} else if(typeof text === 'string') {
			return <Text style={styles}>{text}</Text>
		}
	}

	render() {
		let {
			title,
			description,
			leftIcon,
			rightItem,
			hideChevron,
			hideSeparator,
			style,
			...other,
		} = this.props;

		const {palette, listItem} = this.context.uiTheme;
		let borderColor = palette.borderColor,
			underlayColor = listItem.underlayColor;

		if(!React.isValidElement(leftIcon) && typeof leftIcon === 'object') {
			leftIcon = <VectorIcon style={styles.leftIcon} {...leftIcon} />;
		}

		title = this.createTextElement(title, styles.titleText);
		description = this.createTextElement(description, styles.descriptionText)

		if(!hideChevron) {
			var chevron = <View style={styles.chevron} />;
		}

		if(!hideSeparator) {
			var separator = <View style={[styles.separator, {backgroundColor: borderColor}]} />;
		}

		return (
			<TouchableHighlight 
				underlayColor={underlayColor}
				style={[styles.container, style]}
				{...other}>
				<View style={styles.content}>
					{leftIcon}
					<View style={styles.center}>
						{title}
						{description}
					</View>
					{rightItem}
					{chevron}
					{separator}
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = {
	container: {
		
	},
	content: {
		flex: 1,
		paddingVertical: 10,
        paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
    },
    separator: {
    	position: 'absolute',
    	left: 15,
    	right: 0,
    	bottom: 0,
		height: StyleSheet.hairlineWidth,
	},
    leftIcon: {
    	marginRight: 10,
    },
    center: {
    	flex: 1,
    	flexDirection: 'row',
    },
    titleText: {
    	flex: 1,
    	fontSize: 17,
    	lineHeight: 24,
    },
    descriptionText: {
    	fontSize: 17,
    	lineHeight: 24,
    	color: '#999',
    	textAlign: 'right',
    },
    chevron: {
    	width: 9,
    	height: 9,
    	marginLeft: 5,
    	borderTopWidth: 2,
    	borderRightWidth: 2,
    	borderColor: '#C8C8CD',
    	transform: [{rotate: '45deg'}],
    },
};

module.exports = ListItem;
