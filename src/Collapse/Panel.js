
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
var Arrow = require('./Arrow');

class Panel extends Component {
	static propTypes = {
		header: PropTypes.node,
		children: PropTypes.node,
		footer: PropTypes.node,
		panelKey: PropTypes.string,
		expanded: PropTypes.bool,
		style: View.propTypes.style,
		headerContainerStyle: View.propTypes.style,
		showArrow: PropTypes.bool,
		arrowIcon: PropTypes.element,
	};

	static defaultProps = {
		showArrow: true,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.expanded != nextProps.expanded
			|| this.props.rowData != nextProps.rowData
		; 
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {
			style,
			headerContainerStyle,
			header,
			children,
			footer,
			panelKey,
			expanded,
			showArrow,
			arrowIcon,
			...other,
		} = this.props;

		const {underlayColor} = this.context.uiTheme.listItem;

		const headerElement = React.cloneElement(header, {expanded});

		return (
			<View style={[style, styles.panel]}>
				<TouchableHighlight 
					{...other}
					style={headerContainerStyle}
					underlayColor={underlayColor}
				>
					<View style={styles.headerWrap}>
						{showArrow && <Arrow icon={arrowIcon} expanded={expanded} />}
						{headerElement}
					</View>
				</TouchableHighlight>
				{expanded && children}
				{footer}
			</View>
		);
	}
}

const styles = {
	panel: {
		overflow: 'hidden',
	},
	headerWrap: {
		flexDirection: 'row',
	}
};

module.exports = Panel;