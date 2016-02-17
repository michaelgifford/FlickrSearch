/**
 * FlickrSearch - PhotoView.js
 * Michael Gifford
 * DESC: Render function and styling for enlarged view & title of single photo on selection
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var getImgURI = require('./getImgURI');

// Create PhotoView
var PhotoView = React.createClass({
  render: function() {
    return (
      <ScrollView>
        <View >
          <Image
            source={getImgURI(this.props.photo)}
            style={styles.imageSpecs}/>
          <Text style={styles.imageTitle}>{this.props.photo.title}</Text>
        </View>
        <View style={styles.photoViewSeparator} />
      </ScrollView>
    );
  },
});

// PhotoView styles
var styles = StyleSheet.create({
  imageSpecs: {
    flex: 1,
    height: 531.25,
    width: 375,
    alignSelf: 'center',
  },
  imageTitle: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 18,
  },
  mainPane: {
    flexDirection: 'row',
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  photoViewSeparator: {
    backgroundColor: '#ffffff',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

module.exports = PhotoView;