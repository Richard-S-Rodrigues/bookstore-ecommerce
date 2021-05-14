const { join } = require("path");

const booksDb = join(__dirname, "../database/booksDatabase.json");

const Crud = require("../services/CRUD");

const crud = new Crud({ path: booksDb });

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        try {
            const data = await crud.get(id);

            return response.status(200).json(data);
        } catch (error) {
            response.status(400).json({
                type: "error",
                error,
            });
        }
    },
};
