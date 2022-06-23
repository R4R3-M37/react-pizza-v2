import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { button, pizzaBlock } from 'styles'

import { IPizza } from 'types'
import { addItem } from '../../../../redux/slices/cartSlice'

const PizzaBlock: React.FC<IPizza> = (pizza) => {
	const dispatch = useDispatch()
	const cartItem = useSelector((state: any) => state.cart.items.find((pizzaObj: any) => pizzaObj.id === pizza.id))
	const addedCount = cartItem ? cartItem.count : null
	const [activeType, setActiveType] = useState<number>(pizza.types[0])
	const [activeSize, setActiveSize] = useState<number>(pizza.sizes[0])

	const onClickAdd = (): void => {
		const item = {
			id: pizza.id,
			name: pizza.name,
			price: pizza.price,
			imageUrl: pizza.imageUrl,
			type: pizzaTypesObj[activeType as keyof typeof pizzaTypesObj],
			size: activeSize,
			count: 1,
		}
		dispatch(addItem(item))
	}

	const handleActiveType = (type: number): void => {
		setActiveType(type)
	}

	const handleActiveSize = (size: number): void => {
		setActiveSize(size)
	}

	const pizzaTypesObj = { 0: 'Традиционное', 1: 'Тонкое' }

	return (
		<div className={pizzaBlock.pizza_block}>
			<img className={pizzaBlock.pizza_block__image} src={pizza.imageUrl} alt='Pizza' loading='lazy' />
			<h4 className={pizzaBlock.pizza_block__title}>{pizza.name}</h4>
			<div className={pizzaBlock.pizza_block__selector}>
				<ul>
					{pizza.types.map((type: number) => (
						<li
							className={activeType === type ? pizzaBlock.active : ''}
							onClick={() => handleActiveType(type)}
							key={type}>
							{pizzaTypesObj[type as keyof typeof pizzaTypesObj]}
						</li>
					))}
				</ul>
				<ul>
					{pizza.sizes.map((size: number) => (
						<li
							className={activeSize === size ? pizzaBlock.active : ''}
							onClick={() => handleActiveSize(size)}
							key={size}>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className={pizzaBlock.pizza_block__bottom}>
				<div className={pizzaBlock.pizza_block__price}>от {pizza.price} ₽</div>
				<div
					className={`${button.button} ${button.button__outline} ${button.button__add}`}
					onClick={() => onClickAdd()}>
					<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Добавить</span>
					{addedCount && <i>{addedCount}</i>}
				</div>
			</div>
		</div>
	)
}

export default PizzaBlock
