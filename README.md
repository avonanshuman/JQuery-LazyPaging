JQuery-LazyPaging
=================

This is a plugin written over JQuery to do a paging just like Facebook's Activities paging at home page.

Options: -
==========
onloadRequestSent: (Boolean, Default: true) - Set true to send the request in page load.
targetObj: (Default: 'activity_end_point') - Id of the object which contains the last id of shown records
targetLastAttr: (Default: 'lastActivity') - Attribute name which contains the last id of shown records
updateDiv: (Selector, Default: '#activity') - Selector to select the div which should be updated
updateURL: (URL, Default: 'paging_index.html #activity') - URL to get the next page items
relativeScrollObj:(Selector, Default: window) - Object selector whose relative the paging should work 
params: (Parameters) - additional parameters to be sent to paging URL
pagingLoadingValue: (Default: 'Loading&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/page_loading.gif" />') - Text to be shown while fetching paged items
pagingNoValue: (String, Default: 'No more updates') - Text shown when no more updates are there to be shown
pagingClass: (Class, Default: 'more_paging') - classname to style the paging element
firePagingHeight: (pixel, Default: 200) - height in pixels to fire the paging algo before reaching to bottom of the relative scroll object while scrolling
onScroll: (Boolean, Default: true) - Set false if not want to initiate paging while scrolling
timesScroll: (integer, Default: 0) - Set how many times scrolling fetches the data. 0 means infinite.
onClick: (Boolean, Default: true) - Set false if not want to initiate paging while clicking the paging element
debug: (Boolean, Default: false) - Set true to activate the debug mode
onSuccess: (function) - Function to be called after fetching paged items