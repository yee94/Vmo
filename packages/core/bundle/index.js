'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function mapValue(arr, instance) {
    if (arr instanceof Array) {
        return arr.map(data => new instance(data));
    }
    return null;
}
function Field(target, name) {
    const descr = {
        enumerable: true,
        configurable: true,
        writable: true
    };
    return descr;
}

exports.Vmo = Vmo;
exports.mapValue = mapValue;
exports.Field = Field;
