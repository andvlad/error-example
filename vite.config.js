import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'

const config = {
  plugins: [
    preact(),
    ssr(),
  ],
  resolve: {
    alias: {
     '@src': `${__dirname}/src`,
     '@renderer': `${__dirname}/renderer`,
    }
  },
  optimizeDeps: {
    include: [
      'preact',
      'preact/devtools',
      'preact/debug',
      'preact/jsx-dev-runtime',
      'preact/hooks',
    ],
  },
}

export default config
