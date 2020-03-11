const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);


// Ask first set of question

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



  ]).then(function (answers) {

    const managerhtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
         integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
     <title>Team Builder</title>
    </head>
    <body>
     <div class="jumbotron jumbotron-fluid">
       <h1> My Team </h1>
       </div>
     <div class="container">
         <div class= "col-sm-6">
                <div class="card">
              
                    <div class="card-header">
                       <h3> ${answers.name}</h3>
                       <h3> Manager </h3>

                     </div>
                    <div class="card-body">
                      <h3> ID: ${answers.id}</h3>
                      <h3> Email : ${answers.email}</h>
                      <h3> Office Number : ${answers.officenumber}</h3>
                    </div>
                </div>
          </div>`

    return writeFileAsync("main.html", managerhtml);

  }).then(function () {
    console.log("Successfully wrote to main.html");
  }).catch(function (err) {
    console.log(err);
  
  });

}

// Ask question about engineer

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
        name: "github",
        message: "What is your engineer's GitHub username?"
      },


    ]).then(function (answers) {

      const engineerhtml = `
      <div class= "col-sm-6">
         <div class="card">
             <div class="card-header">
                 <h3> ${answers.name}</h3>
                 <h3> Engineer </h3>

              </div>
             <div class="card-body">
                <h3> ID: ${answers.id}</h3>
                <h3> Email : ${answers.email}</h>
                <h3> GitHub Username : ${answers.github}</h3>
            </div>
          </div>
          </div>`

      return appendFileAsync("main.html", engineerhtml);
    }).then(function () {
      console.log("Successfully append to main.html");
    }).catch(function (err) {
      console.log(err);

      // call select team member choice again after question
    }).then(function (answers) {

      selectTeamMember(answers);
    });
}

// Ask question about intern

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
        name: "school",
        message: "What school do intern go to?"
      },

    ]).then(function (answers) {

      const internhtml = `
      <div class= "col-sm-6">
         <div class="card">
             <div class="card-header">
                 <h3> ${answers.name}</h3>
                 <h3> Intern </h3>

              </div>
             <div class="card-body">
                <h3> ID: ${answers.id}</h3>
                <h3> Email : ${answers.email}</h>
                <h3> School : ${answers.school}</h3>
             </div>
        </div>
      </div>`

    return appendFileAsync("main.html", internhtml);

    }).then(function () {
      console.log("Successfully wrote to main.html");
    })
    .catch(function (err) {
      console.log(err);

      // call select team member choice again after question
    }).then(function (answers) {

      selectTeamMember(answers);
    });
}



function selectTeamMember() {
  inquirer.prompt({
    type: 'list',
    name: 'role',
    message: 'Which type of team member would you like to add?',
    choices: ['Engineer', 'Intern', 'Exit'],

  }).then(function (answers) {


    if (answers.role == "Engineer") {

      promptEngineer()

    } else if
      (answers.role == "Intern") {

      promptIntern()
    } else if
      (
      answers.role == "Exit"
    ) { endHTML()

    }
  })
}

function endHTML() {
  const html = `
    </div>
    </body>
    </html>`
    return appendFileAsync("main.html", html);

    
  }

promptUser()
  .then(function (answers) {

    selectTeamMember(answers)

  })
  .catch(function (err) {
    console.log(err);
  });

