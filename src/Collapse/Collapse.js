
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, LayoutAnimation} from 'react-native';
var PureListView = require('../PureListView');

class Collapse extends Component {
	static propTypes = {
		activeKeys: PropTypes.array,
		accordion: PropTypes.bool,
		renderPanel: PropTypes.func.isRequired,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		accordion: true,
	};

	constructor(props) {
		super(props);

		const activeKeys = Array.isArray(props.activeKeys) 
			? props.activeKeys : [];
		this.state = {
			activeKeys,
		};
	}

	onPressItem = (panelKey) => {
		let activeKeys = [...this.state.activeKeys];
		let index = activeKeys.indexOf(panelKey);
		let isActive = index > -1;

		if (isActive) {
			activeKeys.splice(index, 1);
		} else {
			activeKeys.push(panelKey);
		}

		this.setActiveKeys(activeKeys);
	}

	setActiveKeys(activeKeys) {
		if(this.props.accordion) {
			activeKeys = [activeKeys.pop()];
		}
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		//update all rows
		this.refs.purelistview.refs.listview._prevRenderedRowsCount = 0;
		this.setState({activeKeys});
		this.props.onChange && this.props.onChange(activeKeys);
	}

	renderRow = (rowData, sectionID, rowID) => {
		const {renderPanel} = this.props;

		if(!renderPanel) {
			console.warn('prop: renderPanel is required.');
			return;
		}

		const panel = renderPanel(rowData, sectionID, rowID);
		const panelKey = panel.props.panelKey || rowID;
		const expanded = this.state.activeKeys.indexOf(panelKey) > -1;

		return React.cloneElement(panel, {
			panelKey,
			expanded,
			rowData,
			onPress: () => this.onPressItem(panelKey),
		});
	}

	render() {
		return (
			<PureListView 
                {...this.props}
                ref='purelistview'
                renderRow={this.renderRow}
            />
		);
	}
}

module.exports = Collapse;