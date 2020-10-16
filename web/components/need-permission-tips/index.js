import Vue from 'vue';
import Index from './index.vue';
let ComponentConstructor = Vue.extend(Index);
let instance;

/**
 *
 * @param opt.title  提示信息
 * @constructor
 */
let Component =  function(opt, callback) {
	opt = opt || {};
	instance = new ComponentConstructor({
		data: {
			title: opt.title || '',
		}
	});
	instance.$mount();
	instance.callback = callback;
	document.body.appendChild(instance.$el);
	instance.visible = true;
	return instance;
}

export default Component;
