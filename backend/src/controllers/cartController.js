const { join } = require("path");

const cartDb = join(__dirname, "../database/cartsDatabase.json");

const Crud = require("../services/CRUD");

const crud = new Crud({ path: cartDb });

module.exports = {
    async index(request, response) {
        /* const { id } = request.params; */

        try {
            const cartData = await crud.get();

            return response.status(200).json(cartData);
        } catch (error) {
            response.status(400).json({
                type: "error",
                error,
            });
        }
    },

    async create(request, response) {
        const { data } = request.body;

        try {
            const returnedData = await crud.create(data);

            return response.status(201).json(returnedData);
        } catch (error) {
            response.status(400).json({
                type: "error",
                error,
            });
        }
    },
};
