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

const enterEmployee = () => {
    inquirer.prompt ({
        name: "firstName",
        type: "input",
        message: "Enter employee first name:"
    })
    .then(data => {
        db.query(`INSERT INTO employee (first_name) VALUES (?);`, data.first_name, (err) => {
            if (err) {
                throw err
            } else {
                console.log("First name added.");
                init();
            }
        })
    })
}

const enterDepartment = () => {
    inquirer.prompt ({
        name: "department",
        type: "input",
        message: "Enter department name:"
    })
    .then(data => {
        db.query(`INSERT INTO department (name) VALUES (?);`, data.department, (err) => {
            if (err) {
                throw err
            } else {
                console.log("Department added.");
                init();
            }
        })
    })
}

const enterRole = () => {
    inquirer.prompt ({
        name: "role",
        type: "input",
        message: "Enter role name:"
    })
    .then(data => {
        db.query(`INSERT INTO role (name) VALUES (?);`, data.role, (err) => {
            if (err) {
                throw err
            } else {
                console.log("Role added.");
                init();
            }
        })
    })
}

const viewEmployees = () => {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
}

const viewRoles = () => {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
}

const viewDepartments = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
            init();
        }
    })
}


init();
