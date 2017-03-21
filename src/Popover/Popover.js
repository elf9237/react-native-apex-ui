
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
		placement: PropTypes.oneOf([
			'top-center',
			'top-left',
			'top-right',
			'bottom-center',
			'bottom-left',
			'bottom-right',
		]),
		animation: PropTypes.func,
		children: PropTypes.node,
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
		masked: PropTypes.bool,
		zDepth: PropTypes.number,
		useLayerForClickAway: PropTypes.bool,
	};

	static defaultProps = {
		masked: false,
		animation: PopoverAnimationVertical,
		onRequestClose: () => {},
    	placement: 'bottom-right',
    	useLayerForClickAway: true,
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

	onLayout = (e) => {
		let layout = e.nativeEvent.layout;
		this.state.layout = layout;
		this.props.onLayout && this.props.onLayout(e);
	}

	onTouchStart = (e) => {
		e.nativeEvent.preventTouchStartEvent = true;
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

		const targetEl = renderToLayer.getLayer();
		if(!targetEl || !targetEl.setNativeProps) {
			return;
		}

		const {layout} = this.state;

		const left = (anchorPosition.x || 0) - (layerContainerPosition.x || 0);
		const top = (anchorPosition.y || 0) - (layerContainerPosition.y || 0);
		const width = anchorPosition.width || 0;
		const height = anchorPosition.height || 0;


		const placement = this.props.placement.split('-');
		const verticalPlacement = placement[0];
        const horizontalPlacement = placement[1];

		let placementOffsetX = 0, placementOffsetY = 0;
		if(horizontalPlacement == 'left') {
			placementOffsetX = -layout.width + width;
		} else if(horizontalPlacement == 'center') {
			placementOffsetX = -(layout.width - width) / 2;
		}

		if(verticalPlacement == 'top') {
			placementOffsetY = -layout.height;
		} else if(verticalPlacement == 'bottom') {
			placementOffsetY = height;
		}


		const offset = this.props.offset || {};
		const offsetX = offset.x || 0;
		const offsetY = offset.y || 0;

		const style = {
        	left: left + placementOffsetX + offsetX,
        	top: top + placementOffsetY + offsetY,
        };

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
			useLayerForClickAway,
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
				onTouchStart={this.onTouchStart}
				onLayout={this.onLayout}
				onEnd={this.onAnimationEnd}
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
				layerStyle={[styles.layer, this.props.layerStyle]}
				useLayerForClickAway={this.props.useLayerForClickAway}
			/>
		);
	}
}
const styles = {
	layer: {
		right: undefined,
		bottom: undefined,
	}
}

module.exports = Popover;
