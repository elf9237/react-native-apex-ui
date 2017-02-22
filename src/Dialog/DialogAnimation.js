
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, ScrollView, UIManager, findNodeHandle} from 'react-native';
var Animation = require('../Popover/Animation');

class DialogAnimation extends Animation {
	static propTypes = {
		scrollToKeyboardOnFocus: PropTypes.bool,
	};

	static defaultProps = {
		...Animation.defaultProps,
		scrollToKeyboardOnFocus: true,
	};

	prepareStyle() {
		let {layout, anim} = this.state;
		return {
			opacity: anim,
			transform: [
				{scale: this.interpolate(1, .9)},
			],
		};
	}

	onKeyboardWillShow = () => {
		const {scrollView, anchor} = this.refs;

		scrollView.additionalScrollOffset = 10;
		scrollView.preventNegativeScrollOffset = true;
		UIManager.measureInWindow(
			findNodeHandle(anchor), 
			scrollView.scrollResponderInputMeasureAndScrollToKeyboard
		);
	}

	onKeyboardWillHide = () => {
		this.refs.scrollView.scrollTo({y: 0});
	}


	render() {
		if(!this.props.scrollToKeyboardOnFocus) {
			return super.render();
		}

		return (
			<ScrollView
				ref='scrollView'
				style={styles.scrollview}
				onKeyboardWillShow={this.onKeyboardWillShow}
				onKeyboardWillHide={this.onKeyboardWillHide}
				keyboardShouldPersistTaps='always'
				automaticallyAdjustContentInsets={false}
				scrollEnabled={false}
			>
				{super.render()}
				<View ref='anchor' />
			</ScrollView>
		);
	}
}

const styles = {
	scrollview: {
		flex: 0,
		flexGrow: 0,
    	overflow: 'visible',
	},
};

module.exports = DialogAnimation;
