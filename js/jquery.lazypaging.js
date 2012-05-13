(function($){
	$.fn.lazyPaging = function(method) {
		var defaults = {
			onloadRequestSent: true,
			targetObj: 'activity_end_point',
			targetLastAttr: 'lastActivity',
			updateDiv: '#activity',
			updateURL: 'paging_index.html #activity',
			relativeScrollObj:window,
			params: {},
			pagingLoadingValue: 'Loading&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/page_loading.gif" />',
			pagingNoValue: 'No more updates',
			pagingClass: 'more_paging',
			firePagingHeight: 200,
			onScroll: true,
			timesScroll: 0,
			onClick: true,
			debug: false,
			onSuccess: function(){}
		};
		var options = $.extend(defaults, options);
		options.activityPageRequestSent = false;
		var methods = {
			init : function( options ) {
				options = $.extend(defaults, options);
				options.scrollnum = 0;
				if(options.debug){ console.log('Options = '); console.log(options);}
				if(options.debug){ console.log('Target Object = '); console.log(this);}
				return this.each(function(){
					obj = $(this);
					if(!obj.hasClass(options.pagingClass))
					{
						obj.addClass(options.pagingClass);
					}
					if(options.debug){ console.log('Object = '); console.log(obj);}
					if(options.onScroll) $(options.relativeScrollObj).bind('scroll.lazyPaging'+options.targetObj, methods.paging);
					if(options.onClick) obj.bind('click.lazyPaging'+options.targetObj, methods.paging);
					obj.data('lazyPaging',options);
					methods.paging(options);
				});
			},
			destroy : function( ) {
				return this.each(function(){
					obj = $(this);
					options = obj.data('lazyPaging');
					$(options.relativeScrollObj).unbind('scroll.lazyPaging'+options.targetObj);
					obj.unbind('click.lazyPaging'+options.targetObj);
				})
			},
			paging : function( options ) {
				if(typeof(options) == 'undefined') options = obj.data('lazyPaging');
				options = $.extend(defaults, options);
				obj1 = $('#'+options.targetObj);
				if(options.debug){ console.log('Target Object = '); console.log(options.targetObj);}	
				return obj1.each(function() {
					obj2 = $(this);
					if(options.debug){ console.log('Target Object = '); console.log(options.targetObj);}
					var pagingDefaultValue = obj2.html();
					var lastId = (options.onloadRequestSent)?obj2.attr(options.targetLastAttr):'';
					obj2.addClass(options.pagingClass);
					var windowScrollHeight = $(document).scrollTop() + $(options.relativeScrollObj).height() + options.firePagingHeight;
					var endPointTop = obj2.offset().top;
					if(windowScrollHeight > endPointTop && !options.activityPageRequestSent && parseInt(lastId) != 0)
					{
						options.scrollnum++;			
						obj1.data('lazyPaging',options);
						if(options.debug){ console.log('options.timesScroll = '+options.timesScroll+' options.scrollnum = '+options.scrollnum); }
						if(options.timesScroll == options.scrollnum){ $(options.relativeScrollObj).unbind('scroll.lazyPaging'+options.targetObj);}
						options.activityPageRequestSent = true;
						options.onloadRequestSent = true;
						$('#'+options.targetObj).html(options.pagingLoadingValue);
						divId = options.targetObj+'_at_'+Math.floor(endPointTop);
						$(options.updateDiv).append('<div id="'+divId+'"></div>');
						$('#'+divId).load(
							options.updateURL,
							$.extend(options.params, {'lastId':lastId}),
							function(response, status, xhr){
								if(options.debug){ console.log('Target Object = '); console.log(options.targetObj);}
								lastId = jQuery(response).find('[id="'+options.targetObj+'"]').attr(options.targetLastAttr);
								if(options.debug){ console.log('Obj2 Object = '); console.log($('#'+options.targetObj));}
								$('#'+options.targetObj).attr(options.targetLastAttr,lastId);
								(lastId != 0)? $('#'+options.targetObj).html(pagingDefaultValue): $('#'+options.targetObj).html(options.pagingNoValue);
								options.onSuccess();
								options.activityPageRequestSent = false;
							}
						);
					}else{
						(lastId != 0)? obj2.html(pagingDefaultValue): obj2.html(options.pagingNoValue);
					}
				});
			}
		};

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.lazyPaging' );
		}    
	};
})(jQuery);