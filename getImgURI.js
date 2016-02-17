/**
 * FlickrSearch - getImgURI.js
 * Michael Gifford
 * DESC: Function that grabs URI of photo from flickr
 */
'use strict';
var React = require('react-native');

function getImgURI(photo: Object): {uri: ?string} {
  var uri = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server +"/" + photo.id + "_" + photo.secret +".jpg";
  return { uri };
}

module.exports = getImgURI;