
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var ListItem = require('./ListItem');
var VectorIcon = require('../VectorIcon');

class CheckItem extends Component {
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

		const {palette} = this.context.uiTheme;

		if(checked) {
			var icon = 
				<VectorIcon 
				name='check' 
				color={palette.iconTintColor}
				style={styles.tick}
			/>;
		}

		return (
			<ListItem
				{...other}
				hideChevron={true}
				rightItem={icon}
			/>
		);
	}
}

const styles = {
	tick: {
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 24,
		height: 24,
	}
};

module.exports = CheckItem;
