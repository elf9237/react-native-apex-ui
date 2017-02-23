
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text, StyleSheet} from 'react-native';
var Sideboard = require('../Sideboard');
var Action = require('./Action');

class ActionSheet extends Component {
	static propTypes = {
		...Sideboard.propTypes,
		title: PropTypes.string,
		actions: PropTypes.array,
		cancelButtonHidden: PropTypes.bool,
		direction: PropTypes.oneOf(['vertical', 'horizontal']),
	};

	static defaultProps = {
		cancelButtonHidden: false,
		direction: 'vertical',
	};

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	};

	renderAction = (action = {}, index) => {
		const {direction, actions, onPress} = this.props;
		const count = actions.length;
		const isLast = (index == count - 1);
		const style = [
			styles.button[direction], 
			isLast && styles.lastButton,
			action.style,
		];
		return (
			<Action 
				key={index} 
				{...action} 
				style={style} 
				onPress={() => onPress(action, index)} 
			/>
		);
	}

	render() {
		let {
			title,
			actions,
			cancelButtonHidden,
			direction,
			style,
			children,
			onPress,
			...other,
		} = this.props;

		const {
			backgroundColor, 
			separatorColor,
			borderRadius, 
			cancelTextColor,
		} = this.context.uiTheme.actionSheet;

		title = typeof title === 'string' ? 
			<View style={[styles.title, {backgroundColor, borderColor: separatorColor}]}>
				<Text style={styles.titleText}>
					{title}
				</Text>
			</View>  : title;

		const buttons = actions.map(this.renderAction);

		const cancelButton = !cancelButtonHidden ? (
			<Action 
				caption='取消'
				captionColor={cancelTextColor}
				style={[styles.cancelButton, {borderRadius}]}
				onPress={this.props.onRequestClose} 
			/>
		) : null;
		
		return (
			<Sideboard
				masked={true}
				gestureEnabled={false}
				zDepth={0}
				style={[styles.sheet, style]}
				{...other}
			>
				<View style={[styles.sheetContent, {borderRadius}]}>
					{title}
					<View style={styles.group[direction]}>
						{buttons}
					</View>
				</View>
				{cancelButton}
			</Sideboard>
		);
	}
}

const SPACE = 8;
const HAIRLINE = StyleSheet.hairlineWidth;

const styles = {
	sheet: {
        backgroundColor: 'transparent',
    	margin: SPACE,
    	marginTop: 0,
    },
    sheetContent: {
    	overflow: 'hidden',
    },
    title: {
    	borderBottomWidth: HAIRLINE,
    },
    titleText: {
    	paddingVertical: 2 * SPACE,
    	color: '#8f8f8f',
    	textAlign: 'center',
    },
    group: {
    	vertical: {
    		flexDirection: 'column',
    	},
    	horizontal: {
    		flexDirection: 'row',
    		flexWrap: 'wrap',
    	},
    },
    button: {
    	vertical: {
    		borderBottomWidth: HAIRLINE,
    	},
    	horizontal: {
    		flex: 1,
    		borderRightWidth: HAIRLINE,
    	},
    },
    lastButton: {
		borderBottomWidth: 0,
		borderRightWidth: 0,
    },
    cancelButton: {
    	marginTop: SPACE,
    }
};

module.exports = ActionSheet;