
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var StaticContainer = require('../StaticContainer');
var Layer = require('./Layer');

class LayerContainer extends Component {
	state = {
		layers: [],
	};

	appendChild = (layer) => {
		let {layers} = this.state;
    	let nextKey = layers.length;

		layers = [...layers, 
			<StaticContainer key={nextKey}>
				{layer}
			</StaticContainer>
		];
		this.setState({
			layers,
		});

		return () => this.removeChild(nextKey)
	}

	removeChild = (key) => {
		let layers = this.state.layers.slice();
		delete layers[key];
		this.setState({
			layers,
		});
	}

	render() {
		const {
			style,
			children,
		} = this.props;

		const {layers} = this.state;

		const content = React.isValidElement(children) ? children : 
			<View style={styles.content}>
				{children}
			</View>
		;

		return (
			<View style={[styles.container, style]}>
				<StaticContainer 
					layers={layers}
					shouldUpdate={({props}) => props.layers === layers}>
					{content}
				</StaticContainer>
				{layers}
			</View>
		);
	}
}

const styles = {
	container: {
        position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    },
    content: {
    	flex: 1,
    },
};

module.exports = LayerContainer;
