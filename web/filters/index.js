/**
 * 封装些共用的过滤器
 */
const filter = {
	/**
	 * 将 boolean 转换成 文字是否
	 * @param value
	 * @returns {string}
	 */
	booleanToText: function(value){
		return value ? '是' : '否'
	},
	/**
	 * 根据value获取label
	 * @param value
	 * @param list 对象列表
	 */
	getLabelText(value, list, label = 'label') {
		let data = list.find(v => v.value === value);
		if (data) {
			return data[label];
		} else {
			return ''
		}
	},
	/**
	 * 格式化时间
	 * @param date
	 * @param format
	 * @returns {*}
	 */
	formatTime(date,format = 'yyyy-MM-dd hh:mm:ss'){
		var time;
		if(!date)return "";
		if(typeof date === 'string'){
			time = new Date(date.replace(/-/g,'/').replace(/T|Z/g,' ').trim());
		}else if(typeof date === 'object'){
			time = new Date(date) ;
		}
		var o = {
			"M+": time.getMonth() + 1, //月份
			"d+": time.getDate(), //日
			"h+": time.getHours(), //小时
			"m+": time.getMinutes(), //分
			"s+": time.getSeconds(), //秒
			"q+": Math.floor((time.getMonth() + 3) / 3), //季度
			"S": time.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return format;
	}
}

export default filter
