/**
 * FlickrSearch - DropDownSelect.js
 * Michael Gifford
 * DESC: Render function and styling for dropdown sorting menu
 */
'use strict';

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition,
} = DropDown;
var React = require('react-native');
var {
  Component,
  AppRegistry,
  Text,
  View,
  StyleSheet,
} = React;


var DropDownSelect = React.createClass({
  getInitialState: function(props) {
    this.state = {
      selectedStyle: ''
    };
    return (this.state);
  },

  componentDidMount: function() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  },

  _getOptionList: function() {
    return this.refs['OPTIONLIST'];
  },

  _canada: function(sortStyle: string) {
    this.setState({
      ...this.state,
      selectedStyle: sortStyle
    });
  },

  getSelectedState: function() {
    return (this.state.selectedStyle);
  },

  render: function() {
    return (
      <View style={styles.viewContainerDropDown}>
          <Select
          	style={styles.dropdownSelect}
          	width={375}
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="Date Posted - Descending"
            onSelect={this._canada}
            >
            <Option style={styles.dropdownOption}>Date Posted - Ascending</Option>
            <Option style={styles.dropdownOption}>Date Posted - Descending</Option>
            <Option style={styles.dropdownOption}>Date Taken - Ascending</Option>
            <Option style={styles.dropdownOption}>Date Taken - Descending</Option>
            <Option style={styles.dropdownOption}>Interestingness - Ascending</Option>
            <Option style={styles.dropdownOption}>Interestingness - Descending</Option>
            <Option style={styles.dropdownOption}>Relevance</Option>
          </Select>
          <OptionList ref="OPTIONLIST"/>
      </View>
    )
  },
});

// Dropdown styles
var styles = StyleSheet.create({
   viewContainerDropDown: {
   	justifyContent: 'center', 
   	alignItems: 'center',
   	height: 260,
   	backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginBottom: -180,
    top: -587,
  },
  dropdownSelect: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    top: -105,
  },
  dropdownOption: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
});

module.exports = DropDownSelect;