const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const routes = require("./routes");

app.use(logger("common"));
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
