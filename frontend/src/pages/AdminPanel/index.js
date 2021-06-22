import { useEffect, useState } from 'react'

import Charts from './Charts'

import api from '../../services/api'

import styles from './index.module.css'

const AdminPanel = () => {
	const [orders, setOrders] = useState([])

	const getData = async () => {
		try {
			const {data: books} = await api.get('/books')
			
			console.log(books)
		} catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className={styles.container}>
			<h2>Most Purchased Products</h2>
			<div>
				<section className={styles.tableContainer}>
					<div>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Purchased Quantity</th>
								</tr>
							</thead>
							<tbody>

								<tr>
									<td>Clean Code</td>
									<td>40</td>
								</tr>
								<tr>
									<td>Clean Architeture</td>
									<td>38</td>
								</tr>
								<tr>
									<td>Patterns of Enterprise Application Architecture</td>
									<td>26</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
				<section className={styles.chartContainer}>
					<div>
						<Charts />
					</div>
				</section>
			</div>
		</div>
	)
}

export default AdminPanel