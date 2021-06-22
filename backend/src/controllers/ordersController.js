const mongoose = require("mongoose");

const Orders = require("../models/orders");
const Books = require('../models/book')

module.exports = {
	async create(req, res) {
		const { email, orders } = req.body
		
		const orderedAt = Date.now()
		
		orderList = []

		orders.forEach(orderItem => {
			orderList.push(Object.assign(orderItem, { orderedAt }))
		})

		const newOrders = new Orders({
			userEmail: email,
			orderList
		})

		try {
			await Orders.findOne({ userEmail: email }, async (err, order) => {
				if (err) {
					throw new Error(err)
				}

				if (!order) {
					await newOrders.save()
					return;
				}
				
				orders.forEach(orderItem => {
					order.orderList.push(Object.assign(orderItem, { orderedAt }))
				})

				await order.save()

			})
			
			await updateOrderedQuantity(orders)

			return res.json({ message: "Successful order" })

		} catch(error) {
			res.status(error.statusCode || 500).json({message: error})
			console.log(error)
		}
	},

	async get(req, res) {
		const { email } = req.body

		try {
			await Orders.findOne({ userEmail: email }, async (err, order) => {
				if (err) {
					throw new Error(err)
				}
				
				if (!order) {
					return res.status(404).json({ message: "User didn't make any order" })
				}

				if (!order.orderList) {
					return res.status(404).json({ message: 'Orders not found!' })
				}
				
				return res.json({ orders: order.orderList })
			})
		} catch(error) {
			console.log(error)
			return res.status(error.statusCode || 500).json({message: error.message})
		}
	}
}


const updateOrderedQuantity = (orders) => {
	try {
		orders.forEach(async (order) => {
			const book = await Books.findById(order.productId)
			const oldQuantity = Number(book.ordered_quantity)

			await Books.findByIdAndUpdate(order.productId, { ordered_quantity: oldQuantity + order.qty })
		})

	} catch(error) {
		console.log(error)
	}
}