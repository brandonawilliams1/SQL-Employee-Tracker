// Import and require mysql2
const mysql = require('mysql2');
let inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Password1',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

const logo = require('asciiart-logo');
const config = require('./package.json');
config.logoColor = 'bold-green';
config.textColor = 'green';
config.borderColor = 'yellow';
console.log(logo(config).render());

function initialPrompt(){
inquirer.prompt([

  {
    type: "list",
    name: "choice",
    choices:[
      {
        name:"view all roles",
        value:"VIEW_ALL_ROLES"
      },
      {
        name:"view all employees",
        value:"VIEW_ALL_EMPLOYEES"
      },
      {
        name:"view all departments",
        value:"VIEW_ALL_DEPARTMENTS"
      },
      {
        name:"add a department",
        value:"ADD_A_DEPARTMENT"
      },
      {
        name:"add role",
        value:"ADD_A_ROLE"
      },
      {
        name:"add an employee",
        value:"ADD_AN_EMPLOYEE"
      },
      {
        name:"exit",
        value:"Exit"
      },
    ],
    message:"What would you like to do?"
  }


])
.then((data) => {
  console.log(data)
  switch(data.choice){
    case "VIEW_ALL_ROLES":
      viewAllRoles();
      break;
    case "VIEW_ALL_DEPARTMENTS":
      viewDepartments();
      break;
    case "ADD_A_DEPARTMENT":
      addDepartment();
      break;
    case "ADD_A_ROLE":
      addRole();
      break;
    case "VIEW_ALL_EMPLOYEES":
      viewAllEmployees();
      break;
    case "ADD_AN_EMPLOYEE":
      addEmployee();
      break;
  }
})
}


function viewAllRoles(){
  
  db.query('SELECT * FROM roles', function (err, results) {
    if(err)throw err;
    console.table(results);
    initialPrompt();
  });
}

function viewDepartments(){
  
  db.query('SELECT * FROM departments', function (err, results) {
    if(err)throw err;
    console.table(results);
    initialPrompt();
  });
}

function viewAllEmployees(){
  const query = `SELECT 
	employees.id, 
	employees.first_name, 
    employees.last_name,
    roles.title,
    departments.name,
    roles.salary,
	concat(manager.first_name," ",manager.last_name)
		AS manager FROM employees
LEFT JOIN roles ON employees.role_id=roles.id
LEFT JOIN departments ON roles.department_id=departments.id
LEFT JOIN employees manager ON manager.id=employees.manager_id`
  db.query(query, function (err, results) {
    if(err)throw err;
    console.table(results);
    initialPrompt();
  });
}

function addEmployee(){
  inquirer.prompt([

    {
      name:'firstname',
      type:'input',
      message:'What is the employees first name'
    },
    
    {
      name:'lastname',
      type:'input',
      message:'What is the employees last name'
    },
    
    {
      name:'role',
      type:'input',
      message:'What is the employees role id? ( 1-Owner, 2-Lumber Manager, 3-Lumber Employee, 4-Hardware Manager, 5-Hardware Employee, 6-Int Design Manager, 7-Int Design Employee )'
    },
    
    {
      name:'manager',
      type:'input',
      message:'What is the employees manager id? (1-Tom Kelly(Owner), 2-Rocco Baldelli(Lumber Yard), 3-Rick Anderson(Hardware), 4-Brie Larson(Int Design) )',
    },
  
  ])
  
.then(data => {
  const query= `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
  VALUES (DEFAULT, "${data.firstname}", "${data.lastname}", ${Number(data.role)}, ${Number(data.manager)})`
  db.query(query, function (err, results) {

    if(err)throw err;
    console.table(results);
    initialPrompt();
  });
})
}

function addDepartment(){
  inquirer.prompt([

    {
      name:'departmentName',
      type:'input',
      message:'What is the department name you would like to add?'
    },
  
  ]) 
  .then(data => {
    const query= `INSERT INTO departments (id, name)
    VALUES (DEFAULT, "${data.departmentName}")`
    db.query(query, function (err, results) {
  
      if(err)throw err;
      console.table(results);
      initialPrompt();
    });
  })
}

function addRole(){
  inquirer.prompt([

    {
      name:'roleName',
      type:'input',
      message:'What is the name of the role you would like to add?'
    },
    {
      name:'roleSalary',
      type:'input',
      message:'What is the salary of this role?'
    },
    {
      name:'roleDeptId',
      type:'input',
      message:'What is the department id of the added role? ( 1-Owner, 2-Lumber Yard, 3- Hardware, 4- Interior Design )'
      
    },
  
  ]) 
  .then(data => {
    const query= `INSERT INTO roles (id, title, salary, department_id)
    VALUES (DEFAULT, "${data.roleName}","${data.roleSalary}","${data.roleDeptId}")`
    db.query(query, function (err, results) {
  
      if(err)throw err;
      console.table(results);
      initialPrompt();
    });
  })
}
initialPrompt();