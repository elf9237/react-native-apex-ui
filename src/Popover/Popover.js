
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, InteractionManager, UIManager} from 'react-native';

var RenderToLayer = require('../Layer/RenderToLayer');
var PopoverAnimationVertical = require('./PopoverAnimationVertical');
var MaskedAnimation = require('./MaskedAnimation');

class Popover extends Component {
	static propTypes = {
		getLayerContainer: PropTypes.func,
		anchorEl: PropTypes.object,
		animation: PropTypes.func,
		children: PropTypes.node,
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
		masked: PropTypes.bool,
		zDepth: PropTypes.number,
	};

	static defaultProps = {
		masked: false,
		animation: PopoverAnimationVertical,
		onRequestClose: () => {},
	};

	constructor(props) {
		super(props);

		this.state = {
			open: props.open,
			closing: false,
		};
	}

	componentDidMount() {
		this._mounted = true; 
	}

	componentWillUnmount() {
		 this._mounted = false; 
	}

	componentWillReceiveProps = (nextProps) => {
		const open = this.state.open && !this.state.closing;
		if (nextProps.open !== open) {
			if (nextProps.open) {
				this.state.open = true;
				this.state.closing = false;
			} else {
				this.state.closing = true;
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.open;
	}

	componentDidUpdate() {
		this.setPlacement();
	}

	onAnimationEnd = () => {
		if(this.state.closing && this._mounted) {
			this.setState({open: false});
		}
	}

	setPlacement = async () => {
		if (!this.state.open || this.state.closing) {
			return;
		}
		
		const anchorEl = this.props.anchorEl;
		if (!anchorEl) {
			return;
		}

		const {renderToLayer} = this.refs;
		if (!renderToLayer) {
			return;
		}

		const layerContainerEl = renderToLayer.getLayerContainer();

		const anchorPosition = await this.getPosition(anchorEl);
		const layerContainerPosition = await this.getPosition(layerContainerEl);

		const targetEl = this.targetEl;
		if(!targetEl || !targetEl.setNativeProps) {
			return;
		}

		const left = (anchorPosition.x || 0) - (layerContainerPosition.x || 0);
		const top = (anchorPosition.y || 0) - (layerContainerPosition.y || 0);

		const offset = this.props.offset || {};
		const offsetX = offset.x || 0;
		const offsetY = offset.y || 0;
		
		let style = {};
		style.left = left + offsetX;
		style.top = top + anchorPosition.height + offsetY;

		targetEl.setNativeProps({style});
	}

	getPosition = (el) => {
		return new Promise((resolve, reject) => {
			UIManager.measureInWindow(
				ReactNative.findNodeHandle(el),
				(x, y, width, height) => {
					const position = {x, y, width, height};
					resolve(position);
				},
			);
		});
	}

	renderContent = () => {
		const {
			animation,
			children,
			style,
			masked,
			layerStyle,
			...other,
		} = this.props;

		let Animation = animation;
		let open = this.state.open && !this.state.closing;

		let contents = [];
		if(masked) {
			contents.push(
				<MaskedAnimation 
					key='mask' 
					open={open} 
				/>
			);
		}
		contents.push(
			<Animation 
				{...other} 
				onEnd={this.onAnimationEnd}
				ref={el => this.targetEl = el}
				key='animation'
				style={style} 
				open={open}>
				{children}
			</Animation>
		);
		return contents;
	}

	render() {
		return (
			<RenderToLayer 
          		ref="renderToLayer"
				open={this.state.open}
				render={this.renderContent}
				onRequestClose={this.props.onRequestClose}
				getLayerContainer={this.props.getLayerContainer}
				layerStyle={this.props.layerStyle}
			/>
		);
	}
}

module.exports = Popover;
