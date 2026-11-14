const employeeService = require("../services/employee.service");

// CREATE
const createEmployee = async (req, res, next) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Name, email and department are required"
            });
        }

        const employee = await employeeService.createEmployee(req.body);

        res.status(201).json({
            message: "Employee created successfully",
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// READ ALL
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await employeeService.getAllEmployees();

        res.status(200).json({
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

// READ BY ID
const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({ data: employee });
    } catch (error) {
        next(error);
    }
};

// UPDATE
const updateEmployee = async (req, res, next) => {
    try {
        const employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// DELETE
const deleteEmployee = async (req, res, next) => {
    try {
        const deleted = await employeeService.deleteEmployee(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};