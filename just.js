// JavaScript Document
	  var key="linktable";
	  var urls='profile';
	  var items='';
	 var myVar2=0;
	 var timer=0;
	var m = 0;
	  var start=1,current, cSection, cQp,insert,curDiv;
	  var cDiv=new Array;
	  
$(document).ready(function() {
	
    insert=$('#idDiv').data('type');
	//localStorage.removeItem('subjects-1464254379577');
	
	$('.adminsc').attr({'id':key});
	$(".button-collapse").sideNav();//materialize navbar initialization
	
	  $('.table').click(function() {
        key=$(this).attr('id');//tablename
		$('.adminsc').attr({'id':key});
		q=$(this).attr('data-col');//search query/column like seniors1/juniors1/
		admins(q);//loads all the data from database
		$('.adminsc').val('');
    });
	
	$('select').material_select();
	imageupload();
	loadprofile();
	admins('');
	adminSearch()
	
	$("#fileinput").on("change", function() {
        $("#forrm").submit();
    });
	
	$(".dash_items").click(function(){//loads pages via ajax unto the dashboard
	if(!($(this).children('a').hasClass('blue-text'))){
			urls=this.id;
		loadprofile(this);
	}
	});
	
	$(".logo-hm").hover(function(){
		$('.cami').removeClass("hide");
		}, function(){
    	$('.cami').addClass("hide");
	}); 
	
$('body').on('click','#another',(function(){
	$('#result').empty();
	 	$('.sub_exam').slideUp();
		$('.libdiv').slideDown();
	}));
	
});

function admins(q)
{
	call=$.ajax({
		url:'jsonadmin.php?src='+q+'&key='+key,
		type:"post",
		processData:false,
		contentType:false
  });
  
  call.done(function (response, textStatus,jqXHR) { 
		items = JSON.parse(response);
		product(items);
  });  	
}



function product(arr)
		{ 
			var prt=$("#checking");
			prt.empty();
			if(arr.rows==null){
				$('<h5>').addClass('center tpmgn orange-text').html('No Result Found').appendTo(prt);
			}
				for(var i in arr.rows) {
					obj = arr.rows[i];
					var sspan=$('<div>').addClass("row").attr({'id':obj[0]}).appendTo(prt);
					var num=$('<div>').addClass('col s1 m1 tpmgn').appendTo(sspan);
					num.html(parseInt(i)+1);
					
					check=$('<p>').addClass('col s1 m1 tpmgn').attr({'id':obj[0]}).appendTo(sspan);
					$('<input>').addClass('filled-in ex_input').attr({
						"id" : "filled-in-box"+i,
						"type" : "checkbox",
						'value':obj[0]
						}).appendTo(check);
				
					var lab=$('<label>').attr({
						"for" : "filled-in-box"+i,
						}).appendTo(check);
					
					anam=$('<a>').attr({'href':'dashboard.php?insertid='+obj[0]}).appendTo(sspan);
					snam=$('<span>').addClass('tpmgn col s4 m4 menu capit').appendTo(anam);
					var diffUsers=$('#diff_users');
					if(key=='linktable'){
						diffUsers.html('Users');
						snam.html(obj[1]+' '+obj[2]);
						cat=$('<div>').addClass('tpmgn col s2 m2').appendTo(sspan);
						cat_a=$('<a>').addClass('tooltipped').attr({'href':'javascript:;','data-delay':50,'data-position':'bottom','data-tooltip':obj[3]}).appendTo(cat);
						cat_i=$('<i>').addClass('material-icons').appendTo(cat_a);
						if(obj[3].split(".")[0]=='1'){
							cat_i.html('face');
						}else if(obj[3].split(".")[0]=='2'){
							cat_i.html('sentiment_neutral');
						}else{
							cat_i.html('portrait');
						}
						 $('.tooltipped').tooltip({delay: 50});
					}else{
						diffUsers.html('Schools');
						snam.html(obj[1]).removeClass('menu');
						cat=$('<span>').html(obj[4]).addClass('tpmgn col s2 m2 capit').appendTo(sspan);
						anam.attr({'href':'javascript:;'});
						snam.removeClass('menu');
						
					}
					if(key=='linktable'){
					addv=$('<div>').addClass('tpmgn col s2 m2 switch').appendTo(sspan);
						addv_label=$('<label>').appendTo(addv);
						addv_input=$('<input>').attr({'type':'checkbox','onchange':'makeAdmin(this);','id':obj[0]}).appendTo(addv_label);
						if(obj[9]==1)$(addv_input).prop('checked',true);
						addv_span=$('<span>').addClass('lever').appendTo(addv_label);
						dspad=$(document.createTextNode('User')).insertBefore(addv_input);
						appad=$(document.createTextNode('Admin')).insertAfter(addv_span);
					$('<div>').addClass('divider blue col s12').appendTo(sspan);
					}
			   }
		  }
		  
		  
