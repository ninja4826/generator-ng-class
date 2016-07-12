import {Base} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

export default class AngularClass extends Base {
  prompting() {
    this.log(yosay(`Welcome to the excellent ${chalk.red('generator-ng-class')} generator!`));
    let prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }
  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  }
  install() {
    this.installDependencies();
  }
}

// var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
// var yosay = require('yosay');

// module.exports = yeoman.Base.extend({
//   prompting: function () {
//     // Have Yeoman greet the user.
//     this.log(yosay(
//       'Welcome to the super-duper ' + chalk.red('generator-test') + ' generator!'
//     ));

//     var prompts = [{
//       type: 'confirm',
//       name: 'someAnswer',
//       message: 'Would you like to enable this option?',
//       default: true
//     }];

//     return this.prompt(prompts).then(function (props) {
//       // To access props later use this.props.someAnswer;
//       this.props = props;
//     }.bind(this));
//   },

//   writing: function () {
//     this.fs.copy(
//       this.templatePath('dummyfile.txt'),
//       this.destinationPath('dummyfile.txt')
//     );
//   },

//   install: function () {
//     this.installDependencies();
//   }
// });
