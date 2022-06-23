import React, { useContext, useEffect, useState } from 'react'

import { styles } from 'styles'
import SkeletonLoader from './SkeletonLoader'
import { Categories, PizzaBlock, SortList } from 'components/homepage'

import { IPizza } from 'types'
import { categoryListArr, loadingSkeleton, sortListArr } from 'helps'
import { SearchContext } from 'context'

import useFetch from 'hooks/useFetch'

const Homepage: React.FC = () => {
	const { searchInput } = useContext(SearchContext)
	const [categoryActive, setCategoryActive] = useState<string>(categoryListArr[0])
	const [sortActive, setSortActive] = useState<string>(sortListArr[0])
	const [activeSortingBy, setActiveSortingBy] = useState<string>('desc')

	const sortMap = {
		популярности: `&sortBy=rating&order=${activeSortingBy}`,
		алфавиту: `&sortBy=name&order=${activeSortingBy}`,
		цене: `&sortBy=price&order=${activeSortingBy}`,
	}
	const categoryMap = {
		Все: '?',
		Мясные: '?category=0',
		Вегетарианская: '?category=1',
		Гриль: '?category=2',
		Острые: '?category=3',
		Закрытые: '?category=4',
	}

	const [{ response: responseFetch, isLoading: isLoadingFetch }, doFetch] = useFetch(
		`db${categoryMap[categoryActive as keyof typeof categoryMap]}${sortMap[sortActive as keyof typeof sortMap]}`
	)

	const [{ response: responseSearch, isLoading: isLoadingSearch }, doFetchSearch] = useFetch(`db?name=${searchInput}`)

	const response = responseSearch && searchInput !== '' ? responseSearch : responseFetch
	const isLoading = isLoadingSearch ? isLoadingSearch : isLoadingFetch

	useEffect(() => {
		if (searchInput) {
			doFetchSearch({})
		}
	}, [searchInput])

	useEffect(() => {
		doFetch({})
	}, [doFetch, categoryActive, sortActive, activeSortingBy])

	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<div className={styles.content__top}>
					<Categories
						categoryListArr={categoryListArr}
						categoryActive={categoryActive}
						setCategoryActive={setCategoryActive}
					/>
					<SortList
						sortListArr={sortListArr}
						sortActive={sortActive}
						setSortActive={setSortActive}
						activeSortingBy={activeSortingBy}
						setActiveSortingBy={setActiveSortingBy}
					/>
				</div>
				<h2 className={styles.content__title}>Все пиццы</h2>
				<div className={styles.content__items}>
					{isLoading && loadingSkeleton.map((_, i) => <SkeletonLoader key={i} />)}
					{response &&
						!isLoading &&
						response.map((pizza: IPizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
					{isLoading && loadingSkeleton.map((_, i) => <SkeletonLoader key={i} />)}
				</div>
			</div>
		</div>
	)
}

export default Homepage
