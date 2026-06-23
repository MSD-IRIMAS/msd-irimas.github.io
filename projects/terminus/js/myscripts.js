// Function to load news from json
$(document).ready(function() {
    $.getJSON("jsons/news.json", function(data){
    	var numToshow=5;
    	var newsdict = data.news;
    	for (var i=0; i< newsdict.length; i++){
    		if (i<numToshow){
    			$("#list-terminus-news").append( "<li style=\"display: list-item;\"><B>" + newsdict[i].date + ":</B> " + newsdict[i].content + "</li>" );
    		}else{
    			$("#list-terminus-news").append( "<li style=\"display: none;\"><B>" + newsdict[i].date + ":</B> " + newsdict[i].content + "</li>" );
    		}
    		
    	}

    	// + or -
    	size_li = $("#list-terminus-news li").length;
    	x = numToshow;
    	$('#see-terminus-more').click(function () {
	        x= (x+1 <= size_li) ? x+5 : size_li;
	        $('#list-terminus-news li:lt('+x+')').show();
	    });
	    $('#see-terminus-less').click(function () {
	        x=(x-5<0) ? 5 : x-5;
	        x= (x<= 5) ? 5 : x;
	        $('#list-terminus-news li').not(':lt('+x+')').hide();
	    });
    });
});

// Function to load people from json
$(document).ready(function(){
	$.getJSON("jsons/people.json", function(data){
		//permanent
		var max_cols=6;
		content_permanent = '<div class="row">';
		for (var i=0; i<data.permanent.length; i++){
			row_pic = '<div class="col-md-2" align="center"><img src="' + data.permanent[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"><br>';
			row_name = '<a href="' + data.permanent[i].link + '" target="_blank">' + data.permanent[i].firstname + '<br>' + data.permanent[i].lastname + '</a>';
			row_position = '<br>' + data.permanent[i].position + '</div>';
			content_permanent = content_permanent + row_pic + row_name + row_position;
			if (((i+1)%max_cols)==0){// create a new row
				content_permanent = content_permanent + '</div><div class="row">';
			}
		}
		if ((data.permanent.length%max_cols)==0){
			content_permanent = content_permanent + '</div>';
		}
		$("#permanent").append(content_permanent);
		//phd
		content_phd = '<div class="row">';
		for (var i=0; i<data.student.length; i++){
			row_pic_front = '<div class="flip-card-front"><img src="' + data.student[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"></div>';
			row_pic_back = '<div class="flip-card-back img-thumbnail"><br><br><p>' + data.student[i].position + '</p><p>' + data.student[i].dates + '</p></div>'
			row_pic = '<div class="col-md-2" align="center"><div class="flip-card"><div class="flip-card-inner">' + row_pic_front + row_pic_back + '</div></div>'
			row_name = '<a href="' + data.student[i].link + '" target="_blank">' + data.student[i].firstname + '<br>' + data.student[i].lastname + '</a></div>';
			content_phd = content_phd + row_pic + row_name;
			if (((i+1)%max_cols)==0){// create a new row
				content_phd = content_phd + '</div><div class="row">';
			}
		}
		if ((data.student.length%max_cols)==0){
			content_phd = content_phd + '</div>';
		}
		$("#students").append(content_phd);
		// //alumnis
		// content_alumnis = '<div class="row">';
		// for (var i=0; i<data.alumni.length; i++){
		// 	//row_pic = '<div class="col-md-2" align="center"><img src="' + data.alumni[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"><br>';
		// 	row_pic_front = '<div class="flip-card-front"><img src="' + data.alumni[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"></div>';
		// 	row_pic_back = '<div class="flip-card-back img-thumbnail"><br><br><p>' + data.alumni[i].position + '</p><p>' + data.alumni[i].dates + '</p></div>'
		// 	row_pic = '<div class="col-md-2" align="center"><div class="flip-card"><div class="flip-card-inner">' + row_pic_front + row_pic_back + '</div></div>'
		// 	row_name = '<a href="' + data.alumni[i].link + '" target="_blank">' + data.alumni[i].firstname + '<br>' + data.alumni[i].lastname + '</a></div>';
		// 	content_alumnis = content_alumnis + row_pic + row_name;
		// 	if (((i+1)%max_cols)==0){// create a new row
		// 		content_alumnis = content_alumnis + '</div><div class="row">';
		// 	}
		// }
		// if ((data.alumni.length%max_cols)==0){
		// 	content_alumnis = content_alumnis + '</div>';
		// }
		// $("#alumnis").append(content_alumnis);
		// var hidden_alumnis= true;
		// $('#alumnis').hide();
		// $('#see-alumnis').click(function () {
	    //     if (hidden_alumnis){
	    //     	$('#alumnis').show();
	    //     	$('#see-alumnis').html('<i class="fas fa-search-minus"></i>');
	    //     	hidden_alumnis = false;
	    //     }else{
	    //     	$('#alumnis').hide();
	    //     	$('#see-alumnis').html('<i class="fas fa-search-plus"></i>');
	    //     	hidden_alumnis = true;
	    //     }
	    // });
	});
});