// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your Project: ',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter your title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Briefly describe your application: ',
        validate: describeInput => {
            if (describeInput) {
                return true;
            } else {
                console.log('Please your application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please explain how to install the application: ',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter your installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide examples on how the application is used: ',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide examples!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license will you use for your project?',
        choices: ['agpl', 'apache', 'MIT', 'No License']
    },
    {
        type: 'confirm',
        name: 'confirmOtherContributers',
        message: 'Will there be other contributors to this project?',
        default: true
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide instructions and examples on how the code is tested: ',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Please enter your instructions and examples on code testing!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub Username? (Required)',
        validate: githubUserInput => {
            if (githubUserInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: githubUserInput => {
            if (githubUserInput) {
                return true;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('/generated-README.md', fileName, (err) =>
    err ? console.error(err) : console.log('File has been created!')
    );
}


// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeToFile(pageMD);
})
.then(writeToFileResponse => {
    console.log(writeToFileResponse.message);
})
.catch(err => {
    console.log(err);
});
