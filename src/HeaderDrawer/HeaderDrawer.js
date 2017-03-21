
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

var LayerContainer = require('../Layer/LayerContainer');
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

	getLayerContainer = () => {
		return this.refs.layerContainer;
	}

	onLayoutHeader = (e) => {
		let headerHeight = e.nativeEvent.layout.height;
		if(headerHeight && headerHeight != this.state.headerHeight) {
			this.setState({headerHeight});
		}
	}

	onTouchStart = (e) => {
		e.nativeEvent.preventTouchStartEvent = true;
	}

	render() {
		const {
			header,
			drawer,
			style,
			children,
			...other,
		} = this.props;

		const fakeHeader = <View style={{height: this.state.headerHeight}} />;

		return (
			<View style={[styles.container, style]}>
				{fakeHeader}
				
				{children}

				<Popover
					masked={true}
					animation={DropdownAnimation}
					getLayerContainer={this.getLayerContainer}
					style={styles.popover}
					layerStyle={styles.layer}
					{...other}
				>
					{fakeHeader}
					{drawer}
				</Popover>

				<LayerContainer ref='layerContainer' />

				<View 
					style={styles.header} 
					onTouchStart={this.onTouchStart}
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
    layer: {
    	right: 0,
    	bottom: 0,
    },
    popover: {
		alignSelf: 'stretch',
    },
};

module.exports = HeaderDrawer;
