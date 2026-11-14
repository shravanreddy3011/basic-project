const express = require("express");
const app = express();

const employeeRoutes = require("./routes/employee.routes");
const errorHandler = require("./middleware/error.middleware");

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Employee API is running"
    });
});

app.use("/api/employees", employeeRoutes);

app.use(errorHandler);

module.exports = app;