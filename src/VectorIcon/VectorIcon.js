
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSets = {
	'font-awesome': FontAwesome,
	'ionicon': Ionicons,
	'material': MaterialCommunityIcons,
};

const IconType = PropTypes.oneOf(Object.keys(iconSets));

class VectorIcon extends Component {
	static propTypes = {
		type: IconType,
		name: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
	};

	static defaultProps = {
	  	type: 'font-awesome',
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {
			type,
			...other,
		} = this.props;

		const {vectorIcon} = this.context.uiTheme;

		let Icon = iconSets[type];

		if(!Icon)
			return null;

		return (
			<Icon {...vectorIcon} {...other} />
		);
	}
}

module.exports = VectorIcon;
