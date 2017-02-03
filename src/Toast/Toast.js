
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
var Popover = require('../Popover');
var DialogAnimation = require('../Dialog/DialogAnimation');

class Toast extends Component {
	static propTypes = {
		message: PropTypes.string,
		duration: PropTypes.number,
		open: PropTypes.bool,
		onRequestClose: PropTypes.func,
		children: PropTypes.node,
	};

	static defaultProps = {
		duration: 2000,
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
				clearTimeout(this.autoHideTimerId);
			}
		}
	}

	componentWillUnmount() {
		clearTimeout(this.autoHideTimerId);
	}

	setAutoHideTimer = () => {
		clearTimeout(this.autoHideTimerId);
		this.autoHideTimerId = setTimeout(() => {
			const {open, onRequestClose} = this.props;
			if(open && onRequestClose) {
				onRequestClose();
			}
		}, this.props.duration);
	}

	render() {
		const {
			style,
			message,
			children,
			...other,
		} = this.props;

		let content = children;
		if(typeof message === 'string') {
			content = (
				<Text style={styles.message}>
					{message}
				</Text>
			);
		}

		return (
			<Popover
				{...other}
				animation={DialogAnimation}
				layerStyle={styles.layer}
				style={[styles.toast, style]}>
				{content}
			</Popover>
		);
	}
}

const styles = {
	layer: {
		justifyContent: 'center',
	},
	toast: {
		alignSelf: 'center',
		backgroundColor: 'rgba(40,40,40,.75)',
		borderRadius: 5,
		paddingVertical: 8,
		paddingHorizontal: 15,
		marginHorizontal: 15,
    },
    message: {
    	color: 'white',
    	textAlign: 'center',
    	fontSize: 16,
    },
};

module.exports = Toast;
