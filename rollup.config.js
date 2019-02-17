import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    extensions,
    exclude: 'node_modules/**'
  }),
  terser()
]

export default [
  {
    input: './src/index.ts',
    external: ['@xg4/device'],
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins
  },
  {
    input: './src/index.ts',
    output: [
      {
        name: 'XService',
        file: pkg.browser,
        format: 'umd'
      }
    ],
    plugins
  }
]
