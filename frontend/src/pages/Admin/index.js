import { useState, useEffect, useContext } from "react"

import { booksContext } from "../../contexts/BooksContext"
import Edit from "./Edit"

import api from '../../services/api'

import styles from './index.module.css'

const Admin = () => {
	const { books, setBooks, getBooks } = useContext(booksContext)
	const [booksData, setBooksData] = useState([])

	const [users, setUsers] = useState([])

	const [editData, setEditData] = useState({})
	const [itemToBeDeleted, setItemToBeDeleted] = useState("")
	const [currentItemType, setCurrentItemType] = useState("") // books or users

	const [isEdit, setIsEdit] = useState(false)
	const [isConfirmDelete, setIsConfirmDelete] = useState(false)

	const getUsersData = async () => {
		try {
			const { data: usersData } = await api.get('/admin/getUsers')
			setUsers(usersData)	
		} catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getUsersData()
	}, [])

	useEffect(() => {
		const getBooksData = async () => {
			const books = await getBooks()
			setBooksData(books)
		}
		getBooksData()

	}, [setBooks, getBooks])

	const actionOnBook = (actionType, bookData) => {
		setCurrentItemType("books")

		if (actionType === "edit") {
			setIsEdit(true)
			setEditData(bookData)
		}
		if (actionType === "delete") {
			setIsConfirmDelete(true)
			setItemToBeDeleted(bookData._id)
		}

	}

	const actionOnUser = (actionType, userData) => {
		setCurrentItemType("users")

		if (actionType === "edit") {
			setIsEdit(true)
			setEditData(userData)
		}
		if (actionType === "delete") {
			setIsConfirmDelete(true)
			setItemToBeDeleted(userData._id)
		}
	}

	const deleteItem = async () => {
		const itemId = itemToBeDeleted;

		try {
			if (currentItemType === "books") {
				const response = await api.delete(`/admin/removeBook/${itemId}`)
				alert(response.data.message)

				// Update books context
				setBooks()
			}
			if (currentItemType === "users") {
				const response = await api.delete(`/admin/removeUser/${itemId}`)
				alert(response.data.message)
			}

		} catch(error) {
			console.log("error: ", error)
			window.alert(error.message)
		}

		setIsConfirmDelete(false)
	}

	const searchItem = (event, itemType) => {
		const { value } = event.target

		if (itemType === "books") {
			if (!value) {
				setBooks()
				return;
			}

			const filteredValues = books.filter(({ title }) => title.toLowerCase().includes(value))
			
			if (!filteredValues.length) {
				setBooksData([])
			} else {
				setBooksData(filteredValues)
			}
		}
		if (itemType === "users") {
			if (!value) {
				getUsersData()
				return;
			}

			const filteredValues = users.filter(({ email }) => email.toLowerCase().includes(value))
			
			if (!filteredValues.length) {
				setUsers([])
			} else {
				setUsers(filteredValues)
			}
		}
	}

	return (
		<div className={styles.container}>
			<main>
				<section className={styles.booksContainer}>
					<h2>Books</h2>
					<div className={styles.searchBoxContainer}>
						<input 
							type="text"
							id="searchBox"
							name="searchBox"
							placeholder="Search book"
							onChange={(event) => searchItem(event, "books")}
						/>
						<button>New</button>
					</div>
					<ul>
						{!booksData.length && <div>No Books Found!</div>}
						{booksData.map(value => (
							<li key={value._id}>
								<div className={styles.nameContainer}>{value.title}</div>
								<div className={styles.actionsContainer}>
									<button 
										name="editBtn" 
										onClick={() => actionOnBook("edit", value)}
									>
										Edit
									</button>
									<button 
										name="deleteBtn"
										onClick={() => actionOnBook("delete", value)}
									>
										Delete
									</button>
								</div>
							</li>
						))}

					</ul>
				</section>
				<section className={styles.usersContainer}>
					<h2>Users</h2>
					<div className={styles.searchBoxContainer}>
						<input 
							type="text"
							id="searchBox"
							name="searchBox"
							placeholder="Search user"
							onChange={(event) => searchItem(event, "users")}
						/>
						<button>New</button>
					</div>
					<ul>
						{!users.length && <div>No Users Found!</div>}
						{users.map(value => (
							<li key={value._id}>
								<div className={styles.nameContainer}>{value.email}</div>
								<div className={styles.actionsContainer}>
									<button 
										name="editBtn"
										onClick={() => actionOnUser("edit", value)}
									>
										Edit
									</button>
									<button 
										name="deleteBtn"
										onClick={() => actionOnUser("delete", value)}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</section>
			</main>
			{isEdit && (
				<div className={styles.modalContainer}>
					<div>
						{currentItemType === "books" ? (
							<Edit books 
								editData={editData} 
								setIsEdit={setIsEdit} 
							/>
						) : currentItemType === "users" && (
							<Edit users 
								editData={editData} 
								setIsEdit={setIsEdit} 
							/>
						)}
                       
                    </div>
				</div>
			)}
			{isConfirmDelete && (
				<div className={styles.modalContainer}>
					<div>
                        <h2>Confirm Deletion</h2>
                        <form
                        	className={styles.confirmDeleteForm}
                        	onSubmit={(event) => event.preventDefault()}
                        >
                            <button 
                            	type="submit"
                            	name="delete" 
                            	onClick={deleteItem}
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                name="cancel"
                                onClick={() => {                                
                               		setIsConfirmDelete(false)
                               		setItemToBeDeleted("")
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
				</div>
			)}
		</div>
	)
}

export default Admin;