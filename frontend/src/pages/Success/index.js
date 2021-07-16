import { useContext, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { cartContext } from '../../contexts/CartContext'

import api from '../../services/api'

import styles from './index.module.css'

const Success = ({ location }) => {
	const { cart, clearCart } = useContext(cartContext)

	const handleOrder = useCallback(async () => {
		const session_id = location.search.replace(/\?session_id=/, '') 

		try {
			const response = await api.post('/stripe/order-success', { session_id })

			api.post('/orders/create', { 
				email: response.data.customer.email, 
				orders: cart 
			}).then(() => {

				clearCart()
			})
			.catch(err => { throw new Error(err) })

		} catch(error) {
			console.error(error)
		}
	}, [cart, clearCart, location.search])
	
	useEffect(() => {
		handleOrder()
	}, [handleOrder])



	return (
		<div className={styles.container}>
			<div>
				<h1>Success!</h1>
				<p>
					Thank you for your order!
				</p>
				<div className={styles.linksContainer}>
					<Link to='/'>Go back to products</Link>
				</div>
			</div>
		</div>
	)
}

export default Success