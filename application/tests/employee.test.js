
const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/database");

describe("Employee Management API - CRUD Tests", () => {

    let employeeId;

    const employeeData = {
        name: "Automation Test",
        email: `automation-${Date.now()}@example.com`,
        department: "DevOps"
    };

    // Test 1: Health check
    test("GET /health - should return API status", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    // Test 2: Create employee
    test("POST /api/employees - should create an employee", async () => {
        const response = await request(app)
            .post("/api/employees")
            .send(employeeData);

        expect(response.statusCode).toBe(201);
        expect(response.body.data.name).toBe(employeeData.name);
        expect(response.body.data.email).toBe(employeeData.email);

        employeeId = response.body.data.id;
    });

    // Test 3: Get all employees
    test("GET /api/employees - should return employees", async () => {
        const response = await request(app)
            .get("/api/employees");

        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeGreaterThanOrEqual(1);

        const employee = response.body.data.find(
            (item) => item.id === employeeId
        );

        expect(employee).toBeDefined();
    });

    // Test 4: Get employee by ID
    test("GET /api/employees/:id - should return employee details", async () => {
        const response = await request(app)
            .get(`/api/employees/${employeeId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.id).toBe(employeeId);
        expect(response.body.data.name).toBe(employeeData.name);
    });

    // Test 5: Update employee
    test("PUT /api/employees/:id - should update employee", async () => {
        const response = await request(app)
            .put(`/api/employees/${employeeId}`)
            .send({
                department: "Cloud Engineering"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.department).toBe("Cloud Engineering");
    });

    // Test 6: Delete employee
    test("DELETE /api/employees/:id - should delete employee", async () => {
        const response = await request(app)
            .delete(`/api/employees/${employeeId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Employee deleted successfully");
    });

    // Test 7: Verify deleted employee
    test("GET /api/employees/:id - should return 404 after deletion", async () => {
        const response = await request(app)
            .get(`/api/employees/${employeeId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Employee not found");
    });

    // Cleanup
    afterAll(async () => {
        if (employeeId) {
            await pool.query(
                "DELETE FROM employees WHERE id = $1",
                [employeeId]
            );
        }

        await pool.end();
    });
});
