
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, Text} from 'react-native';
const ViewPager = require('../ViewPager');
const IndicatorControl = require('./IndicatorControl');

type Props = {
  count: number;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  renderCard: (index: number) => ReactElement;
  style?: any;
  hideIndicator: boolean;
};

class Carousel extends React.Component {
  props: Props;

  render() {
    let cards = [];
    const {
      count, 
      selectedIndex, 
      renderCard,
      style,
      hideIndicator,
    } = this.props;

    for (let i = 0; i < count; i++) {
      let content = null;
      if (Math.abs(i - selectedIndex) < 2) {
        content = renderCard(i);
      }
      cards.push(content);
    }

    if(hideIndicator !== true) {
      var indicatorControl = (
        <IndicatorControl
          style={styles.indicatorControl}
          count={count}
          selectedIndex={selectedIndex}
        />
      );
    }

    return (
      <View style={style}>
        <ViewPager 
          style={styles.viewPager} 
          {...this.props} 
          bounces={true}
        >
          {cards}
        </ViewPager>

        {indicatorControl}
      </View>
    );
  }
}

var styles = {
  viewPager: {
    flex: 1,
    overflow: 'visible',
  }
};

module.exports = Carousel;
