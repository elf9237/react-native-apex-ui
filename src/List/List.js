
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {StyleSheet, View, Text} from 'react-native';

class List extends Component {
	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	getItems() {
		const items = [];
		React.Children.forEach(this.props.children, item => {
			if (React.isValidElement(item)) {
				items.push(item);
			}
		});
		return items;
	}

	getItemCount() {
		return this.getItems().length;
	}

	render() {
		const {palette} = this.context.uiTheme;
		let borderColor = palette.borderColor;

		let count = this.getItemCount();
		let listItems = this.getItems().map((child, i) => {
			let hideSeparator = i === (count - 1);
			return React.cloneElement(child, {key: i, hideSeparator});
		});

		return (
			<View style={[styles.list, {borderColor}, this.props.style]}>
				{listItems}
			</View>
		);
	}
}

const styles = {
	list: {
		marginTop: 20,
		backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
};

module.exports = List;
