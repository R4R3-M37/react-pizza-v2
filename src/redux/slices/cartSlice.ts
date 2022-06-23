import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
	id: number
	name: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
	priceSum?: any
}

interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice += action.payload.price
		},
		plusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
				state.totalPrice += action.payload.price
			}
		},
		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)
			if (findItem) {
				findItem.count--
				state.totalPrice -= action.payload.price
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter((item: any) => item.id !== action.payload)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, removeItem, plusItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
