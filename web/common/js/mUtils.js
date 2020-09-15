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

