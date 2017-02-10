
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, TouchableHighlight} from 'react-native';
var VectorIcon = require('../VectorIcon');

class DeleteButton extends Component {
	render() {
		const {
			deleteIconColor,
			...other,
		} = this.props;

		return (
			<TouchableHighlight 
				style={styles.button}
				{...other}>
				<VectorIcon 
					type='ionicon'
					name='ios-close' 
					color={deleteIconColor} 
					style={styles.icon} 
				/>
			</TouchableHighlight>
		);
	}
}

const styles = {
	button: {
    	height: 26,
    	width: 26,
    	borderRadius: 13,
    	marginRight: 4,
    	overflow: 'hidden',
    },
    icon: {
    	textAlign: 'center',
    	fontSize: 26,
    	lineHeight: 26,
    },
};

module.exports = DeleteButton;
