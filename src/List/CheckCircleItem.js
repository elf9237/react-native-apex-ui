
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var ListItem = require('./ListItem');
var VectorIcon = require('../VectorIcon');

class CheckCircleItem extends Component {
	static propTypes = {
		checked: PropTypes.bool,
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {
			checked,
			...other,
		} = this.props;

		const {disabledColor, iconTintColor} = this.context.uiTheme.palette;

		let icon;
		if(checked) {
			icon = (
				<VectorIcon 
					type='material'
					name='check-circle'
					color={iconTintColor}
					style={styles.checked}
				/>
			);
		} else {
			icon = (
				<VectorIcon 
					type='material'
					name='check-circle-outline'
					style={styles.unchecked}
				/>
			);
		}

		return (
			<ListItem
				{...other}
				hideChevron={true}
				leftIcon={icon}
			/>
		);
	}
}

const styles = {
	checked: {
		textAlign: 'center',
		fontSize: 26,
		lineHeight: 25,
		height: 24,
		width: 24,
		marginRight: 10,
	},
	unchecked: {
		textAlign: 'center',
		color: '#c9c9c9',
		fontSize: 26,
		lineHeight: 25,
		width: 24,
		height: 24,
		marginRight: 10,
	}
};

module.exports = CheckCircleItem;
