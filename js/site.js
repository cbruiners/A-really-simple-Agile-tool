$(document).ready(function() {

	// SEARCH BOX GOT FOCUS
	$("#searchmaster").click(function() {
		$(this).val("");
	});
	// SEARCH BOX LOST FOCUS
	$("#searchmaster").blur(function() {
		$(this).val("Search");
	});
	// STORY MODAL
	$(".basic").click(function(){
		var src = "story.html";
		$.modal('<iframe src="' + src + '" height="450" width="830" style="border:0">', {
				closeHTML:"",
				containerCss:{
				backgroundColor:"#fff",
				borderColor:"#fff",
				height:450,
				padding:0,
				width:830
			},
			overlayClose:true
		});
	});
	
	// TOOLTIPS FOR TOP NAVIGATION
	$(function() {
	    $('.tiptopmenu').tipsy({gravity: 'w'});
	  });
});