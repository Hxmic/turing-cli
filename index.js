#!/usr/bin/env node

const path = require('path')
const {program} = require('commander')
const inquirer = require('inquirer')
const childProcess = require('child_process')
const ora = require('ora')
const loading = ora('Loading unicorns');

loading.text = '正在加载中···';
loading.color = 'green';

program
    .command('create <name>')
    .description('请输入项目的名字:')
    .action(name => {
        return inquirer.prompt([
            // {
            //     type: 'input',
            //     name: 'name',
            //     message: '请输入项目名称'
            // },
            {
                type: 'list',
                name: 'framework',
                message: '请选择项目类型',
                choices: [
                    'typeScript',
                    'javaScript'
                ]
            }
        ])
        .then((answers) => {
            loading.start();
            const fullDir = path.resolve(process.cwd(), name)
            let command;
            if (answers.framework == 'javascript') {
                command = `git clone http://172.16.38.156/H5/javascript-demo.git ${fullDir}`
            } else {
                command = `git clone http://172.16.38.156/H5/typescript-demo.git ${fullDir}`
            }
            childProcess.execSync(command)
            loading.stop()
        })
    })
program.parse(process.argv)