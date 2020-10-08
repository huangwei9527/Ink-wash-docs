/**
 * 公共方法
 * */

/**
 * 存储localStorage
 */
export const setLocalStorage = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getLocalStorage = name => {
	if (!name) return;
	let data = window.localStorage.getItem(name)

	return data ? JSON.parse(data) : undefined;
}

/**
 * 删除localStorage
 */
export const removeLocalStorage = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}


export const Cookie = {
	/**
	 * getCookie
	 * @param name
	 * @returns {*}
	 */
	get(name) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr[0] == name) return arr[1];
		}
		return "";
	},

	/**
	 * 添加cookie
	 * @param name
	 * @param value
	 * @param expiresHours
	 * @param domain
	 */
	set(name, value, expiresDays, domain, path) {
		var cookieString = name + "=" + (value ? value : '');
		var date = new Date();

		if (domain != undefined)
			domain = ";domain=" + domain;
		else
			domain = '';

		date.setTime(date.getTime() + (expiresDays || 1) * 24 * 3600 * 1000);
		cookieString = cookieString + domain + "; path="+ (path || "/") +"; expires=" + date.toGMTString();

		document.cookie = cookieString;
	},

	/**
	 * 删除cookie
	 * @param name
	 */
	remove(name) {
		this.set(name, '', -1);
	}
};


/**
 * @auth huangwei
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
export  const copyText = function(text) {
    var textareaEl = document.createElement('textarea');
    textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
    textareaEl.value = text;
    document.body.appendChild(textareaEl);
    textareaEl.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaEl);
    return res;
}