function imageupload(){
	$('#fileinput').click();
}

function swapDiv(a,b)
{
	$(a).animate({
		"marginLeft":"0%","opacity":0
		},
	function(){
		$(this).hide(); 
		$(b).show(); 
	$(b).animate({
		"marginLeft":"5%","opacity":100
		})
  });		
}
function swapIn(a)
{
	$(a).animate({
		"marginLeft":"5%","opacity":100
		});	
}
function loadprofile(a){
	
	    var main=$('#main');
		if(a==undefined) a=$('#profile').get(0);
		body=document.body;
		//alert(cDiv[id]);
		var id=$(a).attr('id');
		var type=$(a).attr('data-type');
		
		if(cDiv[id]==undefined)
		{
			var divv=$('<div>').css({'opacity':0}).attr({'id':'d_'+id}).appendTo(main);
			cDiv[id]=divv;
			
			if( type!=undefined && type !=0) 
			{
				$(divv).load(id+'.php'+'?insert='+insert,function(response,status,xhr)
				{
					if(status=="success")
					{
						if(body.current ==undefined) swapIn(this)
						else swapDiv(body.current,this);
						body.current=this;
					}
				});
			}else
			{
				switch(id)
				{
					case "lib":
						getCourse(id);
					break;
				}
			}
		}else
		{
			
			if(body.current ==undefined) swapIn(cDiv[id])
			else swapDiv(body.current,cDiv[id]);
			body.current=cDiv[id];
		}
}

function upimage(){
		if($('#fileinput').val()!=''){
            var data1 = new FormData($('#forrm')[0]);                  
			 
			 //check if it is the correct file type
			var file = $('#fileinput').get(0).files[0];
            var imagefile = file.type;
            var match= ["image/jpeg","image/png","image/jpg","image/gif"];
			
			//if it is correct filetype, throw up modal and onclick, sends an ajax request
			if((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]) || (imagefile==match[3])){
				$('#confirmupload').openModal();
				$("#up_ok").click(function(){
					$('.progress').removeClass('hide');
					call2=$.ajax({
						url:'prof.php',
						data:data1,
						type:"POST",
						processData:false,
						contentType:false,
						success: function(data){
							$('.progress').addClass('hide');
							$('.profile_pic').attr({'src':data});
					    }
					});
					
				})
			}else{
				Materialize.toast('Only jpeg,jpg,png and gif file formats are allowed', 5000,'rounded red');	
			}
            
		}	
	}	
	
function viewResult(){
	$('#exxam').find('input[type=radio]:checked').each(function(){
		var t0=$(this).parents('ol').not('ol[type=A]');
		var t1=$(this).siblings('label').find('span').html();
		var t2=t0.attr('start');
		var t3=t0.attr('data-correct');
		var t4=$(this).parent().index();
		var correct=['A','B','C','D','E'];
		var grade=['A','B','C','D','E'];
		var t5=grade[t4];
		var t8=$('<div>').html(t3);
		var t6=t8.text().substring(1);
		var t9=t0.attr('id');
		var t10=t0.attr('data-id');
		t6=parseInt(t6)-1;
		var t11=$('label[for='+t9+t10+'-'+t6+']').find('span').html();
		
		var t7=correct[t6];
			var d1=$('<div>').addClass('col s12 m4').html(t2+' Your answer:'+t5+' '+t1+' ;<br/> Correct answer:'+t7+' '+t11).appendTo('#result');
        });
		$('#result').slideDown();	
}

