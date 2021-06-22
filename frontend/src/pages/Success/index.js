import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { cartContext } from '../../contexts/CartContext'

import api from '../../services/api'

import styles from './index.module.css'

const Success = ({ location }) => {
	const { cart, clearCart } = useContext(cartContext)

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		const session_id = location.search.replace(/\?session_id=/, '') 

		try {
			const response = await api.post('/stripe/order-success', { session_id })

			createOrder(cart, response.data.customer.email)

		} catch(error) {
			console.log(error)
		}
	}

	const createOrder = (cartItems, userEmail) => {
		try {
		   api.post('/orders/create', { email: userEmail, orders: cartItems })

		   clearCart()
		} catch(error) {
			console.log(error)
		}	
	}

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