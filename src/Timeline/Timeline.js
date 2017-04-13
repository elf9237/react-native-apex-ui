
'use strict';

import React, {Component, PropTypes, Children, isValidElement} from 'react';
import ReactNative, {View, Text} from 'react-native';

class Timeline extends Component {
	getItems = (props = this.props) => {
		const items = [];
		Children.forEach(props.children, (item) => {
			if (isValidElement(item)) {
				items.push(item);
			}
		});
		return items;
	}

	render() {
		const items = this.getItems().map((item, idx, items) => 
			React.cloneElement(item, {
				key: item.key || idx,
				last: idx == (items.length - 1),
			})
		);
		return (
			<View {...this.props}>
				{items}
			</View>
		);
	}
}

module.exports = Timeline;