function getCourse(id){
	var divv=cDiv[id];
	curDiv=divv;
	var libdiv=$('<div>').addClass('libdiv');
	var sub_exam=$('<div>').addClass('sub_exam tpmgn1').hide();
	var sub_exam1=$('<div>').addClass('center').appendTo(sub_exam);
	var ct=$('<h5>').html('You have completed the test. We hope you had a wonderful experience.');
	var s=$('<a>').text('Will you like to take another test?').addClass('col s6 m2 menu row').attr({'href':'javascript:;','id':'another'});				
	var s1=$('<a>').text('View Test Result').addClass('col s6 m2 btn blue darken-2 tpmgn').attr({'href':'javascript:;','onclick':'viewResult()'});
	sub_exam1.append(ct,s,s1);
	var examm=$('<div>').addClass('row').attr({'id':'examm'}).hide();
	var result=$('<div>').addClass('row tpmgn').attr({'id':'result'}).appendTo(sub_exam).hide();
	divv.append(libdiv,examm,sub_exam);
	var d=$('<div>').addClass("row tpmgn").appendTo(libdiv);
	var d1=$('<div>').addClass("col s12 nopad").appendTo(d);
	var a1=$('<a>').addClass("hoverable col s4 center exa white text-darken-2 blue-text").html('WASCE').attr({'href':'javascript:;'});
	var a2=$('<a>').addClass("hoverable col s4 center exa blue darken-2 white-text").html('JAMB').attr({'href':'javascript:;'});
	var a3=$('<a>').addClass("hoverable col s4 center exa blue darken-2 white-text").html('OTHERS').attr({'href':'javascript:;'});
	d1.append(a1,a2,a3);
	var d2=$('<div>').addClass("col s12 nopad exa").attr({'id':'moi'}).appendTo(d);
	var prevdi=$('<div>').attr({'id':'prevdi'});
	var exxam=$('<div>').attr({'id':'exxam'});
	examm.append(prevdi,exxam);	
	var aprevdi=$('<a>').attr({'id':'prev','href':'javascript:;','onclick':'prev()'}).appendTo(prevdi);
	var aiprevdi=$('<i>').addClass('material-icons row tpmgn blue-text medium').html('skip_previous').appendTo(aprevdi);
	var exan=$('#moi'); var call;
	today=parseInt((new Date()).getTime());
  var days = (1000*60)*2;
   var stored=getLocalItem(localStorage,'subjects');
   if(stored!=0){
	   if(stored.split('-')[1] !=null)  date =parseInt(stored.split('-')[1]); else date=null;
	    a=date+days;
		if(today<a && date != null){
		     $('.top-nav').hide();
          swapDiv(document.body.current,curDiv);
		  document.body.current=curDiv;
			var resp=localStorage[stored];
			items = JSON.parse(resp);
			createExam(items);
		}else{
			$('#modal0').openModal();
			call=$.ajax({
				url:'parse_url.php?url='+encodeURI('http://cbtportal.linkskool.com/get_course.php?json'),
				type:"post",
				//data:fm,
				processData:false,
				contentType:false
  			}); 
			call.done(function (response, textStatus,jqXHR) { calldone(stored,response);});
	       call.fail(function (jqXHR, textStatus,error) { Materialize.toast('connection error', 5000,'rounded red');});
		}
   }else{
	  if(navigator.onLine){
		  $('#modal0').openModal();
		call=$.ajax({
			url:'parse_url.php?url='+encodeURI('http://cbtportal.linkskool.com/get_course.php?json'),
			type:"post",
			processData:false,
			contentType:false
  }); 
    call.done(function (response, textStatus,jqXHR) { calldone(stored,response);});
	 call.fail(function (jqXHR, textStatus,error) { Materialize.toast('connection error', 5000,'rounded red');});	
	  }else{
	Materialize.toast('No internet connection', 5000,'rounded red')		
	}
   }
  
 }


function calldone(stored,resp){
        localStorage.removeItem(stored);
		  	$('.top-nav').hide();
          swapDiv(document.body.current,curDiv);
		  document.body.current=curDiv;
		$('#modal0').closeModal();
		try{
			items = JSON.parse(resp);
			date1=(new Date()).getTime();	
			localStorage.setItem('subjects'+'-'+date1,resp);
			createExam(items);
		} catch(e)
		{
			Materialize.toast('Loading Error', 5000,'rounded red');
		}
		
}

function adminSearch(){
	var sch=$('.adminsc');
	sch.keyup(function() {
		var schval=sch.val();
		key=sch.attr('id');;
			admins(schval);
	})
}

function getLocalItem(l,s)
{
	for(k in l)
	{
		if(k.search(s) !=-1) return k;	
	}
	return 0;
}

