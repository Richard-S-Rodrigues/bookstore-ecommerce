import { useState, useEffect, useContext } from "react"

import { booksContext } from "../../contexts/BooksContext"

import NewBook from "./NewBook";
import Edit from "./Edit"

import api from '../../services/api'

import styles from './index.module.css'

const Admin = () => {
	const { books, setBooks } = useContext(booksContext)
	const [booksDataCache, setBooksDataCache] = useState([])

	const [users, setUsers] = useState([])
	const [usersDataCache, setUsersDataCache] = useState([])

	const [editData, setEditData] = useState({})
	const [itemToBeDeleted, setItemToBeDeleted] = useState("")
	const [currentItemType, setCurrentItemType] = useState("") // books or users

	const [isEdit, setIsEdit] = useState(false)
	const [isConfirmDelete, setIsConfirmDelete] = useState(false)

	const [isNewBookModal, setIsNewBookModal] = useState(false);

	const getUsersData = async () => {
		try {
			const { data: usersData } = await api.get('/admin/getUsers')
			setUsers(usersData)
			setUsersDataCache(usersData)	
		} catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getUsersData()
	}, [])

	useEffect(() => {
		const getBooksData = async () => {
			const booksData = await books;

			setBooksDataCache(booksData)
		}
		getBooksData()
	}, [setBooks, books])

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
			console.log(userData._id)
		}
	}

	const deleteItem = async () => {
		const itemId = itemToBeDeleted;

		try {
			if (currentItemType === "books") {
				const response = await api.delete(`/admin/removeBook/${itemId}`)
				console.log(response.data)
				// Update books context
				setBooks()
			}
			if (currentItemType === "users") {
				const response = await api.delete(`/admin/removeUser/${itemId}`)
				console.log(response.data)

				// Get updated users
				getUsersData()
			}

		} catch(error) {
			console.log("error: ", error)
		}

		setIsConfirmDelete(false)
	}

	const searchItem = (event, itemType) => {
		const { value } = event.target

		if (itemType === "books") {
			if (!value) {
				setBooksDataCache(books)
				return;
			}

			const filteredValues = books.filter(({ title }) => title.toLowerCase().includes(value))
			
			if (!filteredValues.length) {
				setBooksDataCache([])
			} else {
				setBooksDataCache(filteredValues)
			}
		}

		if (itemType === "users") {
			if (!value) {
				setUsersDataCache(users)
				return;
			}

			const filteredValues = users.filter(({ email }) => email.toLowerCase().includes(value))

			if (!filteredValues.length) {
				setUsersDataCache([])
			} else {
				setUsersDataCache(filteredValues)
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
						<button onClick={() => {
							setIsNewBookModal(true);
						}}>New</button>
					</div>
					<ul>
						{!booksDataCache.length && <div>No Books Found!</div>}
						{booksDataCache.map(value => (
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
					</div>
					<ul>
						{!usersDataCache.length && <div>No Users Found!</div>}
						{usersDataCache.map(value => (
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
			{isNewBookModal && (
				<NewBook 
					toggleModal={setIsNewBookModal}
					updateBooks={setBooks}
				/>
			)}

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