
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

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

	render() {
		const {
			style,
			zDepth,
			children,
			...other,
		} = this.props;

		const {paper} = this.context.uiTheme;

		return (
			<View style={[{backgroundColor: paper.backgroundColor}, 
				[paper.zDepthShadows[zDepth - 1]], style]}
				{...other}
			>
				{children}
			</View>
		);
	}
}

module.exports = Paper;
