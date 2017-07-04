// $(function(){
	
	$('input#meeting-string').on('change',function(){
		var str = $(this).val();
		var myDate = new Date();
		var meetingDate = myDate.toLocaleDateString();
		if(isContains(str,'今天')){
			var day = myDate.toLocaleDateString();
			str = str.replace('今天',day+" ");
		}
		if(isContains(str,'明天')){
			myDate.setDate(myDate.getDate()+1)
			var day = myDate.toLocaleDateString();
			str = str.replace('明天',day+" ");
			meetingDate = day;
		}
		meetingDate = dateThem(meetingDate,'/','-');
		// console.log(meetingDate);
		// console.log(dateThem(meetingDate));
		
		str = str.replace(/~/g,'到');
		str = str.replace(/-/g,'到');
		str = str.replace(/至/g,'到');
		str = str.replace(/零/g,'0');
		str = str.replace(/：/g,':');
		str = str.replace(/点十五/g,':15');
		str = str.replace(/点二十五/g,':25');
		str = str.replace(/点四十五/g,':45');
		str = str.replace(/点三十五/g,':35');
		str = str.replace(/点五十五/g,':55');
		str = str.replace(/点十/g,':10');
		str = str.replace(/点二十/g,':20');
		str = str.replace(/点三十/g,':30');
		str = str.replace(/点四十/g,':40');
		str = str.replace(/点五十/g,':50');
		str = str.replace(/一/g,'1');
		str = str.replace(/二/g,'2');
		str = str.replace(/三/g,'3');
		str = str.replace(/四/g,'4');
		str = str.replace(/五/g,'5');
		str = str.replace(/六/g,'6');
		str = str.replace(/七/g,'7');
		str = str.replace(/八/g,'8');
		str = str.replace(/九/g,'9');
		str = str.replace(/十/g,'0');
		str = str.replace(/点30/g,':30');
		str = str.replace(/点半/g,':30');
		str = str.replace(/点/g,':00');
		// str = str.replace(/点/g,':00');
		

		var patt0 = /([0-9]{0,2}):/g;
		var patt1 = /:([0-9]{0,2})/g;

		var stratTime = reStr(str.match(patt0)[0])+":" + reStr(str.match(patt1)[0]);
		var endTime = reStr(str.match(patt0)[1])+":" + reStr(str.match(patt1)[1]);

		if(isContains(str,'上午')&&isContains(str,'下午')){
		 
		  var pmE =parseInt(endTime.split(":",1))+12;;	
			console.log(pmE);
			endTime = pmE+":" + reStr(str.match(patt1)[1]);
		}
		else if (isContains(str,'下午')){
		    var pmS =parseInt(stratTime.split(":",1))+12;
		    var pmE =parseInt(endTime.split(":",1))+12;
			// console.log(pmS + pmE);
			stratTime = pmS+":" + reStr(str.match(patt1)[0]);
			endTime = pmE+":" + reStr(str.match(patt1)[1]);
		}

		stratTime = dateThem(stratTime,':',':');
		endTime = dateThem(endTime,':',':');
		// $('span').text(stratTime +"到"+ endTime);
		function reStr(str){
			return(str.replace(":",""))
		}
		var mtInfo = str.split(":");
		var meetingInfo = mtInfo[mtInfo.length-1].substr(2);

		// str + "patt的值为："+ str.match(patt1)+"符合的有："+
		// $('p').html(str +'<br>' +'会议日期：'+ meetingDate +'<br>' + '开始时间：' + stratTime +'<br>' +'结束时间：'+ endTime +'<br>' + '备注：' + meetingInfo);
		if(!(stratTime&&endTime)){
			alert('从这句话里无法提取出预定会议所需要的信息，请大致按照“预约12:00-13:00 2303会议室”这样的句式来写')
		}
		else{
			
			$("#date").find("option[value='"+meetingDate+"']").attr("selected",true); 
			$("#start").val(stratTime);
			$("#end").val(endTime);
			$("#meetingTopic").val(meetingInfo);
		}
		var meetingDate = $('#date').val();
        var meetingDuration;
        var durH = ''
        if($('#start').val()&&$('#end').val()){

          var meetingStart = new Date(meetingDate+' '+$('#start').val());
          var meetingEnd = new Date(meetingDate+' '+$('#end').val());
          meetingDuration = (meetingEnd - meetingStart)/1000/60;
          var h = parseInt(meetingDuration/60);
          var m = meetingDuration - h*60;
          if(h){
              durH += h +'小时'
          }
          if(m){
              durH += m +'分钟'
          }
          if(durH<0){
            alert('马丹！你是不是弄错了点什么！时间不对啊！')
            meetingStart.val('');
            meetingEnd.val('');
          }
          else{
            $('#meetingDuration').val(durH);
          }
        }
        // console.log(dateCompare(meetingStart, meetingStart));

        // alert('我会把您说的话理解为:\n“预约'+meetingDate+" 从"+stratTime+"开始到"+endTime+"结束，持续"+durH+"的会议室。\n"+"备注信息为："+meetingInfo+"”\n如果有误可能是我理解还有问题，请您整理您的语句或手动选择以下信息~")
	});
	

// 预约今天下午2:00-5:30 ，2303会议室


	
	function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
	}
	function dateThem(dateStr,str,str2){
		var a = dateStr.split(str);
		for(i=0;i<a.length;i++){if(a[i].length<=1){a[i]='0'+a[i]}}
			var d = a.join(str2)
		return(d);
		console.log(d);

	}

// })	
	