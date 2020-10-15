import Vue from 'vue';
import Index from './index.vue';
let ComponentConstructor = Vue.extend(Index);
let instance;

/**
 * 管理协作人
 * @param documentId  文档id
 * @constructor
 */
let Component =  function(documentId, callback) {
	instance = new ComponentConstructor({
		data: {
			documentId: documentId
		}
	});
	instance.$mount();
	instance.callback = callback;
	document.body.appendChild(instance.$el);
	instance.visible = true;
	return instance;
}

export default Component;
