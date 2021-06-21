
const AdminPanel = () => {
	return (
		<div>
			<h1>Most Purchased Products</h1>
			<section>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Purchased Quantity</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>60ceaa5615cf9c16bf0fb302</td>
							<td>Clean Code</td>
							<td>40</td>
						</tr>
						<tr>
							<td>60ceaa5615cf9c16bf0fb302</td>
							<td>Clean Architeture</td>
							<td>40</td>
						</tr>
						<tr>
							<td>60ceaa5615cf9c16bf0fb302</td>
							<td>Patterns of Enterprise Application Architecture</td>
							<td>40</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section>
				<h1>GRAPH TO VIZUALIZE MOST PURCHASED BOOKS HERE</h1>
			</section>
		</div>
	)
}

export default AdminPanel