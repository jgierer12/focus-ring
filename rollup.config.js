import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default [
	{
		entry: 'src/index.js',
		plugins: [
			resolve(),
			buble(),
			uglify({}, minify)
		],
		targets: [
			{
				dest: pkg.module,
				format: 'es'
			},
			{
				dest: pkg.main,
				format: 'umd',
				moduleName: 'focusRing'
			}
		]
	}
];
