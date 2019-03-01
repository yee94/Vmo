'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

// @ts-ignore
const AxiosDriver = {
    set: axios.post,
    ...axios
};

/**
 * Created by yee.wang on 2019-02-28
 **/
class Vmo {
    /**
     * 用于转换数据到Model
     * @param data
     */
    load(data) {
        Object.keys(data).forEach(key => {
            if (this["__proto__"].hasOwnProperty(key)) {
                this[key] = data[key];
            }
        });
        return this;
    }
    constructor(data) {
        if (data !== undefined) {
            this.load(data);
        }
    }
    toJs() {
        const keys = Object.keys(this);
        const object = {};
        keys.forEach(key => {
            if (!/^(function|undefined)$/.test(typeof this[key])) {
                object[key] = this[key];
            }
        });
        return object;
    }
}

/**
 * Created by yee.wang on 2019-03-01
 **/

/**
 * Created by yee.wang on 2019-02-28
 **/
class AxiosVmo extends Vmo {
    /**
     * 获取模型集合
     * @param options
     */
    static async list(...options) {
        return null;
    }
    /**
     * 获取模型
     * @param options
     */
    static async get(...options) {
        return null;
    }
    /**
     * 保存模型数据
     * @param data
     * @param options
     */
    static async set(data, ...options) { }
}
AxiosVmo.driver = AxiosDriver;

exports.AxiosVmo = AxiosVmo;
