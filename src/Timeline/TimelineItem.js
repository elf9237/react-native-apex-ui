
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
import DotWithTail from './DotWithTail';

class TimelineItem extends Component {
	static propTypes = {
		...DotWithTail.propTypes,
	};

	render() {
		const {children, style, ...other} = this.props;
		return (
			<View style={[styles.minHeight, style, styles.flexRow]}>
				<DotWithTail {...other} />
				{typeof children === 'string' ? 
					<Text>{children}</Text> : children
				}
			</View>
		);
	}
}

const styles = {
	minHeight: {
		minHeight: 48,
	},
	flexRow: {
		flexDirection: 'row',
	},
};

module.exports = TimelineItem;