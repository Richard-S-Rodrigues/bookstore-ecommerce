const mongoose = require("mongoose");
const Orders = require("../models/orders");

module.exports = {
	async create(req, res) {
		const { email, orders } = req.body
		
		const timestamp = Date.now()
		
		orderList = []

		orders.forEach(orderItem => {
			orderList.push(Object.assign(orderItem, { timestamp }))
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
					order.orderList.push(Object.assign(orderItem, { timestamp }))
				})

				await order.save()
			})
		
			res.json({ orders })

		} catch(error) {
			res.status(error.statusCode || 500).json({message: error})
			console.log(error)
		}
	},

	async get(req, res) {
		const { email } = req.body

		try {
			await Orders.findOne({ userEmail: email }, async (err, { orderList }) => {
				if (err) {
					throw new Error(err)
				}
				
				if (!orderList) {
					res.status(404).json({ message: 'Orders not found!' })
				}
				
				res.json({ orders: orderList })
			})
		} catch(error) {
			res.status(error.statusCode || 500).json({message: error})
			console.log(error)
		}
	}
}