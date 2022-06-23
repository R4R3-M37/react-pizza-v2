import React from 'react'
import { button, styles } from 'styles'
import { cartEmpty } from '../../assets/img'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
	return (
		<div className={styles.content}>
			<div className={`container ${styles.cart} ${styles.cart__empty}`}>
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={cartEmpty} loading='lazy' alt='Empty cart' />
				<Link to='/' className={`${button.button} ${button.button__black}`}>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	)
}

export default EmptyCart
