/* SVN Version 26
 *Photostack script by idfive - 2010
 *http://www.idfive.com
*/
 

(function($) {
	$.fn.slider = function (options) {

		var config = {
			'speed'           : 200,
			'imageWidth'      : 1024,
			'startImage'      : 0,
		  'slider'          : '.gallery-slider',
		  'shade'           : '.gallery-shade',
		  'nextButton'      : '.gallery-next',
			'previousButton'  : '.gallery-previous',
			'picCaptions'     : '.caption',
			'captionContainer': '.gallery-captions'
			};
			  		
		
		return this.each(function() {
		  
		  if (options) {
  			$.extend(config, options);
    	};
		  
			var $this = $(this),
		      $images = $this.find('img'),
          $slider = $this.find(config.slider),
          $shade = $this.find(config.shade),
  		    $next = $this.find(config.nextButton),
  		    $prev = $this.find(config.previousButton),
  		    $picCaptions = $this.find(config.picCaptions),
          $caption = $this.find(config.captionContainer),
  			  current = config.startImage,
  			  count = ($images.length)-1;
  			  totalWidth = (config.imageWidth * count),
  			  offsets = [],
  			  slide = function(){
  			    $slider.stop().animate( {
  			                  "margin-left": $images.eq(current).data('meta').offset
  			      }, config.speed, 'easeOutQuad');
  			    changeCaption();
			    },
			    changeCaption = function(){
			      $caption.stop().animate({'opacity':0}, 100, function() {
              $caption.html( $images.eq(current).data('meta').caption );
              $(this).animate({'opacity':1}, 200);
            });
			    },
			    init = function(){
			      $shade.css( 'overflow','hidden' );
      			$picCaptions.css( 'display','none' );
      			$slider.css( 'cursor','pointer' );
      			
      			$images.each(function( index ) {
              var position = $( this ).position();
              var caption = $( this ).siblings(config.captions).html();
              $(this).data('meta', {'offset': -(position.left), 'caption': caption});
            });
      			
			      changeCaption();
			    };
						
			init();

      //Bind click actions:     
      $slider.click(function() {
        $next.trigger('click');
      });
      
      $next.click(function(event){
        if (current === count ) {
          current = 0;
        } else {
          current++;
        };
        slide();
        event.preventDefault();
      });
      
      $prev.click(function(event){
        if (current === 0 ) {
          current = count;
        } else {
          current--;
        };
        slide()
        event.preventDefault();
      });
		});
  };
})(jQuery);