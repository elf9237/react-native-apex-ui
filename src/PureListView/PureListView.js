
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {View, ListView, Dimensions, Platform, StyleSheet} from 'react-native';

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement;

type Props = {
  data: Data;
  renderEmptyList?: ?RenderElement;
  minContentHeight: number;
  contentInset: { top: number; bottom: number; };
};

type State = {
  contentHeight: number;
  dataSource: ListView.DataSource;
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class PureListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
  };

  constructor(props: Props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: props.rowHasChanged || ((row1, row2) => row1 !== row2),
      sectionHeaderHasChanged: props.sectionHeaderHasChanged || ((s1, s2) => s1 !== s2),
    });

    this.state = {
      dataSource: cloneWithData(dataSource, props.data),
    };

    (this: any).renderFooter = this.renderFooter.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data),
      });
    }
  }

  render() {
    return (
      <ListView
        initialListSize={10}
        pageSize={LIST_VIEW_PAGE_SIZE}
        {...this.props}
        ref="listview"
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
      />
    );
  }

  scrollTo(...args: Array<any>) {
    this.refs.listview.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this.refs.listview.getScrollResponder();
  }

  renderFooter(): ?ReactElement {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

module.exports = PureListView;
