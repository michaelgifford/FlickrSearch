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
      canada: ''
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

  _canada: function(province: string) {

    this.setState({
      ...this.state,
      canada: province
    });
  },

  render: function() {
    return (
      <View style={styles.viewContainerDropDown}>
          <Select
          	style={styles.dropdownSelect}
          	width={350}
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="Sort Method"
            onSelect={this._canada}>
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
	//transform: [{'translate':[0,0,1]}],

  },
  dropdownSelect: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    top: -105,
	//transform: [{'translate':[0,0,1]}],

  },
  dropdownOption: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
	//transform: [{'translate':[0,0,1]}], 
  },
  
});

module.exports = DropDownSelect;