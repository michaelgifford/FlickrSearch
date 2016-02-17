/**
 * FlickrSearch - index.ios.js
 * Michael Gifford
 * DESC: Index page for iOS
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var SearchComponent = require('./SearchComponent');

var FlickrSearch = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.viewContainer}
        initialRoute={{
          title: 'FlickrSearch',
          component: SearchComponent,
          titleTextColor: '#0862b8',
        }
      }/>
    );
  }
});

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
AppRegistry.registerComponent('FlickrSearchmg', () => FlickrSearch);