function createExam(items){
	var mm=$('#moi');
	mm.empty();
	for(var i in items){
			gre=items[i];
			var fdiv=$('<div>').addClass('row tpprof').appendTo(mm);
			var sspan=$('<span>').addClass('col s12').appendTo(fdiv);
			var sspan2=$('<span>').addClass('row').attr({'id':i}).appendTo(fdiv);
			sspan.html(i);
		for(var g in gre){
			var pl=$('<a>').addClass('col s2 l1 menu yrs').attr({'id':gre[g],'onclick':'getExam(this.id,this.parentNode.id)'}).appendTo(sspan2);
			pl.attr({'href':'javascript:;'});
			pl.html(gre[g]);
		}
		}
		
}

function getExam(yr,ex){
	start=1;
	var t=encodeURI('http://cbtportal.linkskool.com/exam_json.php?json&course='+ex+'&year='+yr);
	t=t.replace(/&/g,'~!');
	today=parseInt((new Date()).getTime());
  var days = (1000*60)*10;
   var storedex=getLocalItem(localStorage,ex+yr);
   if(storedex!=0){
	   if(storedex.split('/')[1] !=null)  date =parseInt(storedex.split('/')[1]); else date=null;
	   a=date+days;
	   if(today<a && date != null){
		   response=localStorage[storedex];
			var tr=JSON.parse(response);
			 $('.libdiv').slideUp(1000, function(){
				 $('#prevdi').show();
            $('#examm').slideDown();
        });
		   $('#exxam').empty();
			render('0',tr);
	   }else{
		 if(navigator.onLine){
	    $('#modal0').openModal();
		call=$.ajax({
		url:'parse_url.php?url='+t,
		type:"post",
		processData:false,
		contentType:false
  }); 
   call.done(function (response, textStatus,jqXHR) {alert(response);examdone(storedex,response,ex,yr);  });
  call.fail(function (jqXHR, textStatus,error) {Materialize.toast('Connection error', 5000,'rounded red');});
    }else{
		Materialize.toast('Please connect to the internet', 5000,'rounded red')
  }
	   }
   }else{
	if(navigator.onLine){
	$('#modal0').openModal();
	call=$.ajax({
		url:'parse_url.php?url='+t,
		type:"post",
		processData:false,
		contentType:false
  });
  call.done(function (response, textStatus,jqXHR) {alert(response);examdone(storedex,response,ex,yr);  });
  call.fail(function (jqXHR, textStatus,error) {Materialize.toast('Connection error', 5000,'rounded red') });	
  	}else{
	Materialize.toast('No internet connection', 5000,'rounded red');		
	}
	   
   }
}//}

function examdone(storedex,response,ex,yr){
	  localStorage.removeItem(storedex);
		try{	
	  var tr=JSON.parse(response);
	  date1=(new Date()).getTime();	
		localStorage.setItem(ex+yr+'/'+date1,response);
	   $('#modal0').closeModal();
	  $('.libdiv').slideUp(1000, function(){
		  $('#prevdi').show();
            $('#examm').slideDown();
        });
	$('#exxam').empty();
	  render('0',tr);
		}catch(e){
			Materialize.toast('Error loading Tests', 5000,'rounded red')
		}
}

function prev(){
	$('#examm').slideUp(1000, function(){
            $('.libdiv').slideDown();
        });
}

function submitExam(){
	    clearInterval(myVar2);
		$('.timd').removeClass('red-text')
		$('#examm').slideUp(1000, function(){
			$('.sub_exam').slideDown();
        });
}

function timerr(r){
	var tim2=1;var tim3=0;var tim4=1;
	var tim1=parseInt(r.split(' ')[0]); 
	if(r.split(' ')[1].search((/h/i))!=-1)tim2=60;
	if(r.split(' ').length>2){
		tim3=parseInt(r.split(' ')[2]);
	}
	timer=(tim1*tim2)+(tim3*tim4);
	m=timer;
}



function countDown(){
   m--;
   $('.timd').text('TIMER:'+m+' mins');
   //console.log(m);
   if(m==30)$('.timd').addClass('red-text');
   if(m==0)submitExam();
}


