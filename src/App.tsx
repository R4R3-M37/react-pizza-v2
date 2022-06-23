import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { styles } from 'styles'
import { SearchContext } from 'context'

import { Cart, Homepage } from 'pages'
import { Header } from 'components'

const App: React.FC = () => {
	const [searchInput, setSearchInput] = useState<string>('')

	return (
		<div className={styles.wrapper}>
			<SearchContext.Provider value={{ searchInput, setSearchInput }}>
				<Header />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/cart' element={<Cart />} />
				</Routes>
			</SearchContext.Provider>
		</div>
	)
}

export default App
