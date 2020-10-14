import Vue from 'vue';
import Index from './index.vue';
let ComponentConstructor = Vue.extend(Index);
let instance;

/**
 *
 * @param opt.title  回显文件夹名称
 * @param opt.id  编辑时带上文件夹id
 * @param opt.parentId  编辑时带上父级文件夹id
 * @constructor
 */
let Component =  function(opt, callback) {
	opt = opt || {};
	instance = new ComponentConstructor({
		data: {
			id: opt._id || '',
			title: opt.title || '',
			parentId: opt.parentId || '',
		}
	});
	instance.$mount();
	instance.callback = callback;
	document.body.appendChild(instance.$el);
	instance.visible = true;
	return instance;
}

export default Component;
