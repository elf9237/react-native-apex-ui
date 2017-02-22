
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Layer = require('./Layer');
var WindowEventEmitter = require('../EventEmitter/WindowEventEmitter');

class RenderToLayer extends Component {
	static propTypes = {
		open: PropTypes.bool,
		render: PropTypes.func.isRequired,
		onRequestClose: PropTypes.func,
		getLayerContainer: PropTypes.func,
		layerStyle: View.propTypes.style,
		useLayerForClickAway: PropTypes.bool,
	};

	static contextTypes = {
		getLayerContainer: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.layer = null;
		this.removeLayer = null;
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

	onClickAway = () => {
		this.props.onRequestClose && this.props.onRequestClose();
	}

	unrenderLayer = () => {
		if (this.removeLayer) {
			this.removeLayer();
			WindowEventEmitter.removeListener('touchstart', this.onClickAway);
		}

		this.removeLayer = null;
		this.layer = null;
	}

	renderLayer = () => {
		const {
			open,
			onRequestClose,
			render,
			layerStyle,
			useLayerForClickAway,
		} = this.props;

		const layerContainer = this.getLayerContainer();

		if(open) {
      		const layerElement = render();
			if(!this.removeLayer) {
				const layer = (
					<Layer 
						style={layerStyle} 
						onRequestClose={useLayerForClickAway && this.onClickAway}
						ref={(layer) => this.layer = layer}>
						{layerElement}
					</Layer>
				);
        		this.removeLayer = layerContainer.appendChild(layer);

        		if(!useLayerForClickAway) {
        			WindowEventEmitter.addListener('touchstart', this.onClickAway);
        		}
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
