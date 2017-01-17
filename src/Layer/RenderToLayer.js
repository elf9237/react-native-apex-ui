
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
		return this.props.getLayer ? this.props.getLayer() : this.refs.layer;
	}

	renderIfOpened = () => {
		this.props.open ? this.renderToLayer() : this.unrenderFromLayer();
	}

	unrenderFromLayer = () => {
		const layer = this.getLayer();
		layer.unrenderLayer();
	}

	renderToLayer = () => {
		const {
			render,
			onRequestClose,
			layerStyle,
		} = this.props;

		const layer = this.getLayer();
		const layerElement = render();
		layer.renderLayer(layerElement, layerStyle);
		layer.onClickAway = onRequestClose;
	}

	render() {
		return <Layer ref='layer' />;
	}
}

module.exports = RenderToLayer;
