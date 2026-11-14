const pool = require("../config/database");

// 1. CREATE employee
const createEmployee = async (employeeData) => {
    const { name, email, department } = employeeData;

    const result = await pool.query(
        `INSERT INTO employees (name, email, department)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, email, department]
    );

    return result.rows[0];
};

// 2. READ all employees
const getAllEmployees = async () => {
    const result = await pool.query(
        "SELECT * FROM employees ORDER BY id"
    );

    return result.rows;
};

// 3. READ employee by ID
const getEmployeeById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM employees WHERE id = $1",
        [id]
    );

    return result.rows[0] || null;
};

// 4. UPDATE employee
const updateEmployee = async (id, employeeData) => {
    const { name, email, department } = employeeData;

    const result = await pool.query(
        `UPDATE employees
         SET name = COALESCE($1, name),
             email = COALESCE($2, email),
             department = COALESCE($3, department),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $4
         RETURNING *`,
        [name ?? null, email ?? null, department ?? null, id]
    );

    return result.rows[0] || null;
};

// 5. DELETE employee
const deleteEmployee = async (id) => {
    const result = await pool.query(
        "DELETE FROM employees WHERE id = $1 RETURNING id",
        [id]
    );

    return result.rowCount > 0;
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};