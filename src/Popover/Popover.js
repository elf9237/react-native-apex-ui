
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, InteractionManager} from 'react-native';
var UIManager = require('UIManager');
var RenderToLayer = require('../Layer/RenderToLayer');
var PopoverAnimationVertical = require('./PopoverAnimationVertical');
var MaskedAnimation = require('./MaskedAnimation');

class Popover extends Component {
	static propTypes = {
		getLayer: PropTypes.func,
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.open !== this.state.open) {
			if (nextProps.open) {
				this.state.open = true;
				this.state.closing = false;
			} else {
				this.state.closing = true;
				InteractionManager.runAfterInteractions(() => 
					this._mounted && this.setState({open: false})
				);
			}
		}
	}

	componentDidUpdate() {
		this.setPlacement();
	}

	setPlacement = async () => {
		if (!this.state.open || this.state.closing) {
			return;
		}
		
		const anchorEl = this.props.anchorEl;
		if (!anchorEl) {
			return;
		}

		const [
			locationX, 
			locationY, 
			width, 
			height, 
			pageX, 
			pageY
		] = await this.getAnchorPosition(anchorEl);
		
		let targetEl = this.targetEl;
		if (!targetEl || !targetEl.setNativeProps) {
			return;
		}

		const offset = this.props.offset || {};
		const offsetX = offset.x || 0;
		const offsetY = offset.y || 0;

		targetEl.setNativeProps({
			style: {
				left: locationX + offsetX,
				top: locationY + height + offsetY,
			}
		});
	}

	getAnchorPosition = (anchorEl) => {
		return new Promise((resolve, reject) => {
			UIManager.measure(
				ReactNative.findNodeHandle(anchorEl),
				(...argv) => resolve(argv),
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
				open={this.state.open}
				render={this.renderContent}
				onRequestClose={this.props.onRequestClose}
				getLayer={this.props.getLayer}
				layerStyle={this.props.layerStyle}
			/>
		);
	}
}

module.exports = Popover;
