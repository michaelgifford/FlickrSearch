/**
 * FlickrSearch - SearchComponent.js
 * Michael Gifford
 * DESC: Main search functionality, integration of search box, grid view, and single photo view components
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
  Picker,
  Select,

} = React;

//var invariant = require('invariant');
var TimerMixin = require('react-timer-mixin');
var dismissKeyboard = require('dismissKeyboard');

var GridCell = require('./GridCell');
var PhotoView = require('./PhotoView');
var SearchBox = require('./SearchBox');

var DropDownSelect = require('./DropDownSelect');

// API Constants
const FLICKR_API_KEY = '161c811dea5fcf85b2467b027fef9775'; 
const FLICKR_SEARCH_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&privacy_filter=1&safe_search=1&nojsoncallback=1';

// Variables to check loading state and hold results cache
var loadingState = {};
var resultsCache = {
  queryData: {},
  queryTotal: {},
  queryNextPageNum: {},
};

// Main Search Component
var SearchComponent = React.createClass({
  mixins: [TimerMixin],
  timeoutID: (null: any),




  getInitialState: function() { // get state of app
    return {
      loadingNow: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      loaded: false,
      queryNum: 0,
    };
  },

  getComponentData: function() { // get component data
    this.getData('');
  },

  queryURL: function(query: string, pageNum: number): string { //get the query url
    var selectedSortType = this.refs.ddselect.getSelectedState();
    selectedSortType = selectedSortType.toString();

    if (query) {
      if(selectedSortType == "Date Posted - Ascending"){
        console.log("queryurl function" + "if 1");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'date-posted-asc');
      } else if(selectedSortType == "Date Posted - Descending") {
             console.log("queryurl function" + "if 2");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'date-posted-desc');
      } else if(selectedSortType == "Date Taken - Ascending") {
               console.log("queryurl function" + "if 3");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'date-taken-asc');
      } else if(selectedSortType == "Interestingness - Ascending") {
             console.log("queryurl function" + "if 4");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'date-taken-desc');
      } else if(selectedSortType == "Interestingness - Descending") {
             console.log("queryurl function" + "if 5");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'interestingness-desc');
      } else if(selectedSortType == "Relevance") {
               console.log("queryurl function" + "if 6");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum + '&sort=' + 'interestingness-asc');
      } else {
             console.log("queryurl function" + "if 7");
        return (FLICKR_SEARCH_URL + '&api_key=' + FLICKR_API_KEY + '&text=' + encodeURIComponent(query) + '&page=' + pageNum);
    } 
  }
  },

  getData: function(query: string) {
    this.setState({filter: query});
    this.timeoutID = null;
    var cacheResults = resultsCache.queryData[query];

/* // Cache commented out while working on dropdown sorting
    if (cacheResults) {
      if (!loadingState[query]) { // if results exist and loading state is negative
        this.setState({
          dataSource: this.getDataSrc(cacheResults), // show results
          loadingNow: false //set loading indicator to false
        });
      } else {
        this.setState({loadingNow: true}); //if results do not yet exist set loading indicator to true
      }
      return;
    }
    */

    loadingState[query] = true; // set loading state to true when no results exist for terms
    resultsCache.queryData[query] = null;
    this.setState({
      loadingNow: true,
      queryNum: this.state.queryNum + 1,
      isLoadingTail: false,
    });

    fetch(this.queryURL(query, 1), {method: "GET"}) // fetch photos
      .then((response) => response.json())
      .then((responseData) => {
        
        loadingState[query] = false; // received results, no longer loading

        resultsCache.queryTotal[query] = responseData.photos.total; // set cached results
        resultsCache.queryData[query] = responseData.photos.photo;
        resultsCache.queryNextPageNum[query] = 2;
        
        console.log("inside fetch");
        if (this.state.filter !== query) { // if bad query don't update state
          return;
        }

        this.setState({  // update state to show results and remove loading symbol
          loadingNow: false,
          dataSource: this.state.dataSource.cloneWithRows(responseData.photos.photo),
        });
      })
      .catch((error) => {  // catch error on query to flickr
        loadingState[query] = false;
        resultsCache.queryData[query] = undefined; // turn off loading & set cached results 

        this.setState({ // set state to query results
          dataSource: this.getDataSrc([]),
          loadingNow: false,
        });
      })
      .done();
  },

  alterSearch: function(event: Object){ // Text in search bar is changed, update query
    var filter = event.nativeEvent.text.toLowerCase();
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.getData(filter), 120);
  },

  photoSelected: function(photo: Object) { // photo selected, call single photo view
      dismissKeyboard();
      this.props.navigator.push({
        title: photo.title,
        component: PhotoView,
        passProps: {photo},
      });
  },

  getDataSrc: function(photos: Array<any>): ListView.DataSource { //get data source
    return this.state.dataSource.cloneWithRows(photos);
  },

  renderRow: function( // render grid row
    photo: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <GridCell
        key={photo.id}
        onSelect={() => this.photoSelected(photo)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        photo={photo}/>
    );
  },

  render: function() { // Render main page of app
    var content = this.state.dataSource.getRowCount() === 0 ?
      <PhotosNotFound
        filter={this.state.filter}
        loadingNow={this.state.loadingNow}/> 
        :
      <ListView
        ref="listView"
        renderSeperator={this.renderSeperator}
        contentContainerStyle={styles.listContainer}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentsInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}/>;
    return (

      <View style={styles.viewContainer}>
        <SearchBox
        ref="searchbox"
          alterSearch={this.alterSearch}
          loadingNow={this.state.loadingNow}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}/>
           
            <View style={styles.gridSeparator} />
            {content}
                
                <DropDownSelect ref="ddselect"/>


        <View style={styles.gridSeparator} />
 
      </View>
    );
  },
});

// No results for entered search terms
var PhotosNotFound = React.createClass({
  render: function() {
    var noResultsString = '';
    
    if (this.props.filter) {
      noResultsString = `No photos found for "${this.props.filter}"`;
    } else if (!(this.props.loadingNow)) {
      noResultsString = '';
    }

    return (
      <View style={[styles.viewContainer, styles.centerText]}>
        <Text style={styles.photosNotFoundText}>{noResultsString}</Text>
      </View>
    );
  }
});

// SearchComponent Styles
var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
    //height: 500,
    marginBottom: -100,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  centerText: {
    alignItems: 'center',
  },
  photosNotFoundText: {
    marginTop: 100,
    color: '#303030',
  },
  gridSeparator: {
    height: 1,
    backgroundColor: '#ffffff',
  },
});

module.exports = SearchComponent;