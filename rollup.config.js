import replace from '@rollup/plugin-replace';
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel"
import resolve from 'rollup-plugin-node-resolve'; 
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { uglify } from "rollup-plugin-uglify";

export default {
    input : ['src/index.js'],
    plugins: [
        replace({
          preventAssignment: true,
          delimiters: ['', ''],
          '#!/usr/bin/env node': ''
        }),
        json(),
        resolve(), //告诉 Rollup 如何查找外部模块
        commonjs(), //用来将 CommonJS 转换成 ES2015 模块的,用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏 CommonJS 的检测
        babel({
            exclude : 'node_modules/**'
        }),
        uglify(),
        terser(),
    ],
    external : ['commander'],
    output : {
        file : "./dist/bundle.js",
        format: "es",
        name : 'vite-plugin-vue-dynamic-path'
    }
}