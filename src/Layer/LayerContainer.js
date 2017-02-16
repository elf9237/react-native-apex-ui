
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

	hasAnyLayer = () => {
		const {layers} = this.state;
		return layers.some(layer => layer != undefined);
	}

	getChildCount = () => {
		let count = 0;
		React.Children.forEach(this.props.children, (child) => {
			if (React.isValidElement(child)) {
				count++;
			}
		});
		return count;
	}

	render() {
		const {
			style,
			children,
			...other,
		} = this.props;

		const {layers} = this.state;

		if(!this.hasAnyLayer() && !this.getChildCount()) {
			return null;
		}

		const content = React.isValidElement(children) ? children : 
			<View style={styles.content}>
				{children}
			</View>
		;

		return (
			<View {...other} style={[styles.container, style]}>
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
    	backgroundColor: 'transparent',
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
