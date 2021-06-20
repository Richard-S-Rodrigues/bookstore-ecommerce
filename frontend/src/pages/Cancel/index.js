import { Link } from 'react-router-dom'

import styles from './index.module.css'

const Cancel = () => {
	return (
		<div className={styles.container}>
			<div>
				<h1>Cancel!</h1>
				<div>
					<p>
						You canceled your order!
					</p>
					<div className={styles.linksContainer}>
						<Link to='/cart'>Go back to cart</Link>
						<hr />
						<Link to='/'>Go back to products</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cancel