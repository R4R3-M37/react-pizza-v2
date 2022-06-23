import React from 'react'

import { categories } from 'styles'
import { CategoryListProps } from 'types'

const Categories: React.FC<CategoryListProps> = ({ categoryActive, setCategoryActive, categoryListArr }) => {
	const setActiveCategory = (category: string): void => {
		setCategoryActive(category)
	}

	return (
		<div className={categories.categories}>
			<ul>
				{categoryListArr.map((category: string) => (
					<li
						className={category === categoryActive ? categories.active : ''}
						onClick={() => setActiveCategory(category)}
						key={category}>
						{category}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
