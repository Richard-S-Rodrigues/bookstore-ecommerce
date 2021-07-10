
import styles from "./index.module.css"

const Edit = ({ books, users, editData, setIsEdit }) => (
	books ? (
		<form
			className={styles.editForm} 
			onSubmit={(event) => event.preventDefault()}
		>
			<section className={styles.editContainer}>
				<div>
					<img src={editData.image} alt={editData.title}/>
				</div>
				<div>
					<div>
						<label>Title</label>
						<input
							type="text"
							id="title"
							name="title"
							value={editData.title} 
						/>
					</div>
					<div>
						<label>Author</label>
						<input
							type="text"
							id="author"
							name="author"
							value={editData.author} 
						/>
					</div>
					<div>
						<label>Price</label>
						<input
							type="text"
							id="price"
							name="price"
							value={editData.price} 
						/>
					</div>
					<div>
						<label>Isbn</label>
						<input
							type="text"
							id="isbn"
							name="isbn"
							value={editData.isbn} 
						/>
					</div>
					<div>
						<label>Pages number</label>
						<input
							type="text"
							id="pagesNumber"
							name="pagesNumber"
							value={editData.pagesNumber} 
						/>
					</div>
					<div>
						<label>Description</label>
						<textarea
							type="text"
							id="description"
							name="description"
							value={editData.description} 
						/>
					</div>
					<div>
						<label>Publisher</label>
						<input
							type="text"
							id="publisher"
							name="publisher"
							value={editData.publisher} 
						/>
					</div>
					<div>
						<label>Ordered quantity</label>
						<input
							type="text"
							id="ordered_quantity"
							name="ordered_quantity"
							value={editData.ordered_quantity} 
						/>
					</div>
				</div>
			</section>

			<section className={styles.editActionsContainer}>
				<button 
					type="submit"
					name="save"
				>
					Save
				</button>
				
				<button
					type="submit"
					name="cancel"
					onClick={() => setIsEdit(false)}
				>
					Cancel
				</button>
			</section>
		</form>
	) : users && (
		<form
			className={styles.editForm} 
			onSubmit={(event) => event.preventDefault()}
		>

			<section className={styles.editActionsContainer}>
				<button 
					type="submit"
					name="save"
				>
					Save
				</button>
				
				<button
					type="submit"
					name="cancel"
					onClick={() => setIsEdit(false)}
				>
					Cancel
				</button>
			</section>
		</form>
	)
);

export default Edit;