
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Layer = require('./Layer');

class RenderToLayer extends Component {
	static propTypes = {
		open: PropTypes.bool,
		render: PropTypes.func.isRequired,
		onRequestClose: PropTypes.func,
		getLayerContainer: PropTypes.func,
		layerStyle: PropTypes.object,
	};

	static contextTypes = {
		getLayerContainer: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.layer = null;
		this.remove = null;
		this.renderLayer();
	}

	componentDidUpdate() {
		this.renderLayer();
	}

	componentWillUnmount() {
		this.unrenderLayer();
	}

	getLayerContainer = () => {
		return (this.props.getLayerContainer || this.context.getLayerContainer)();
	}

	getLayer = () => {
		return this.layer;
	}

	unrenderLayer = () => {
		if (!this.remove) {
			return;
		}

		this.remove();
		this.remove = null;
		this.layer = null;
	}

	renderLayer = () => {
		const {
			open,
			onRequestClose,
			render,
			layerStyle,
		} = this.props;

		const layerContainer = this.getLayerContainer();

		if(open) {
      		const layerElement = render();
			if(!this.remove) {
				const layer = (
					<Layer 
						style={layerStyle} 
						onRequestClose={onRequestClose}
						ref={(layer) => this.layer = layer}>
						{layerElement}
					</Layer>
				);
        		this.remove = layerContainer.appendChild(layer);
			} else {
				if(this.layer) {
					this.layer.setNativeProps({style: layerStyle});
					this.layer.updateChildren(layerElement);
				}
			}
		} else {
			this.unrenderLayer();
		}
	}

	render() {
		return null;
	}
}

module.exports = RenderToLayer;
