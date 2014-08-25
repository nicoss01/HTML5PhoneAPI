(function(){
	"use strict";
	window.debug=new Array();
	var console = {};
	console.log = function(){
		window.debug.push(arguments[0]);
	}
	window.console.log=console.log;
	var phone = {};
	phone.event = function(el,ev,cb){
		if(el.addEventListener) { // DOM standard
			el.addEventListener(ev, cb, false)
		} else if(el.attachEvent) { // IE
			el.attachEvent('on'+ev, cb)
		}
	}
	phone.isMobile = function(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	phone.orientation = function(){
		var o = null;
		switch(window.orientation){  
		  case -90:
		  case 90:
			o='landscape';
			break; 
		  default:
			o='portrait';
			break; 
		}	
		return o;
	}
	phone.sms = function(number,content){
		window.open("sms:"+number+"?body="+content);
		return this	
	}
	phone.call = function(number){
		window.open("tel:"+number);
		return this	
	}
	phone.vibrate = function(params){
		if(phone.test("vibrate")){
			var vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate ||  window.navigator.msVibrate;	
			if(params){
				vibrate.vibrate(params);	
			}else{
				vibrate.vibrate(1000);	
			}
		}else{
			console.log("Vibrate API does not supported");	
		}
	}
	phone.battery = function(){
		if(phone.test("battery")){
			var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;	
			return battery;
		}else{
			console.log("Battery API does not supported");	
		}
	}
	phone.telephony = function(){
		return phone.test("battery")?window.navigator.telephony:null; 	
	}
	phone.connection = function(){
		return phone.test("connection")?window.navigator.connection	:null; 	
	}
	phone.notification = function(title,msg){
		if(phone.test("Notification")){
			var notification = new Notification(title, {
				body: msg
			});
		}else{
			//console.log("Notification API does not supported");	
		}
		return this;
	}
	phone.test = function(api){
		var t = window.navigator[api] ||  window.navigator["webkit"+phone.ucfirst(api)] || window. navigator["moz"+phone.ucfirst(api)] ||  window.navigator["ms"+phone.ucfirst(api)];
		return typeof t=="undefined"?false:true;
	}
	phone.ucfirst = function(s){
		return s.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1){ return $1.toUpperCase(); })	
	}
	phone.debug = function(){
		var t = window.navigator[api] ||  window.navigator["webkit"+phone.ucfirst(api)] || window. navigator["moz"+phone.ucfirst(api)] ||  window.navigator["ms"+phone.ucfirst(api)];
		return typeof t=="undefined"?false:true;
	}
	var lastClick=null;
	var nbClick=0;
	function getClick(){
		var t=new Date();
		if(t-lastClick<500){
			nbClick=nbClick+1;
		}else{
			nbClick=1;	
			setTimeout(function(){ nbClick=0; },600);
		}
		if(nbClick==3){
			var n=document.createElement("div");
			var h="";
			for(var i=0;i<window.debug.length;i++){
				h+=" - "+window.debug[i].toString()+"<br />";
			}
			n.innerHTML="<div style='text-align:right;height:25px'><button onClick=\"document.getElementById('debugger').remove()\">X</button></div><div style='height:75px;overflow:auto'>"+h+"</div>";
			n.setAttribute("id","debugger");
			n.setAttribute("style","position:fixed;bottom:0;left:0;width:100%;height:100px;border-top:1px solid #000;background-color:#fff");
			document.getElementsByTagName("body")[0].appendChild(n);
			nbClick=0;
			lastClick=null;
		}
		lastClick=t;
	}
	phone.event(document,"touchend",getClick , false);
	phone.event(document,"mouseup",getClick , false);
	phone.event(document,"click",getClick , false);
	window.phone = phone;
})()