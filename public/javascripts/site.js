function add(me,text) {
    if ( me )
	$('#chat')
	    .append( $('<table>')
		     .append( $('<tr class="bt">')
			      .append( $('<td class="bnw">') )
			      .append( $('<td class="bn">') )
			      .append( $('<td class="bne">') ) )
		     .append( $('<tr>')
			      .append( $('<td class="bw">') )
			      .append( $('<td class="bc">')
				       .append( text ) )
			      .append( $('<td class="be">') ) )
		     .append( $('<tr class="bb">')
			      .append( $('<td class="bsw">') )
			      .append( $('<td class="bs">') )
			      .append( $('<td class="bse">') ) ) );
    else
	$('#chat')
	    .append( $('<table>')
		     .append( $('<tr class="gt">')
			      .append( $('<td class="gnw">') )
			      .append( $('<td class="gn">') )
			      .append( $('<td class="gne">') ) )
		     .append( $('<tr>')
			      .append( $('<td class="gw">') )
			      .append( $('<td class="gc">')
				       .append( text ) )
			      .append( $('<td class="ge">') ) )
		     .append( $('<tr class="gb">')
			      .append( $('<td class="gsw">') )
			      .append( $('<td class="gs">') )
			      .append( $('<td class="gse">') ) ) );
    $('html, body').animate({
	    scrollTop: $("#end").offset().top
		}, 2000);
}
