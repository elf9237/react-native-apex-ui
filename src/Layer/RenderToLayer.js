
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Layer = require('./Layer');

class RenderToLayer extends Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		render: PropTypes.func.isRequired,
		onRequestClose: PropTypes.func,
		getLayer: PropTypes.func,
		layerStyle: PropTypes.object,
	};

	static contextTypes = {
		getLayer: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.renderIfOpened();
	}

	componentDidUpdate() {
		this.renderIfOpened();
	}

	componentWillUnmount() {
		this.unrenderFromLayer();
	}

	getLayer = () => {
		return (this.props.getLayer || this.context.getLayer)();
	}

	renderIfOpened = () => {
		this.props.open ? this.renderToLayer() : this.unrenderFromLayer();
	}

	unrenderFromLayer = () => {
		const layer = this.getLayer();
		if(layer) {
			layer.unrenderLayer();
		}
	}

	renderToLayer = () => {
		const {
			render,
			onRequestClose,
			layerStyle,
		} = this.props;

		const layer = this.getLayer();
		if(layer) {
			const layerElement = render();
			layer.renderLayer(layerElement, layerStyle, this);
			layer.onClickAway = onRequestClose;
		}
	}

	render() {
		return null;
	}
}

module.exports = RenderToLayer;
