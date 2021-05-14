const { readFile, writeFile } = require("fs").promises;

class CRUD {
    constructor({ path }) {
        this.path = path;
    }

    async _currentFileContent() {
        try {
            return JSON.parse(await readFile(this.path));
        } catch (error) {
            return [];
        }
    }

    async get(id) {
        const all = await this._currentFileContent();

        if (!id) return all;

        return await all.find(({ _id }) => _id === id);
    }

    async create(data) {
        const all = await this._currentFileContent();
        all.push(data);

        await writeFile(this.path, JSON.stringify(all));

        return all;
    }

    async delete(id) {
        const all = await this._currentFileContent();

        all.forEach((item, index) => {
            if (item._id === id) {
                all.splice(index, 1);
            }
        });

        await writeFile(this.path, JSON.stringify(all));

        return all;
    }

    async update(id, data) {
        const all = await this._currentFileContent();

        all.forEach((item, index) => {
            if (item._id === id) {
                all.splice(index, 1);

                const updatedData = { ...item, ...data };
                all.push(updatedData);
            }
        });

        await writeFile(this.path, JSON.stringify(all));

        return all;
    }
}

module.exports = CRUD;
