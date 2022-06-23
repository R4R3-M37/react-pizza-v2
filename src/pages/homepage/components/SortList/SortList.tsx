import React, { useEffect, useRef, useState } from 'react'

import { sort } from 'styles'

interface SortListProps {
	sortActive: string
	setSortActive: (string: string) => void
	sortListArr: string[]
	activeSortingBy: string
	setActiveSortingBy: (string: string) => void
}

const SortList: React.FC<SortListProps> = ({
	sortActive,
	setSortActive,
	sortListArr,
	activeSortingBy,
	setActiveSortingBy,
}) => {
	const [visiblePopup, setVisiblePopup] = useState<boolean>(false)
	const [rotateSortingBy, setRotateSortingBy] = useState<number>(180)

	const sortRef = useRef<HTMLInputElement>(null)

	const setActiveSort = (sort: string): void => {
		setSortActive(sort)
		setVisiblePopup(false)
	}

	const handleClickOutside = (e: any): void => {
		if (!e.path.includes(sortRef.current)) {
			setVisiblePopup(false)
		}
	}

	const handleChangeSorting = () => {
		setActiveSortingBy(activeSortingBy === 'asc' ? 'desc' : 'asc')
		setRotateSortingBy(rotateSortingBy === 180 ? 360 : 180)
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	})

	return (
		<div className={sort.sort} ref={sortRef}>
			<div className={sort.sort__label}>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={() => handleChangeSorting()}
					style={{ transform: `rotate(${rotateSortingBy}deg)` }}>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setVisiblePopup(!visiblePopup)}>{sortActive}</span>
			</div>
			{visiblePopup && (
				<div className={sort.sort__popup}>
					<ul>
						{sortListArr.map((sortBy, index) => (
							<li
								className={sortActive === sortBy ? sort.active : ''}
								onClick={() => setActiveSort(sortBy)}
								key={index}>
								{sortBy}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default SortList
