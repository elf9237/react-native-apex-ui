
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

var Layer = require('../Layer');
var Popover = require('../Popover');
var DropdownAnimation = require('../Sideboard/DropdownAnimation');

class HeaderDrawer extends Component {
	static propTypes = {
		header: PropTypes.node,
		drawer: PropTypes.node,
		children: PropTypes.node,
	};

	state = {
		headerHeight: 0,
	};

	getLayer = () => {
		return this.refs.layer;
	}

	onLayoutHeader = (e) => {
		let headerHeight = e.nativeEvent.layout.height;
		if(headerHeight && headerHeight != this.state.headerHeight) {
			this.setState({headerHeight});
		}
	}

	render() {
		const {
			header,
			drawer,
			style,
			children,
			...other,
		} = this.props;

		return (
			<View style={[styles.container, style]}>
				<View style={{height: this.state.headerHeight}} />
				
				{children}

				<Popover
					masked={true}
					animation={DropdownAnimation}
					getLayer={this.getLayer}
					style={styles.popover}
					{...other}
				>
					{drawer}
				</Popover>

				<Layer ref='layer' />

				<View 
					style={styles.header} 
					onLayout={this.onLayoutHeader}>
					{header}
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
        flex: 1,
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    popover: {
		alignSelf: 'stretch',
    },
};

module.exports = HeaderDrawer;