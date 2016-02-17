/**
 * FlickrSearch - GridCell.js
 * Michael Gifford
 * DESC: Styles and render function for a cell of the grid view of photo results
 */
'use strict';

var React = require('react-native');
var {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var getImgURI = require('./getImgURI');

// Create GridCell
var GridCell = React.createClass({
  render: function() {
    var TouchableElement = TouchableHighlight;
    var title = this.props.photo.title;

    return (
      <View style={styles.viewContainer}>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <Image
            source={getImgURI(this.props.photo)}
            style={styles.cellImage}/>
        </TouchableElement>
      </View>
    );
  }
});

// GridCell styles
var styles = StyleSheet.create({
  viewContainer: {
    flexDirection:'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cellBorder: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 10,
  },
  cellImage: {
    height: 206.667,
    width: 155,
    margin: 15.5,
    flex: 1,
  },
});

module.exports = GridCell;