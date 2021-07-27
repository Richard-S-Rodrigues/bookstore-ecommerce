import { useState } from "react";

import api from "../../../services/api";
import { formatNumber, formatCurrency } from "../../../services/utils";

import styles from "./index.module.css";

import bookDefaultImage from "../../../assets/default-book.png";

const NewBook = ({ toggleModal, updateBooks }) => {
	const [bookTitle, setBookTitle] = useState("")
	const [bookAuthor, setBookAuthor] = useState("")
	const [bookPrice, setBookPrice] = useState("")
	const [bookIsbn, setBookIsbn] = useState("")
	const [bookPagesNumber, setBookPagesNumber] = useState("")
	const [bookDescription, setBookDescription] = useState("")
	const [bookPublisher, setBookPublisher] = useState("")
	const [bookImageTmpUrl, setBookImageTmpUrl] = useState("")
	const [bookImageFile, setBookImageFile] = useState({})

	const onChangeHandler = (event) => {
		const {name, value} = event.target;
		let formatedValue;

		switch(name) {
			case "title":
				setBookTitle(value);
			break;
			case "author":
				setBookAuthor(value);
			break;
			case "price":
				formatedValue = formatCurrency(value);
				setBookPrice(formatedValue);
			break;
			case "isbn":
				setBookIsbn(value);
			break;
			case "pagesNumber":
				formatedValue = formatNumber(value);
				setBookPagesNumber(formatedValue);
			break;
			case "description":
				setBookDescription(value);
			break;
			case "publisher":
				setBookPublisher(value);
			break;
			default:
				return;
		}
	}

	const onChangeImageHandler = (event) => {
		const file = event.target.files[0]

		const imgUrl = URL.createObjectURL(file)

		setBookImageFile(file)
		setBookImageTmpUrl(imgUrl)
	}

	const submitNewBook = async () => {

		// Check if ts not empty
		if (bookTitle && bookAuthor && bookPrice && bookIsbn && bookPagesNumber &&
			bookDescription && bookPublisher && bookImageTmpUrl) {
			
			const { image } = await uploadImageFile(bookImageFile);

			const bookData = {
				title: bookTitle,
	            author: bookAuthor,
	            price: bookPrice,
	            isbn: bookIsbn,
	            pagesNumber: bookPagesNumber,
	            description: bookDescription,
	            publisher: bookPublisher,
	            image
			};

			await createNewBook(bookData);
			updateBooks()
			toggleModal(false);
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
			
			return response.data;
		} catch (error) {
			console.error(error)
		}
	}

	const createNewBook = async (bookData) => {
		try {
			await api.post("/admin/createBook", bookData)
		} catch(error) {
			console.error(error)
		}
	}

	return (
		<div className={styles.modalContainer}>
			<main className={styles.modal}>
				<h2>New Book</h2>
				<form onSubmit={(event) => event.preventDefault()} method="POST">
					<section className={styles.mainContainer}>
						<div className={styles.imageContainer}>
							<img src={bookImageTmpUrl || bookDefaultImage} alt={bookTitle} />
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
								<label htmlFor="title" >Title:</label>
								<input 
									type="text"
									id="title"
									name="title"
									required
									value={bookTitle}
									onChange={onChangeHandler}	
								/>
							</div>
							<div>
								<label htmlFor="author" >Author:</label>
								<input 
									type="text"
									id="author"
									name="author"
									required
									value={bookAuthor}
									onChange={onChangeHandler}	
								/>
							</div>
							<div>
								<label htmlFor="price" >Price:</label>
								<input 
									type="text"
									id="price"
									name="price"
									placeholder="$0.00"
									required
									value={bookPrice}
									onChange={onChangeHandler}	
								/>
							</div>
							<div>
								<label htmlFor="isbn" >Isbn: <small style={{color: "var(--grey)"}}>10 or 13</small></label>
								<input 
									type="text"
									id="isbn"
									name="isbn"
									required
									value={bookIsbn}
									onChange={onChangeHandler}	
								/>
							</div>
							<div>
								<label htmlFor="pagesNumber" >Pages number:</label>
								<input 
									type="text"
									id="pagesNumber"
									name="pagesNumber"
									required
									value={bookPagesNumber}
									onChange={onChangeHandler}	
								/>
							</div>
							<div className={styles.descriptionContent}>
								<label htmlFor="description" >Description:</label>
								<textarea 
									type="text"
									id="description"
									name="description"
									required
									value={bookDescription}
									onChange={onChangeHandler}	
								/>
							</div>
							<div>
								<label htmlFor="publisher" >Publisher:</label>
								<input 
									type="text"
									id="publisher"
									name="publisher"
									required
									value={bookPublisher}
									onChange={onChangeHandler}	
								/>
							</div>
						</div>
					</section>
					<section className={styles.actionsContainer}>
						<button 
							name="cancel"
							onClick={() => toggleModal(false)}
						>
							Cancel
						</button>
						<button 
							name="add"
							onClick={submitNewBook}
						>
							Add
						</button>
					</section>
				</form>
			</main>
		</div>
	)
}

export default NewBook;