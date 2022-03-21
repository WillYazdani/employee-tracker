DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    departments VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roles VARCHAR(30) NOT NULL
)

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) UNIQUE NOT NULL,
    salary INTEGER NOT NULL,
    department_id VARCHAR(30) NOT NULL,
    role_id VARCHAR(30) NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);