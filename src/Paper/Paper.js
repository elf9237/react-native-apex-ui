
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Animated, Text} from 'react-native';

class Paper extends Component {
	static propTypes = {
	    children: PropTypes.node,
	    zDepth: PropTypes.number,
	};

	static defaultProps = {
		zDepth: 1,
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	setNativeProps = (props) => {
		this.refs.paper.setNativeProps(props);
	}

	render() {
		const {
			style,
			zDepth,
			children,
			...other,
		} = this.props;

		const {paper} = this.context.uiTheme;
		const _style = [
			styles.paper,
			{backgroundColor: paper.backgroundColor}, 
			[paper.zDepthShadows[zDepth - 1]], style
		];
		return (
			<Animated.View 
				{...other}
				ref='paper'
				style={_style}>
				{children}
			</Animated.View>
		);
	}
}

const styles = {
	paper: {
		borderRadius: 2,
	},
};

module.exports = Paper;
