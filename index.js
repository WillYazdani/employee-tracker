const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const init = () => {
    return inquirer.prompt([{
        name: "selection",
        type: "list",
        choices: ["Add an employee", "Add a department", "Add a role", "View all employees", "View all departments", "View all roles"]
    }])
    .then(data => {
        if (data.selection === "Add an employee") {
            enterEmployee()
        } else if (data.selection === "Add a department") {
            enterDepartment()
        } else if (data.selection === "Add a role") {
            enterRole()
        } else if (data.selection === "View all employees") {
            viewEmployees()
        } else if (data.selection === "View all departments") {
            viewDepartments()
        } else if (data.selection === "View all roles") {
            viewRoles()
        }
    })
};

const enterDepartment = () => {
    inquirer.prompt ({
        name: "department",
        type: "input",
        message: "Enter department name:"
    })
    .then(data => {
        db.query(`INSERT INTO departments (departments) VALUES (?);`,
        data.department, (err) => {
            if (err) {
                throw err
            } else {
                console.log("Department added.");
                init();
            }
        })
    })
};

const enterRole = () => {
    inquirer
        .prompt ([
            {
                name: "role",
                type: "input",
                message: "Enter role name:"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter role salary:"
            },
            {
                name: "department_id",
                type: "input",
                message: "Enter department id#:"
            }
        ])
    .then(data => {
        db.query(`INSERT INTO roles (roles, salary, department_id) VALUES (?, ?, ?);`,
        [data.role, data.salary, data.department_id], (err) => {
            if (err) {
                throw err
            } else {
                console.log("Role added.");
                init();
            }
        })
    })
};

const enterEmployee = () => {
    inquirer
        .prompt ([
            {
                name: "first_name",
                type: "input",
                message: "Enter employee first name:"
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter employee last name:"
            },
            {
                name: "employee_role",
                type: "input",
                message: "Enter employee role:"
            },
            {
                name: "manager_first_name",
                type: "input",
                message: "Enter employee manager first name:"
            },
            {
                name: "manager_last_name",
                type: "input",
                message: "Enter employee manager last name:"
            }
        ])
    .then(data => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
        [data.first_name, data.last_name, data.role_id, data.manager_first_name, data.manager_last_name], (err) => {
            if (err) {
                throw err
            } else {
                console.log("Employee added.");
                init();
            }
        })
    }
};

const viewEmployees = () => {
    db.query("SELECT * FROM employees", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
};

const viewRoles = () => {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
};

const viewDepartments = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
};


init();