function selector(ty,bd,ar)
{
	if(ty=="exam") exam(bd,ar);
	else if(ty=="section") section(bd,ar);
	else if(ty=="qp") qp(bd,ar);
	else if(ty=="qs") qs(bd,ar);
	else if(ty=="qo") qo(bd,ar);
	else if(ty=="qf") qf(bd,ar);
	else if(ty=="af") af(bd,ar);
}
function render(a,ar,ar2,type)
{
	if(ar2 ==undefined) ar2=ar;
	if(ar ==undefined || ar[a]==undefined) return 0;
	//bd=document.body;
	bd=$('#exxam');
	
	if(ar[a].length != undefined)
	{
	  for( var i in ar[a])
	  {
		  //var p=ar[id][i].id;	
		  render(i,ar[a],ar,1);
	  }
	} else 
	{ 
		ty =ar[a].type;
		selector(ty,bd,ar[a]);
		id=ar[a].id;
		render(id,ar2,ar2);
	}
	
}
function moveNext(d)
{
	$("html, body").animate({ scrollTop: $(document).height() }, 10000);
		$(d).show();
		oldCurrent=current
		if($(current).next().attr('id')=='section')
		{
			if(cQp !=null && cQp !=undefined)$(cQp).addClass('hide');
			$(cSection).addClass('hide');$(current).next().removeClass('hide');
			cSection=$(current).next();
			
			$(current).next().next().removeClass('hide');
			current=$(current).next().next();
		}else
		{
			$(current).next().removeClass('hide');
			current=$(current).next();
		}
		if($(current).attr('id')=='qp' || $(current).attr('id')=='qf')
		{
			
			if(cQp !=null && cQp !=undefined)$(cQp).addClass('hide');
			cQp=oldCurrent;
		}
		if(cQp !=null && cQp !=undefined && $(current).data('prt')!=$(cQp).data('id'))
		{
			$(cQp).addClass('hide');
		}
		if($(oldCurrent).attr('id')=='qp' || $(oldCurrent).attr('id')=='qf')
		{
			if(cQp !=null && cQp !=undefined)$(cQp).slideUp();
			cQp=oldCurrent;
			$(cQp).children('div:first').addClass('overf').animate({height: "150px"});
			$(cQp).children('div:first').next().show();
		}
		else $(oldCurrent).slideUp().fadeOut();
		
		
	
}
function movePrev()
{
		oldCurrent=current
		if($(current).prev().attr('id')=='section')
		{
			if(cQp !=null && cQp !=undefined)$(cQp).addClass('hide');
			$(cSection).addClass('hide');$(current).prev().removeClass('hide').slideDown();
			cSection=$(current).prev();
			
			$(current).prev().prev().removeClass('hide').slideDown();;
			current=$(current).prev().prev();
		}else
		{
			$(current).prev().removeClass('hide').slideDown();;
			current=$(current).prev();
		}
		if($(current).attr('id')=='qp' || $(current).attr('id')=='qf')
		{
			if(cQp !=null && cQp !=undefined)$(cQp).addClass('hide');
			cQp=oldCurrent;
		}
		if(cQp !=null && cQp !=undefined && $(current).data('prt')!=$(cQp).data('id'))
		{
			$(cQp).addClass('hide');
		}
		if($(oldCurrent).attr('id')=='qp' || $(oldCurrent).attr('id')=='qf')
		{
			if(cQp !=null && cQp !=undefined)$(cQp).slideUp();
			cQp=oldCurrent;
			$(cQp).addClass('overf').animate({height: "150px"});
		}
		else $(oldCurrent).slideUp();
		
		
	
}


