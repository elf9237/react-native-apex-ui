
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, TouchableWithoutFeedback} from 'react-native';

class Layer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			children: props.children
		};
	}

	updateChildren = (children) => {
		this.setState({children});
	}

	setNativeProps = (props) => {
		this.refs.view.setNativeProps(props);
	}

	render() {
		const {
			style,
			onRequestClose,
		} = this.props;

		return (
			<TouchableWithoutFeedback onPress={onRequestClose}>
				<View ref='view' style={[styles.layer, style]}>
					{this.state.children}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	layer: {
        position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    },
};

module.exports = Layer;
