
'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  View,
  StyleSheet,
  ScrollView,
  ViewPagerAndroid,
  Platform,
} = ReactNative;

type Props = {
  count: number;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  bounces?: boolean;
  children?: any;
  style?: any;
  lazy: boolean;
  animated: boolean;
};

type State = {
  width: number;
  height: number;
  selectedIndex: number;
  initialSelectedIndex: number;
};

class ViewPager extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
    };
    (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
    (this: any).adjustCardSize = this.adjustCardSize.bind(this);
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIOS();
    } else {
      return this.renderAndroid();
    }
  }

  renderIOS() {
    return (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        bounces={!!this.props.bounces}
        scrollEnabled={this.props.scrollEnabled}
        scrollsToTop={false}
        onMomentumScrollEnd={this.handleHorizontalScroll}
        onScrollBeginDrag={e => this._dragging = true}
        onScrollEndDrag={e => this._dragging = false}
        // onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    );
  }

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref="scrollview"
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={styles.container}>
        {this.renderContent()}
      </ViewPagerAndroid>
    );
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        let animated = !!this.props.animated;
        let x = nextProps.selectedIndex * this.state.width;
        this._dragging || this.refs.scrollview.scrollTo({
          x: x || 0,
          animated,
        });
        this.state.selectedIndex = nextProps.selectedIndex;
      } else {
        this.refs.scrollview.setPage(nextProps.selectedIndex);
        this.setState({selectedIndex: nextProps.selectedIndex});
      }
    }
  }

  renderContent(): Array<ReactElement> {
    var {selectedIndex, width, height} = this.state;
    var style = Platform.OS === 'ios' && styles.card;
    return React.Children.map(this.props.children, (child, i) => (
      <PageItem 
        key={'r_' + i}
        style={style} 
        width={width}
        height={height}
        selected={selectedIndex === i}
        lazy={this.props.lazy}
      >
        {child}
      </PageItem>
    ));
  }

  handleHorizontalScroll(e: any) {
    var selectedIndex = e.nativeEvent.position;
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width,
      );
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }
    if (this.props.selectedIndex !== selectedIndex) {
      this.setState({selectedIndex});
      const {onSelectedIndexChange} = this.props;
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
    }
  }
}

ViewPager.defaultProps = {
  animated: true,
  scrollEnabled: true,
  selectedIndex: 0,
}

var PageItem = React.createClass({
  getDefaultProps: function() {
    return {
      lazy: false,
    };
  },

  getInitialState: function() {
    return {
      hasBeenSelected: this.props.selected,
    };
  },

  componentWillReceiveProps: function(nextProps: { selected?: boolean }) {
    if (nextProps.selected && !this.state.hasBeenSelected) {
      this.setState({hasBeenSelected: true});
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selected || nextProps.width != this.props.width;
  },

  render() {
    let {lazy, style, children, width, height} = this.props;

    if (!lazy || this.state.hasBeenSelected) {
      var pageContents = children;
    } else {
      var pageContents = <View />;
    }

    return (
      <View style={[style, {width, height}]}>
        {pageContents}
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  }
});

module.exports = ViewPager;
