/**
 * FlickrSearch - SearchBox.ios.js
 * Michael Gifford
 * DESC: Render function and styling of search box
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  TextInput,
  StyleSheet,
  View,
} = React;

// Create Search Box
var SearchBox = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBox}>
        
        <TextInput
          onChange={this.props.alterSearch}
          onFocus={this.props.onFocus}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search Flickr Photos..."
          placeholderTextColor="#ffffff"
          style={styles.searchBoxInput}/>
        
        <ActivityIndicatorIOS
          animating={this.props.loadingNow}
          style={styles.loadingSpin}/>

      </View>
    );
  }
});

// SearchBox styles
var styles = StyleSheet.create({
  searchBox: {
    marginTop: 64,
    paddingLeft: 8,
    padding: 3,
    marginBottom: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0862b8',
  },
  searchBoxInput: {
    color: '#ffffff',
    fontSize: 16.5,
    flex: 1,
    height: 35,
  },
  loadingSpin: {
    width: 30,
  },
});
module.exports = SearchBox;