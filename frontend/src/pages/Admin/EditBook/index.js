import { useState } from "react";

import api from "../../../services/api";
import { formatNumber, formatCurrency } from "../../../services/utils";

import styles from "./index.module.css"

const EditBook = ({ editData, setIsEdit, updateBooks }) => {
	const [title, setTitle] = useState(editData.title || "");
	const [author, setAuthor] = useState(editData.author || "");
	const [price, setPrice] = useState(editData.price || "");
	const [isbn, setIsbn] = useState(editData.isbn || "");
	const [pagesNumber, setPagesNumber] = useState(editData.pagesNumber || "");
	const [description, setDescription] = useState(editData.description || "");
	const [publisher, setPublisher] = useState(editData.publisher || "");
	const [imageUrl, setImageUrl] = useState(editData.image.filepath || "")
	const [imageFile, setImageFile] = useState({})

	const onChangeHandler = (event) => {
		const {name, value} = event.target;

		let formatedValue;

		switch(name) {
			case "title":
				setTitle(value);
			break;
			case "author":
				setAuthor(value);
			break;
			case "price":
				formatedValue = formatCurrency(value);
				setPrice(formatedValue);
			break;
			case "isbn":
				setIsbn(value);
			break;
			case "pagesNumber":
				formatedValue = formatNumber(value);
				setPagesNumber(formatedValue);
			break;
			case "description":
				setDescription(value);
			break;
			case "publisher":
				setPublisher(value);
			break;
			default:
				return;
		}
	}

	const onChangeImageHandler = (event) => {
		const file = event.target.files[0]

		const imgUrl = URL.createObjectURL(file)

		setImageFile(file)
		setImageUrl(imgUrl)
	}

	const submitUpdatedBook = async () => {
		// Check if ts not empty
		if (title && author && price && isbn && pagesNumber &&
			description && publisher && imageUrl) {
			
			let image;

			if (editData.image.filepath !== imageUrl) {
				image = await uploadImageFile(imageFile);
			} else {
				image = editData.image;
			}

			const oldImagePublicId = editData.image.public_id;

			const updatedBookData = {
				title,
	            author,
	            price,
	            isbn,
	            pagesNumber,
	            description,
	            publisher,
	            image,
	            oldImagePublicId
			}

			await updateBook(updatedBookData);
			updateBooks();
			setIsEdit(false);
		} else {
			return;
		}
	}

	const uploadImageFile = async (imageFile) => {
		const imageFileData = new FormData();

		imageFileData.append(
			"file",
			imageFile,
			imageFile.name
		)

		try {
			const response = await api.post("/upload/image", imageFileData);
			
			return response.data.image;
		} catch (error) {
			console.error(error)
		}
	}

	const updateBook = async (bookData) => {
		try {
			await api.put(`/admin/updateBook/${editData._id}`, bookData)
		} catch(error) {
			console.error(error)
		}
	}

	return (
		<form
			className={styles.editForm} 
			onSubmit={(event) => event.preventDefault()}
		>
			<section className={styles.editContainer}>
				<div className={styles.imgContainer}>
					<img src={imageUrl} alt={title}/>
					<label htmlFor="imageInput">Upload Image</label>
					<input 
						type="file"
						id="imageInput"
						accept="image/*"
						required 
						onChange={onChangeImageHandler}
					/>
				</div>
				<div className={styles.inputsContainer}>
					<div>
						<label>Title</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={onChangeHandler} 
						/>
						<label>Author</label>
						<input
							type="text"
							id="author"
							name="author"
							value={author}
							onChange={onChangeHandler}  
						/>
					</div>
					<div>
						<label>Price</label>
						<input
							type="text"
							id="price"
							name="price"
							value={price}
							onChange={onChangeHandler} 
						/>
						<label>Isbn</label>
						<input
							type="text"
							id="isbn"
							name="isbn"
							value={isbn}
							onChange={onChangeHandler} 
						/>
					</div>
					<div>
						<label>Pages number</label>
						<input
							type="text"
							id="pagesNumber"
							name="pagesNumber"
							value={pagesNumber}
							onChange={onChangeHandler} 
						/>
					</div>
					<div>
						<label>Description</label>
						<textarea
							type="text"
							id="description"
							name="description"
							value={description}
							onChange={onChangeHandler} 
						/>
					</div>
					<div>
						<label>Publisher</label>
						<input
							type="text"
							id="publisher"
							name="publisher"
							value={publisher}
							onChange={onChangeHandler} 
						/>
					</div>
				</div>
			</section>

			<section className={styles.editActionsContainer}>				
				<button
					type="submit"
					name="cancel"
					onClick={() => setIsEdit(false)}
				>
					Cancel
				</button>
				<button 
					type="submit"
					name="save"
					onClick={submitUpdatedBook}
				>
					Save
				</button>
			</section>
		</form>
	) 
};

export default EditBook;