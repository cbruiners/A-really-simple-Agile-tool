$('document').ready(init);
	function init(){
			var incCardNo;
			var incColNo = 1;
			var items;
			var columns = '#coltodo, #col1, #col2, #col3, #col4, #col5' //TODO: Check where this variable is used
			var columnswidth = 0;
			var addColWidth = 0;
			showColumns();
			calcBoardWidth();
			
			$(".infopane").draggable();
			
			// CALCULATES TASK BOARD WIDTH
			function calcBoardWidth(){
				$("div[id^='col']").each(function(n, i) {
					if (n == 0){	
						columnswidth = $(this).width();
						addColWidth = 10;
						incColNo = 1;
					} else {
						columnswidth += $(this).width();
						addColWidth += 10;
						incColNo = incColNo + 1;
						$("#board").width(columnswidth +addColWidth);
					}
				});
			}
			
			// CARD PROGRESS - EXPERIMENTAL
			$("#progressbar").progressbar({ value: 37 });
			// END OF EXPERIMENT
			
			$("div[id^='item']").each(function(n, i) {
				if (n == 0){
					items = "#" + this.id;
					incCardNo = 1;
				} else {
					items += ",#" + this.id;
					incCardNo = incCardNo+n;
				}
			});

			//Clones a column  
				$("#addnewcol").click(function() {
					cloneCol = $('#coltodo').clone(true).attr('id',"col" + incColNo).appendTo("#board");
				   	cloneCol.css("display","block");
					cloneCol.find('.coltitle').html($('#coltitle').val());		
					calcBoardWidth();
				});
	
			function showColumns() {
				$(".showcolumn").click(function(){
					 	var classes = $(this).attr('class').split(" ");
						$('.'+classes[0]).slideUp('fast', function() {
						    $('.'+classes[0]).remove();
							$('#'+classes[0]).show('slow');
						  });
				});
			}
			
			$(".hidecolumn").click(function(){
				var getTitle = $("#"+$(this).parent().parent().attr("id")).hide("slow");
				addmenuitem = $("#tabmenu").append('<li class=' +$(this).parent().parent().attr('id') + '><p>' + getTitle.find('.coltitle').html() + '</p></li>');
				$("."+$(this).parent().parent().attr('id')).addClass("showcolumn");
				showColumns();
			});

			$(".reportcheck").click(function(){
				var classes = $(this).attr('class').split(" ");
				$('#'+classes[0]).toggle('slow');
			});
			
			$(".addcard").click(function() {
				cloneCard("#"+$(this).parent().parent().attr("id"));
			});
			
			function cloneCard(area) {
				var card = $('#item0').clone(true).attr('id',"item" + incCardNo).appendTo(area);
				card.css("display","block");
			}
			
			//TOGGLE THE CREATE NEW COLUMN SECTION
			$("#addnewcolumn").click(function () {
      			$("#addnewcolsec").slideToggle("slow");
				var icon = $("#addcolicon").attr("src");
				if (icon == "images/addicon.png") {
					$("#addcolicon").attr("src", "images/crossicon.png");
				} else {
					$("#addcolicon").attr("src", "images/addicon.png");
				}
    		});
			
            $(items).bind('dragstart', function(event) {
				//alert(event.target.getAttribute('id'));
                event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
            });
            
   			// bind the dragover event on the board sections
            $(columns).bind('dragover', function(event) {
                event.preventDefault();
            });

			// bind the drop event on the board sections
   			$(columns).bind('drop', function(event) {
            	var notecard = event.originalEvent.dataTransfer.getData("text/plain");
            	event.target.appendChild(document.getElementById(notecard));
				// Turn off the default behaviour without this, FF will try and go to a URL with your id's name
            	event.preventDefault();
			});
        }

		$("#coltitle").click(function() {
			$(this).val("");
		});

		$(function() {
		    $('#addnewcolumn').tipsy({gravity: 'w',delayIn: 700,});
		  });
		
		// TODO: if cookie is set to no tips then disable all tips
		//.tipsy("hide");
		
		
		
			//Inline card editable properties
			//function rerun(){
			//	$('.cardtitle').editable();
			//	$('.coltitle').editable();
			//	$('p.cardstory').editable({type:'textarea'});
			//	$('h3.priority').editable({
			//		type:'select', 
			//		options:{'Urgent':'urgent','High':'High','Medium':'Medium','Low':'Low'}
			//	});
			//	$('span.hrsremaining').editable();			
			//	$('h3.owner').editable({
			//		type:'select', 
			//		options:{'Urgent':'urgent','High':'High','Medium':'Medium','Low':'Low'}
			//	});
			//}