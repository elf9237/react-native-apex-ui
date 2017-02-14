
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, InteractionManager, UIManager} from 'react-native';

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

		let x, y;
		if(this.props.getLayer) {
			x = locationX;
			y = locationY;
		} else {
			x = pageX;
			y = pageY;
		}

		targetEl.setNativeProps({
			style: {
				left: x + offsetX,
				top: y + height + offsetY,
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
