
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableWithoutFeedback} from 'react-native';
var Popover = require('../Popover');
var LayerContainer = require('../Layer/LayerContainer');
var TooltipAnimation = require('./TooltipAnimation');

function getArrowStyles(props, state, context) {
	const {tooltipLayout} = state;
	if(!tooltipLayout) {
		return {
			opacity: 0,
		};
	}

	const {backgroundColor, opacity, arrowWidth} = context.uiTheme.tooltip;

	const placement = props.placement.split('-');
	const verticalPlacement = placement[0];
    const horizontalPlacement = placement[1];

    if(verticalPlacement === 'top') {
    	var borderTopColor = backgroundColor;
    	var borderBottomWidth = 0;
    	var bottom = 0;
    } else {
    	var borderBottomColor = backgroundColor;
    	var borderTopWidth = 0;
    	var top = 0;
    }

    if(horizontalPlacement === 'left') {
    	var right = 15 + arrowWidth;
    } else if(horizontalPlacement === 'right') {
    	var left = 15 + arrowWidth;
    } else {
    	var left = (tooltipLayout.width) / 2 - arrowWidth;
    }

	return {
		position: 'absolute',
    	borderWidth: arrowWidth,
    	borderColor: 'transparent',
    	opacity,
    	borderTopColor,
    	borderBottomWidth,
    	bottom,
    	borderBottomColor,
    	borderTopWidth,
    	top,
    	left,
    	right,
	};
}

class Tooltip extends Component {
	static propTypes = {
		...Popover.propTypes,
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	};

	static defaultProps = {
    	placement: 'bottom-right',
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	state = {};

	onLayout = (e) => {
		let layout = e.nativeEvent.layout;
		this.setState({tooltipLayout: layout});
	}

	render() {
		const {
			title,
			style,
			children,
			...other,
		} = this.props;

		const {color, backgroundColor, opacity, arrowWidth} = this.context.uiTheme.tooltip;

		const titleEl = typeof title === 'string' ? 
			<Text style={{color}}>{title}</Text> : title;

        const arrowStyle = getArrowStyles(this.props, this.state, this.context);

		return (
			<Popover
				{...other}
				zDepth={0}
				onLayout={this.onLayout}
				animation={TooltipAnimation}
				layerStyle={styles.layer}
				style={[styles.tooltip, {paddingVertical: arrowWidth}]}>

				<View style={arrowStyle} />

				<View style={[styles.content, {backgroundColor, opacity}]}>
					{titleEl}
				</View>
			</Popover>
		);
	}
}

const styles = {
	layer: {

    },
    tooltip: {
    	alignItems: 'flex-start',
    	backgroundColor: 'transparent',
    },
    content: {
    	borderRadius: 4,
    	padding: 10,
    },
};

module.exports = Tooltip;
