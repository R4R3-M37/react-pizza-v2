import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
// import './assets/scss/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)
