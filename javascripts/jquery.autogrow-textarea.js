(function($) {
    $.fn.autogrow = function(options) {
        
        this.filter('textarea').css({'overflow': 'hidden'}).each(function() {

            var $this       = $(this),
                minHeight   = $this.height(),
                lineHeight  = parseInt($this.css('lineHeight'));//get real integer value for line height
            
            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $(this).width(),
                whiteSpace:	'pre-line',//that would format line breaks as <br /> does
                fontSize:   $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);

            var update = function() {
            	
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i ++) r += string;
                    return r;
                };
				                
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
				    .replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' ' });
                
                shadow.html(val);

                $(this).css('height', Math.max(shadow.height() + lineHeight, minHeight));
                
                //strip breaks from textarea fields
				$(this).val($(this).val().replace(/<br[ \/]*>/g,'\n'));
            }

            $(this).change(update).keyup(update).keydown(update);
            
            update.apply(this);
            
        });
        
        return this;
    }
})(jQuery);