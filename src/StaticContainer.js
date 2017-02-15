
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';

class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps: Object): boolean {
  	const {shouldUpdate} = nextProps;
  	if(typeof shouldUpdate === 'function') {
  		return shouldUpdate(this);
  	}
    return !!shouldUpdate;
  }

  render() {
    var child = this.props.children;
    return (child === null || child === false) ? null : React.Children.only(child);
  }
}

module.exports = StaticContainer;
