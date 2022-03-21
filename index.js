const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const init = () => {
    inquirer.prompt({
        name: "selection",
        type: "list",
        choices: ["Add an employee", "Add a department", "Add a role", "View all employees", "View all departments", "View all roles"]
    })
    .then(data => {
        if (data.selection === "Add an employee") {
            enterEmployee()
        }
    })
};

const enterEmployee = () => {
    inquirer.prompt ({
        name: "employee_first_name",
        type: "input",
        message: "Enter employee first name."
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
};

init();
