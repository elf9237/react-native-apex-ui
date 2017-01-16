
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Button = require('../Button');

class AppHeader extends Component {
	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	createItemElement(item, style) {
		if(React.isValidElement(item)) {
			return item;
		} else if(typeof item == 'object') {
			return <Button activeOpacity={0.2} style={style} {...item} />;
		}
	}

	createTitleElement(title) {
		if(React.isValidElement(title)) {
			return title;
		} else if(typeof title == 'string') {
			return <Text style={styles.titleText}>{title}</Text>
		}
	}

	render() {
		let {
			style,
			leftItem,
			title,
			rightItem,
			...other,
		} = this.props;

		const {spacing} = this.context.uiTheme;

		leftItem = this.createItemElement(leftItem, styles.leftButton);
		title = this.createTitleElement(title);
		rightItem = this.createItemElement(rightItem, styles.rightButton);

		return (
			<View style={[
				styles.appHeader, 
				{paddingTop: spacing.statusbarHeight},
				{height: spacing.navbarHeight},
				style,
			]}>
				<View style={styles.leftItem}>
					{leftItem}
				</View>
				<View style={styles.title}>
					{title}
				</View>
				<View style={styles.rightItem}>
					{rightItem}
				</View>
			</View>
		);
	}
}

const styles = {
	appHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		overflow: 'hidden',
    },
    leftItem: {
    	flex: 1,
    	alignItems: 'flex-start',
    },
    title: {
    	flex: 2,
    	alignItems: 'center',
    },
    rightItem: {
    	flex: 1,
    	alignItems: 'flex-end',
    },
    leftButton: {
    	flex: 1,
    	paddingLeft: 11,
    	alignSelf: 'stretch',
    	alignItems: 'flex-start',
    },
    rightButton: {
    	flex: 1,
    	paddingRight: 11,
    	alignSelf: 'stretch',
    	alignItems: 'flex-end',
    },
    titleText: {
		fontSize: 18,
		lineHeight: 44,
    	fontWeight: '600',
		textAlign: 'center',
    }
};

module.exports = AppHeader;
