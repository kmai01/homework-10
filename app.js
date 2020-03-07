const Employee = require("./lib/Employee");

const employee = new Employee()

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your manager's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your manager's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your manager's email?"
    },
    {
      type: "input",
      name: "officenumber",
      message: "What is your manager's office number?"
    },
    {
      type: "input",
      name: "role",
      message: "Which type of team member would you like to add?"
    },
    
]);
}



promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    // return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
