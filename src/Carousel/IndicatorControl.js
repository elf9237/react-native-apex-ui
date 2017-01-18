
'use strict';

import React from 'react';
var StyleSheet = require('StyleSheet');
var View = require('View');

var PropTypes = React.PropTypes;

var IndicatorControl = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    count: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  },

  render: function() {
    var circles = [];
    for (var i = 0; i < this.props.count; i++) {
      var isSelected = this.props.selectedIndex === i;
      circles.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        {circles}
      </View>
    );
  }
});

var Circle = React.createClass({
  render: function() {
    var extraStyle = this.props.isSelected ? styles.full : styles.empty;
    return <View style={[styles.circle, extraStyle, this.props.style]} />;
  }
});

var CIRCLE_SIZE = 6;

var styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
});

module.exports = IndicatorControl;
