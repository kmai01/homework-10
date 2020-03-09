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
    
    
    
]);

}


function promptEngineer() {
  return inquirer.prompt(
    [
    {
      type: "input",
      name: "name",
      message: "What is your engineer's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your engineer's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your engineer's email?"
    },
    {
      type: "input",
      name: "officenumber",
      message: "What is your engineer's GitHub username?"
    },
    
    
  ]).then(function (answers) {

    selectTeamMember(answers);

  
  })
  
  }
  
  function promptIntern() {
    return inquirer.prompt(
      [
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?"
      },
      {
        type: "input",
        name: "officenumber",
        message: "What school do intern go to?"
      },
      
      
    ]).then(function (answers) {

      selectTeamMember(answers);

    
    })
  }
  

    function selectTeamMember() {
      inquirer.prompt({
          type: 'list',
          name: 'role',
          message: 'Which type of team member would you like to add?',
          choices: ['Engineer', 'Intern', 'Exit'],
          
      }).then(function (answers) {
        console.log(answers.role)

        if ( answers.role=="Engineer") {
          
          promptEngineer()
    
          }else if 
            ( answers.role=="Intern") {
          
              promptIntern()
          } else if 
          (
            answers.role=="Exit"
          )
          {}
      })
  }

promptUser()
  .then(function(answers) {
    selectTeamMember(answers);

    
    
    });

