import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './core/styles/grid.css'
import 'slick-carousel/slick/slick.css'
//import 'slick-carousel/slick/slick-theme.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
