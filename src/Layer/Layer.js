
'use strict';

import React from 'react';
import ReactNative, {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

var Layer = React.createClass({
	getInitialState() {
		return {
			open: false,
			contents: null,
			layerStyle: null,
		};
	},

	renderLayer(contents: ReactElement, layerStyle: Object) {
		this.setState({
			open: true,
			contents, 
			layerStyle,
		});
	},

	unrenderLayer() {
		this.setState({
			open: false,
			contents: null,
			layerStyle: null,
		});
		this.onClickAway = null;
	},

	render() {
		if(!this.state.open) {
			return null;
		}

		return (
			<TouchableWithoutFeedback onPress={this.onClickAway}>
				<View style={[styles.layer, this.props.style, this.state.layerStyle]}>
					{this.state.contents}
				</View>
			</TouchableWithoutFeedback>
		);
	},
});

const styles = {
	layer: {
    	backgroundColor: 'transparent',
        position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    },
};

module.exports = Layer;
