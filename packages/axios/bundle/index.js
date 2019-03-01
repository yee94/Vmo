'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var base = require('@vmojs/base');

// @ts-ignore
const AxiosDriver = {
    set: axios.post,
    ...axios
};

/**
 * Created by yee.wang on 2019-02-28
 **/
class AxiosVmo extends base.Vmo {
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