function exam(bd,ar)
{
	var p=$('<div>').addClass('hd row').attr({'id':'spScr'});
	
	var t=$('<h5>').text(ar.title).addClass('center course_title');
	//var t2=$('<div>').text(ex);
	var t3=$('<h5>').text('TIME: '+ar.description).addClass('center course_time');
	var t4=$('<div>').addClass('basic_inst').html('Take your time to understand that this test is timed. To start the test, click on the start test button below. Answer the questions to be displayed one after the othere correctly. Once you are done, click on the submit button to end the test');
	timerr(ar.description);
	var t5=$('<a>').text('START TEST').addClass('btn tpmgn blue darken-2 start_button').attr({'href':'javascript:;'}).click(function(){ 
	//myVar = setTimeout(submitExam, timer*1000);
	myVar2 = setInterval(countDown,60000);
	var ppr=$('#prevdi').hide();
	 $('#top_div').removeClass('hide');$('#nxtDiv').removeClass('hide'); $('#spScr').slideUp(); 
		var next=$('#top_div').next();
		if(next.attr('id')=='section') {$(next).removeClass('hide'); $(next).next().removeClass('hide'); cSection=$(next); current=$(next).next();  }
		else {$(next).removeClass('hide');current=$(next);}
	});
	$(p).append(t,t3,t4,t5);
	$(bd).append(p);
		
	var t6=$('<div>').addClass('col s12 hide white').attr({'id':'nxtDiv'});
	var anprev=$('<a>').addClass('col s3 m3 blue-text nopad').attr({'href':'javascript:;'}).hide().appendTo(t6).click(function()	{ movePrev()});
	var s3=$('<a>').text('SUBMIT').addClass('col s4 m2 btn blue darken-2 smlbt').css({'margin-top':'0.8em'}).attr({'href':'javascript:;'}).appendTo(t6).click(function(){ submitExam();});
	var annext=$('<a>').addClass('col s3 offset-m2 m3 offset-s1 blue-text').attr({'href':'javascript:;'}).appendTo(t6).click(function()	{ moveNext(anprev)});
	var ann1=$('<span>').addClass('prevnxt left').html('NEXT').appendTo(annext);
	var prev1=$('<i>').addClass('medium material-icons blue-text left').html('skip_previous').appendTo(anprev);
	var next1=$('<i>').addClass('medium material-icons blue-text').html('skip_next').appendTo(annext);
	var ann2=$('<span>').addClass('prevnxt').html('PREVIOUS').appendTo(anprev);
	$(bd).append(t6);
	
	var p1=$('<div>').addClass('hide row bold').attr({'id':'top_div'});
	var s=$('<span>').addClass('col s12 m5 smlbt').text(ar.title);
	//var t2=$('<div>').text(ex);
	//var s1=$('<span>').text(ar.description);
	var s2=$('<span>').addClass('col s12 m3 smlbt timd').text('TIMER:'+m+' mins');
	
	$(p1).append(s,s2);
	$(bd).append(p1);
	//t.appendTo(eex);
	
}
function section(bd,ar)
{
	var p=$('<div>').attr({'class':'hd hide bold','id':'section'});
	var t2=$('<span>').text(ar.description);
	var t3=$('<span>').text(ar.content);
	$(p).append(t2,t3);
	$(bd).append(p);
	//t.appendTo(eex);
	//start=1;
}
function qp(bd,ar)
{
	var t3=$('<div>').addClass('hide').attr({'id':'qp','data-id':ar.id,'data-prt':ar.parent,'data-correct':ar.correct});
	var t4=$('<div>').html(ar.content).appendTo(t3).css({'padding-bottom':'50px'});
	var ic=$('<div>').addClass('tgimage row').appendTo(t3).hide();
	var ic1=$('<a>').addClass('col s12 center').attr({'href':'javascript:;','id':'readC'}).appendTo(ic)
		
	var ic2=$('<i>').addClass('material-icons medium black-text').html('expand_more').appendTo(ic1).click(function(){
		if($(this).html()=='expand_more')
		{ 
		$("html, body").animate({ scrollTop: $(document).height() }, 10000);
			t4.animate({height: "100%"});
			$(this).html('expand_less');
		}else
		{
			t4.animate({height: "150px"});
			$(this).html('expand_more');
		}
			});
	$(bd).append(t3);
}

