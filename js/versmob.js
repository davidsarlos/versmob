/**
 * versmob.hu @ 2011.03.24.
 *
 */
$(document).ready(function(){
		
	$("#page1 .bg").delay(1500).animate({marginTop: 0}, 300);
	$("#page1 .nms").delay(1700).fadeIn("slow");
	
	self.speed = 450;
	$(".go_fikcio").click(function(){
		goFikcio(-180);
	});
	$(".go_doku").click(function(){
		if ($("#kapcsolo").hasClass("k_doku")) return true;
		goDoku(-360);
	});
	
	$(".button_stab").click(function(){
		$("#stablist1").hide();
		$("#stablist2").hide();
		$("#stablist"+$(this).attr("rel")).show();
		$("#stablist").fadeToggle("fast");
	});
	$("#stablist .button_close").click(function(){
		$("#stablist").fadeOut("fast");
	});
	
	$("#feedback").css({left: (($("body").width()-$("#feedback").width())/2)+5});
	$("#feedbackbutton").click(function(){
		if ($("#feedback").height()==35){
			$("#feedback").animate({height: 230}, 300);
		}else{
			$("#feedback").animate({height: 35}, 300);
		}
	});
	$("#feedbackcontent .input").focus(function(){
		if ($(this).val()==$(this).attr("rel")){
			$(this).val("");
		}
	});
	$("#feedbackcontent .input").blur(function(){
		if ($(this).val()==""){
			$(this).val($(this).attr("rel"));
		}
	});
	$("#f_send").click(function(){
		var error = "";
		var data = {
			mail: $("#f_mail").val(),
			message: $("#f_message").val()
		};
		if (data.mail=="" || data.mail==$("#f_mail").attr("rel")) error = "Nem adtad meg az e-mail címed!";
		if (data.message=="" || data.message==$("#f_message").attr("rel")) error = "Nem írtál üzenetet?!";
		
		if (error!=""){
			$("#feedbackcontent .info").html("<span class='error'>"+error+"</span>");
			return false;
		}else{
			$(".input").css("opacity",".1");
			$.post("/feedback.php", data, function(result){
				$(".input").css("opacity","1");
				if (result!=1){
					$("#feedbackcontent .info").html("<span class='error'>"+result+"</span>");					
					return false;
				}else{
					$("#feedbackcontent .info").html("<span class='ok'>Az üzenetet elküldtük.</span>");
					clearTimeout(t);
					var t = setTimeout('$("#feedback").animate({height: 35}, 300);',3000);
					$("#f_mail").val($("#f_mail").attr("rel"));
					$("#f_message").val($("#f_message").attr("rel"));
				}
			}, "json");
		}
	});
	
	if ($(window).height()>=600){
		$("body").css("overflow","hidden");
	}
	
	if (location.hash=="#2"){
        $("#flash1").hide();
		$("#pages").rotate3Di(-180, self.speed, {sideChange: function(){
            $("#pages .front").hide();
            $("#pages .back").show();
            $("#kapcsolo").removeClass("k_doku").addClass("k_fikcio");
            $("#flash2").delay(700).fadeIn("fast");
		}});		
	}else if (location.hash=="#1"){
        $("#flash2").hide();
		$("#pages").rotate3Di(0, self.speed, {sideChange: function(){
            $("#pages .back").hide();
            $("#pages .front").show();
            $("#kapcsolo").removeClass("k_fikcio").addClass("k_doku");
            $("#flash1").delay(700).fadeIn("fast");
		}});	
	}
	
	if (Math.round(Math.random())==0){
        if (!$.browser.mozilla && !((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))){
			$("#pages").rotate3Di(-180, 1);
			goDoku(-360);
        }
	}else{
	    $("#kapcsolo").removeClass("k_doku").addClass("k_fikcio");
		if ($.browser.mozilla || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
	        $("#pages .front").hide();
	        $("#pages .back").show();
	        $("#flash2").delay(700).fadeIn("fast");
		}else{
			goFikcio(-180);
		}		
	}
	
});

var t;

function goFikcio(degree){
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
		$("#kapcsolo").removeClass("k_doku").addClass("k_fikcio");
	    $("#pages .front").hide();
	    $("#pages .back").show();
	    $("#flash2").delay(700).fadeIn("fast");
	    return true;
	}
	
	$("#stablist").hide();
    $("#flash1").hide();
	$("#pages").rotate3Di(degree, self.speed, {sideChange: function(){
        $("#pages .front").hide();
        $("#pages .back").show();
        $("#kapcsolo").removeClass("k_doku").addClass("k_fikcio");
        $("#flash2").delay(700).fadeIn("fast");
	}});
}
function goDoku(degree){
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
        $("#kapcsolo").removeClass("k_fikcio").addClass("k_doku");
        $("#pages .back").hide();
        $("#pages .front").show();
	    $("#flash1").delay(700).fadeIn("fast");
	    return true;
	}
	
	$("#stablist").hide();
    $("#flash2").hide();
	$("#pages").rotate3Di(degree, self.speed, {sideChange: function(){
        $("#pages .back").hide();
        $("#pages .front").show();
        $("#kapcsolo").removeClass("k_fikcio").addClass("k_doku");
        $("#flash1").delay(700).fadeIn("fast");
	}});
}