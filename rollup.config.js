import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default {
  input: './src/index.js',
  external: ['XDevice'],
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'XService',
    globals: {
      XService: 'XService'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    uglify()
  ]
}
