!(function(global, factory){
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.colorType = factory()
}(this,function(){
	function Color(color){
		this.color = color;
	}

	Color.prototype.toRGB = function(){
		var color = this.color;
		switch(true){
			case color.indexOf('#')==0||color.toString().length==6:
				color = hex_to_rgb(color.substring(0,color.toString().length));
				break;
			case color.indexOf('hsl')>-1||color.indexOf('HSL')>-1:
				color = hsl_to_rgb(color,'hsl');
				break;
			case color.indexOf('%')>-1:
				color = hsl_to_rgb(color,'%');
				break;
		}
		return color
	}

	Color.prototype.toHSL = function(){
		var color = this.color;
		switch(true){
			case color.indexOf(',')>-1:
				color = rgb_to_hsl(color);
				break;
			case color.indexOf('#')==0||color.length==6:
				color = hex_to_hsl(color);
				break;
		}
		return color
	}

	Color.prototype.toHEX = function(){
		var color = this.color;
		switch(true){
			case color.indexOf('hsl')>-1||color.indexOf('HSL')>-1:
				var rgbColor = hsl_to_rgb(color,'hsl');
				color = rgb_to_hex(rgbColor);
				break;
			case color.indexOf('%')>-1:
				var rgbColor = hsl_to_rgb(color);
				color = rgb_to_hex(rgbColor);
				break;
			case color.indexOf('rgb')>-1||color.indexOf('RGB')>-1:
				var arr = color.split('(')[1].split(')')[0];
				arr = arr.split(',');
				color = rgb_to_hex(arr);
				break;
		}
		return color
	}

	function rgb_to_hex(color){
		return color[0].toString(16)+color[1].toString(16)+color[2].toString(16)
	}

	function rgb_to_hsl(color){
		var arr = [];
		if(color.indexOf('rgb')>-1||color.indexOf('RGB')>-1){
			arr = color.split('(')[1].split(')')[0];
			arr = arr.split(',');
		}else{
			arr = color.split(',');
		}
		var r = arr[0]/255, g = arr[1]/255, b = arr[2]/255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, 
	    	s, 
	    	l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d*60 + (g<b?360:0); break;
	            case g: h = (b - r) / d*60 + 120;break;
	            case b: h = (r - g) / d*60 + 240;break;
	        }
	    }
	    h = parseInt(h);
	    s = parseInt(s*100);
	    l = parseInt(l*100);
	    return [h, s, l]
	}

	function hex_to_hsl(color){
		var color = color.indexOf('#')==0?color.substring(0,color.toString().length):color;
		var rgbColor = hex_to_rgb(color);
		rgbColor = ''+rgbColor[0]+','+rgbColor[1]+','+rgbColor[2]+'';
		return rgb_to_hsl(rgbColor)
	}

	function hsl_to_rgb(color,type){
		var colorArr = [];
		if(type=='hsl'||type=='HSL'){
			colorArr = color.split('(')[1].split(')')[0];
			colorArr = colorArr.split(',');
		}else{
			colorArr = color.split(',');
		}
		var h = parseInt(colorArr[0]),
			s = parseInt(colorArr[1].substring(0,colorArr[1].length-1))/100,
			l = parseInt(colorArr[2].substring(0,colorArr[2].length-1))/100;
		var c = (1-Math.abs(2*l - 1))*s,
			x = c*(1-Math.abs((h/60)%2-1)),
			m = l-c/2;
		var r,g,b;
		switch(true){
			case h>-1&&h<60:
				r = c;
				g = x;
				b = 0
				break;
			case h>59&&h<120:
				r = x;
				g = c;
				b = 0;
				break;
			case h>119&&h<180:
				r = 0;
				g = c;
				b = x;
				break;
			case h>179&&h<240:
				r = 0;
				g = x;
				b = c;
				break;
			case h>239&&h<300:
				r = x;
				g = 0;
				b = c;
				break;
			case h>299&&h<360:
				r = c;
				g = 0;
				b = x;
				break;
		}
		return [parseInt((r+m)*255),parseInt((g+m)*255),parseInt((b+m)*255)]
	}

	function hex_to_rgb(color){
		var colorArr = color.split('');
		var trans = [],
			preW = '';
		for(var i=0;i<colorArr.length;i++){
			var v = colorArr[i];
			if(i%2!=0||i==0){
				preW += v;
				if(i==colorArr.length-1){
					trans.push(preW)
				}
			}else{
				trans.push(preW)
				preW = v
			}
		}
		for(var j=0;j<trans.length;j++){
			trans[j] = parseInt(trans[j],16)
		}
		return trans
	}

	function creat_color(color){
		if(!color){
			console.error('not catch any color!');
			return false
		}
		return new Color(color)
	}
	return creat_color
}))