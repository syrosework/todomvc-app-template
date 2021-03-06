'use strict';
let API = require('../api');
let Adapters = require('../adapters');
let EventEmitter = require('./event-model').EventEmitter;

/**
 * Класс модели. Отвечает за взаимодействие с данными и бизнес-логику.
 */

class Model extends EventEmitter {
	/**
	 *
	 * @param options {object} - объект дополнительных опций для конструктора
	 * options.init - дополнительная функция, которая будет вызвана при вызове конструктора
	 * options.data - данные, которые записываются в модель
	 * options.storage - тип хранилища данных
	 */
	constructor(options) {
		super();
		if (options.init) {
			if (typeof options.init !== 'function') {
				throw Error('Wrong format for Model.options.init');
			} else {
				options.init();
			}
		}
		if (options.data) {
			if (typeof options.data !== 'object') {
				throw Error('Wrong format for Model.options.data');
			} else {
				this.data = options.data;
			}
		}
		if (options.storage) {
			if (typeof options.storage !== 'string') {
				throw Error('Wrong format for Model.options.storage');
			} else {
				let adapter = Adapters[options.storage];
				if (adapter) {
					this.api = API(adapter);
				} else {
					throw Error('This type of api adapter is not specified');
				}
			}
		} else {
			this.api = API(Adapters['localStorage']);
		}
	}

	getItem(key) {
		return this.data.key;
	}

	setItem(key, data) {
		this.data[key] = data;
		this.emit('change', {
			'key' : key,
			'data' : data
		});
	}
}

module.exports = Model;
