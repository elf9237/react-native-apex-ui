
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

class AutoHide extends Component {
	static propTypes = {
		duration: PropTypes.number,
		open: PropTypes.bool,
		onRequestClose: PropTypes.func,
	};

	static defaultProps = {
		duration: 3000,
	};

	componentDidMount() {
		if(this.props.open) {
			this.setAutoHideTimer();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.open !== this.props.open) {
			if (this.props.open) {
				this.setAutoHideTimer();
			} else {
				clearTimeout(this.autoHideTimerID);
			}
		}
	}

	componentWillUnmount() {
		clearTimeout(this.autoHideTimerID);
	}

	setAutoHideTimer = () => {
		clearTimeout(this.autoHideTimerID);
		this.autoHideTimerID = setTimeout(() => {
			const {open, onRequestClose} = this.props;
			if(open && onRequestClose) {
				onRequestClose();
			}
		}, this.props.duration);
	}
}

module.exports = AutoHide;