function qs(bd,ar)
{
	var t=$('<ol>').attr({'start':start}).addClass('hide').attr({'id':'qs','data-id':ar.id,'data-prt':ar.parent,'data-correct':ar.correct});;
	$(bd).append(t);
	var t2=$('<li>')
	var t3=$('<div>').html(ar.content).appendTo(t2);
	var t4=$('<div>').attr({'contentEditable':true}).addClass('abox').appendTo(t2);
	$(t).append(t2);
	start++;
}
function qf(bd,ar)
{
	var t=$('<div>').html(ar.content).addClass('hide').attr({'id':'qf','data-id':ar.id,'data-prt':ar.parent,'data-correct':ar.correct});
	$(bd).append(t);
}
function qo(bd,ar)
{
	var t=$('<ol>').attr({'start':start}).addClass('hide').attr({'id':'qo','data-id':ar.id,'data-prt':ar.parent,'data-correct':ar.correct});
	$(bd).append(t);
	var t2=$('<li>').html(ar.content);
	$(t).append(t2);
	if(ar.answer == null) return 0;
	var t3=$('<ol>').attr({'type':'A'});
	sp=ar.answer.split('||');
	for(var i in sp)
	{
		var t4=$('<li>');
		$('<input>').attr({'type':'radio','name':'qo'+ar.id,'id':'qo'+ar.id+'-'+i}).appendTo(t4).click(function(){$(this).delay(1000).queue(function(){moveNext();});});
		$('<label>').html(sp[i]).attr({'for':'qo'+ar.id+'-'+i}).appendTo(t4);
		$(t3).append(t4)
	}
	$(t2).append(t3);
	start++;
}
function af(bd,ar)
{
	if(ar.answer == null) return 0;
	var t=$('<ol>').attr({'start':start}).addClass('hide').attr({'id':'af','data-id':ar.id,'data-prt':ar.parent,'data-correct':ar.answer});
	$(bd).append(t);
	var t2=$('<li>');
	$(t).append(t2);
	var t3=$('<ol>').attr({'type':'A'});
	
	sp=ar.answer.split('||');
	for(var i in sp)
	{
		var t4=$('<li>').html(sp[i]);
		$(t3).append(t4)
	}
	$(t2).append(t3);
	start++;
}
function product(arr)
		{ 
			var prt=$("#checking");
			prt.empty();
			if(arr.rows==null){
				$('<h5>').addClass('center tpmgn orange-text').html('No Result Found').appendTo(prt);
			}
				for(var i in arr.rows) {
					obj = arr.rows[i];
					var sspan=$('<div>').addClass("row").attr({'id':obj[0]}).appendTo(prt);
					var num=$('<div>').addClass('col s1 m1 tpmgn').appendTo(sspan);
					num.html(parseInt(i)+1);
					
					check=$('<p>').addClass('col s1 m1 tpmgn').attr({'id':obj[0]}).appendTo(sspan);
					$('<input>').addClass('filled-in ex_input').attr({
						"id" : "filled-in-box"+i,
						"type" : "checkbox",
						'value':obj[0]
						}).appendTo(check);
				
					var lab=$('<label>').attr({
						"for" : "filled-in-box"+i,
						}).appendTo(check);
					
					anam=$('<a>').attr({'href':'dashboard.php?insertid='+obj[0]}).appendTo(sspan);
					snam=$('<span>').addClass('tpmgn col s4 m4 menu capit').appendTo(anam);
					var diffUsers=$('#diff_users');
					if(key=='linktable'){
						diffUsers.html('Users');
						snam.html(obj[1]+' '+obj[2]);
						cat=$('<div>').addClass('tpmgn col s2 m2').appendTo(sspan);
						cat_a=$('<a>').addClass('tooltipped').attr({'href':'javascript:;','data-delay':50,'data-position':'bottom','data-tooltip':obj[3]}).appendTo(cat);
						cat_i=$('<i>').addClass('material-icons').appendTo(cat_a);
						if(obj[3].split(".")[0]=='1'){
							cat_i.html('face');
						}else if(obj[3].split(".")[0]=='2'){
							cat_i.html('sentiment_neutral');
						}else{
							cat_i.html('portrait');
						}
						 $('.tooltipped').tooltip({delay: 50});
					}else{
						diffUsers.html('Schools');
						snam.html(obj[1]).removeClass('menu');
						cat=$('<span>').html(obj[4]).addClass('tpmgn col s2 m2 capit').appendTo(sspan);
						anam.attr({'href':'javascript:;'});
						snam.removeClass('menu');
						
					}
					if(key=='linktable'){
					addv=$('<div>').addClass('tpmgn col s2 m2 switch').appendTo(sspan);
						addv_label=$('<label>').appendTo(addv);
						addv_input=$('<input>').attr({'type':'checkbox','onchange':'makeAdmin(this);','id':obj[0]}).appendTo(addv_label);
						if(obj[9]==1)$(addv_input).prop('checked',true);
						addv_span=$('<span>').addClass('lever').appendTo(addv_label);
						dspad=$(document.createTextNode('User')).insertBefore(addv_input);
						appad=$(document.createTextNode('Admin')).insertAfter(addv_span);
					$('<div>').addClass('divider blue col s12').appendTo(sspan);
					}
			   }
		  }
	