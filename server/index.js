const inquirer = require('inquirer')
const db = require('../models')

const { Crud, CrudOptions, CreateProjectList, CreateExpenseList, CreateEarningList, CreateImageList, CreateTimeSheetList, UpdateEarningsList, UpdateExpensesList, UpdateProjectList, UpdateTimeSheetList } = require('./prompt')
//Main Menu Start
const MainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'crud',
            message: 'Choose one of the following options.',
            choices: Crud
        }
    ]).then(({ crud }) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'crud_option',
                message: `What To ${crud}?`,
                choices: CrudOptions
            }
        ])
            .then(({ crud_option }) => {
                CrudOptionsMenu(crud, crud_option)
            })
            .catch(err => {
                console.log(err)
                MainMenu()
            })
    })
}; MainMenu()

const CrudOptionsMenu = (crud, crud_option) => {
    switch (crud) {
        case 'Create':
            switch (crud_option) {
                case 'Project':
                    CreateProject()
                    break
                case 'Expense':
                    CreateExpense()
                    break
                case 'TimeSheet':
                    CreateEarning()
                    break
                case 'Image':
                    CreateImage()
                    break
                case 'TimeSheet':
                    CreateTimeSheet()
                    break
                case 'Main Menu':
                    MainMenu()
                    break
            }
            break
        case 'Read':
            switch (crud_option) {
                case 'Project':
                    break
                case 'Expense':
                    break
                case 'Earning':
                    break
                case 'Image':
                    break
                case 'TimeSheet':
                    ReadTimeSheet()
                    break
            }
            break
        case 'Update':
            switch (crud_option) {
                case 'Project':
                    UpdateProject()
                    break
                case 'Expense':
                    UpdateExpense()
                    break
                case 'Earning':
                    UpdateEarning()
                    break
                case 'Image':
                    UpdateImage()
                    break
                case 'TimeSheet':
                    UpdateTimeSheet()
                    break
                case 'UpdateBy':
                    UpdateBy()
                    break
            }
            break
    }
}
//Main Menu Ends

//Create Project Start
const CreateProject = () => {
    const my_input_prompt = []
    CreateProjectList.forEach(list => {
        my_input_prompt.push(
            {
                type: 'input',
                name: list,
                message: `Enter Project ${list}`,
            }
        )
    })
    inquirer.prompt(my_input_prompt)
        .then(({ name, address, address2, city_code, client_name, user_name, status, started }) => {
            (async () => {
                const user_id = await db.Artihaus_Users
                    .find({ name: user_name })
                    .then(res => {
                        return res[0]._id
                    })
                const client_id = await db.Artihaus_Users
                    .find({ name: client_name })
                    .then(res => {
                        return res[0]._id
                    })
                db.Artihaus_Projects
                    .create({
                        name, user_id, address, address2, city_code, client_id, status, started
                    })
                    .then(res => {
                        console.log(res)
                        MainMenu()
                    })
                    .catch(err => {
                        console.log(err)
                        MainMenu()
                    })
            })()
        })
        .catch(err => {
            console.log(err)
            MainMenu()
        })
}
//Create Project Ends

//Create Expense Start
const CreateExpense = () => {
    const CreateExpenseMenu = (project_name, project_id) => {
        const choices = ['Go To Main Menu', 'Create Expense For Project']
        if (project_name) choices.push(`Continuing Create Expense For ${project_name}`)
        inquirer.prompt([
            {
                type: 'list',
                name: 'go_to',
                choices: choices
            }
        ])
            .then(({ go_to }) => {
                if (go_to === 'Go To Main Menu') MainMenu()
                if (go_to === 'Create Expense For Project') CreateExpenseByProjectName()
                if (go_to === `Continuing Create Expense For ${project_name}`) ContinueCreateExpenseForProject(project_name, project_id)
            })
    }; CreateExpenseMenu()

    const CreateExpenseByProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name To Create Expense To: '
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        let project_id = res[0]._id
                        console.log(res)
                        ContinueCreateExpenseForProject(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        CreateExpenseMenu()
                    })
            })
    }
    const ContinueCreateExpenseForProject = (project_name, project_id) => {
        console.log(project_name, project_id)
        const my_input_prompt = []
        CreateExpenseList.forEach(list => {
            my_input_prompt.push(
                {
                    type: 'input',
                    name: list,
                    message: `Enter Expense ${list}`,
                }
            )
        })
        inquirer.prompt(my_input_prompt)
            .then(({ category, subcategory, status, amount, createdAt, }) => {
                let user_id
                Users.map(user => { if (user.name === 'tarciso loiola') user_id = user._id.$oid })
                db.Artihaus_Expenses
                    .create({
                        project_id, category, subcategory, amount, status, createdBy: user_id, isArtipro: true, isApproved: true, createdAt,
                    })
                    .then(res => {
                        console.log(res)
                        CreateExpenseMenu(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        CreateExpenseMenu()
                    })
            })
    }
}
//Create Expense Ends

//Create Earning Start
const CreateEarning = (crud, crud_option) => {
    const Earning = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name To Create Earning: '
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        let project_id
                        res.map(project => project_id = project._id)
                        const my_input_prompt = []
                        CreateEarningList.forEach(list => {
                            my_input_prompt.push(
                                {
                                    type: 'input',
                                    name: list,
                                    message: `Enter Earning ${list}`,
                                }
                            )
                        })
                        inquirer.prompt(my_input_prompt)
                            .then(({ amount, category, size, details, status }) => {
                                let user_id = ''
                                Users.map(user => { if (user.name === 'tarciso loiola') user_id = user._id.$oid })

                                db.Artihaus_Earnings
                                    .create({
                                        project_id: project_id, user_id, amount, category, size, details, status
                                    })
                                    .then(res => {
                                        console.log(res)
                                        inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'go_to',
                                                choices: ['Go To Main Menu', `Continuing Create Earning For ${project_name}`]
                                            }
                                        ])
                                            .then(({ go_to }) => {
                                                if (go_to === 'Go To Main Menu') MainMenu()
                                                if (go_to === `Continuing Create Earning For ${project_name}`) Earning()
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        MainMenu()
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                MainMenu()
                            })
                    })
            })
    }
    Earning()
}
//Create Earning Ends

//Create Image Start
const CreateImage = (crud, crud_option) => {
    const Image = () => {
        // project_id
        // user_id
        // url
        // ref
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name To Create Image: '
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        let project_id
                        res.map(project => project_id = project._id)
                        const my_input_prompt = []
                        CreateImageList.forEach(list => {
                            my_input_prompt.push(
                                {
                                    type: 'input',
                                    name: list,
                                    message: `Enter Image ${list}`,
                                }
                            )
                        })
                        inquirer.prompt(my_input_prompt)
                            .then(({ amount, category, size, details, status }) => {
                                let user_id = ''
                                Users.map(user => { if (user.name === 'tarciso loiola') user_id = user._id.$oid })
                                db.Artihaus_Images
                                    .create({
                                        project_id: project_id, user_id, amount, category, size, details, status
                                    })
                                    .then(res => {
                                        console.log(res)
                                        inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'go_to',
                                                choices: ['Go To Main Menu', `Continuing Create Image For ${project_name}`]
                                            }
                                        ])
                                            .then(({ go_to }) => {
                                                if (go_to === 'Go To Main Menu') MainMenu()
                                                if (go_to === `Continuing Create Image For ${project_name}`) Image()
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        MainMenu()
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                MainMenu()
                            })
                    })
            })

    }; Image()
}
//Create Image Ends

//Create TimeSheet Start
const CreateTimeSheet = (crud, crud_option) => {

    const CreateTimeSheetMenu = (project_name, project_id) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'go_to',
                choices: ['Go To Main Menu', 'Create TimeSheet For Project', `Continuing Create TimeSheet For ${project_name}`]
            }
        ])
            .then(({ go_to }) => {
                if (go_to === 'Go To Main Menu') MainMenu()
                if (go_to === 'Create TimeSheet For Project') CreateByProjectName()
                if (go_to === `Continuing Create TimeSheet For ${project_name}`) ContinueCreateForProject(project_name, project_id)
            })
    }

    const CreateByProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name To Create TimeSheet: '
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        console.log(res)
                        let project_id
                        res.map(project => project_id = project._id)
                        ContinueCreateForProject(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        MainMenu()
                    })
            })
    }; CreateByProjectName()

    const ContinueCreateForProject = (project_name, project_id) => {
        const my_input_prompt = []
        CreateTimeSheetList.forEach(list => {
            my_input_prompt.push(
                {
                    type: 'input',
                    name: list,
                    message: `Enter TimeSheet ${list}`,
                }
            )
        })
        inquirer.prompt(my_input_prompt)
            .then(({ started, finished, status, isArtipro }) => {
                let user_id
                Users.map(user => { if (user.name === 'tarciso loiola') user_id = user._id.$oid })
                db.Artihaus_TimeSheet
                    .create({
                        project_id, user_id, started, finished, status, isArtipro
                    })
                    .then(res => {
                        console.log(res)
                        CreateTimeSheetMenu(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        MainMenu()
                    })
            })
    }
}
//Create TimeSheet Ends

const ReadProject = () => {
    const ReadProjectMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'read',
                choices: ['Go To Main Menu', 'Read Project By Field']
            }
        ])
            .then(({ read }) => {
                switch (read) {
                    case 'Go To Main Menu': MainMenu()
                }
            })
    }; ReadProjectMenu()
}
const ReadExpenses = () => {
    const ReadExpensesMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'read',
                choices: ['Go To Main Menu', 'Read Expenses By Field', 'Read All Expenses']
            }
        ])
            .then(({ read }) => {
                switch (read) {
                    case 'Go To Main Menu': MainMenu()
                    case 'Read Expenses By Field': ReadByField()
                    case 'Read All Expenses': ReadAll()
                }
            })
    }; ReadExpensesMenuReadProjectMenu()
}
const ReadEarnings = () => {
    const ReadEarningsMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'read',
                choices: ['Go To Main Menu', 'Read Earnings By Field', 'Read All Earnings']
            }
        ])
            .then(({ read }) => {
                switch (read) {
                    case 'Go To Main Menu': MainMenu()
                }
            })
    }; ReadEarningsMenuReadProjectMenu()
}
const ReadImages = () => {
    const ReadImagesMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'read',
                choices: ['Go To Main Menu', 'Read Images By Field', 'Read All Images']
            }
        ])
            .then(({ read }) => {
                switch (read) {
                    case 'Go To Main Menu': MainMenu()
                }
            })
    }; ReadImagesMenuReadProjectMenu()
}
const ReadTimeSheet = () => {
    const ReadTimeSheetMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'read',
                choices: ['Go To Main Menu', 'Read TimeSheet By Field']
            }
        ])
            .then(({ read }) => {
                switch (read) {
                    case 'Go To Main Menu': MainMenu(); break
                    case 'Read TimeSheet By Field': ReadByField(); break
                }
            })
    }; ReadTimeSheetMenu()

    const ReadByField = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name'
            }
        ])
            .then(({ project_name }) => {
                ReadByProjectName(project_name)
            })
    }
    const ReadByProjectName = (project_name) => {
        db.Artihaus_Projects
            .find({ name: project_name })
            .then(res => {
                const project_id = res[0]._id
                ReadTimeSheetByProjectName(project_id)
            })
            .catch(err => {
                console.log(err)
                ReadTimeSheetMenu()
            })
    }

    const ReadTimeSheetByProjectName = (project_id) => {
        db.Artihaus_TimeSheet
            .find({ project_id })
            .then(res => {
                console.log(res)
                ReadTimeSheetMenu()
            })
            .catch(err => {
                console.log(err)
                ReadTimeSheetMenu()
            })
    }
}

//Update Project Start
const UpdateProject = () => {
    const UpdateProjectMenu = (project_name, project_id) => {

        inquirer.prompt([
            {
                type: 'list',
                name: 'go_to',
                choices: ['Go To Main Menu', `Update Project ${project_name ? project_name : ''}`]
            }
        ])
            .then(({ go_to }) => {
                if (go_to === 'Go To Main Menu') MainMenu()
                if (go_to === `Update Project ${project_name ? project_name : ''}`) UpdateProjectByName(project_name, project_id)
            })
    }; UpdateProjectMenu()

    const UpdateProjectByName = (project_name, project_id) => {
        if (!project_name) GetProjectName()
        else {
            UpdateField(project_name, project_id)
        }
    }
    const GetProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Enter Project Name: '
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        let project_id
                        if (res.length === 1) {
                            res.map(project => {
                                project_id = project._id
                            })
                        }
                        UpdateField(project_name, project_id)
                    })
            })
    }
    const UpdateField = (project_name, project_id) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'field',
                choices: UpdateProjectList
            }
        ])
            .then(({ field }) => {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'value',
                        message: `Enter value for ${field}`
                    }
                ])
                    .then(({ value }) => {
                        let query
                        if (field === 'name') query = { name: value }
                        if (field === 'address') query = { address: value }
                        if (field === 'city_code') query = { city_code: value }
                        if (field === 'status') query = { status: value }
                        if (field === 'started') query = { started: value }
                        if (field === 'finished') query = { finished: value }
                        db.Artihaus_Projects
                            .findByIdAndUpdate(
                                { _id: project_id },
                                { $set: query }
                            )
                            .then(res => {
                                console.log(res)
                                UpdateProjectMenu(project_name, project_id)
                            })
                    })
            })
    }
}
//Update Project Ends

//Update Expense Start
const UpdateExpense = () => {
    const UpdateExpenseMenu = (project_name, project_id) => {
        const choices = ['Go To Main Menu', 'Update By Field', 'Update By Project Name']
        if (project_name) choices[3] = `Continuing Update Expense For ${project_name}`
        inquirer.prompt([
            {
                type: 'list',
                name: 'update_by',
                choices: choices
            }
        ])
            .then(({ update_by }) => {
                switch (update_by) {
                    case 'Go To Main Menu':
                        MainMenu()
                        break
                    case 'Update By Field':
                        UpdateByField()
                        break
                    case 'Update By Project Name': `Continuing Update Expense For ${project_name}`
                        UpdateByProjectName()
                        break
                    case `Continuing Update Expense For ${project_name}`:
                        ContinueUpdateForProject(project_name, project_id)
                        break
                }
            })
    }; UpdateExpenseMenu()

    const UpdateByField = () => {
        console.log('UpdateByField')
        UpdateExpenseMenu()
    }

    const UpdateByProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Find All Expenses For Project Name:'
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        const { _id: project_id } = res[0]
                        console.log(project_name, project_id)
                        ContinueUpdateForProject(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        UpdateExpenseMenu()
                    })
            })
    }

    const ContinueUpdateForProject = (project_name, project_id) => {
        console.log(project_name, project_id)
        db.Artihaus_Expenses
            .find({ project_id })
            .then(res => {
                console.log('Choose One Of These Expenses:')
                let expenses = []
                let index = 0
                res.forEach(e => {
                    let { _id: expense_id, category, subcategory, amount, status, isArtipro, isApproved, createdAt } = e
                    expenses[index] = `_id:${expense_id}, Category:${category}, Subcategory:${subcategory}, Amount:${amount}, Status:${status}, isArtipro:${isArtipro}, isApproved:${isApproved}, CreatedAt:${createdAt}`
                    index++
                })
                expenses.push('exit')
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'expense',
                        choices: expenses
                    }
                ])
                    .then(({ expense }) => {
                        if (expense === 'exit') UpdateExpenseMenu()
                        else {
                            const expense_id = expense.slice(4, expense.indexOf(","))
                            console.log(expense_id)
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'field',
                                    message: 'Choose A Field To Update',
                                    choices: UpdateExpensesList
                                }
                            ])
                                .then(({ field }) => {
                                    if (field !== 'delete' || field !== 'exit') {
                                        inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'value',
                                                message: `Enter ${field} value: `
                                            }
                                        ])
                                            .then(({ value }) => {
                                                if (field === 'category') query = { category: value }
                                                if (field === 'subcategory') query = { subcategory: value }
                                                if (field === 'amount') query = { amount: value }
                                                if (field === 'status') query = { status: value }
                                                if (field === 'isArtipro') query = { isArtipro: value }
                                                if (field === 'isApproved') query = { isApproved: value }
                                                if (field === 'createdAt') query = { createdAt: value }
                                                DBUpdateExpense(project_name, project_id, expense_id, query)
                                            })
                                    }
                                    if (field === 'delete') {
                                        DBDeleteExpense(project_name, project_id, expense_id)
                                    }
                                    if (field === 'exit') UpdateExpenseMenu(project_name, project_id, expense_id)
                                })
                        }
                    })
            })
    }

    const DBUpdateExpense = (project_name, project_id, expense_id, query) => {
        db.Artihaus_Expenses
            .findByIdAndUpdate(
                { _id: expense_id },
                { $set: query }
            )
            .then(res => {
                UpdateExpenseMenu(project_name, project_id)
            })
    }

    const DBDeleteExpense = ({ project_name, project_id, expense_id }) => {
        db.Artihaus_Expenses
            .findByIdAndDelete(
                { _id: expense_id },
            )
            .then(res => {
                UpdateExpenseMenu(project_name, project_id)
            })
    }
}
//Update Expense Ends

//Update Earning Start
const UpdateEarning = () => {
    const UpdateEarningMenu = (project_name, project_id) => {
        const choices = ['Go To Main Menu', 'Update By Field', 'Update By Project Name']
        if (project_name) choices[3] = `Continuing Update Earning For ${project_name}`
        inquirer.prompt([
            {
                type: 'list',
                name: 'update_by',
                choices: choices
            }
        ])
            .then(({ update_by }) => {
                switch (update_by) {
                    case 'Go To Main Menu':
                        MainMenu()
                        break
                    case 'Update By Field':
                        UpdateByField()
                        break
                    case 'Update By Project Name': `Continuing Update Earning For ${project_name}`
                        UpdateByProjectName()
                        break
                    case `Continuing Update Earning For ${project_name}`:
                        ContinueUpdateForProject(project_name, project_id)
                        break
                }
            })
    }; UpdateEarningMenu()

    const UpdateByField = () => {
        console.log('UpdateByField')
        UpdateEarningMenu()
    }

    const UpdateByProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Find All Earnings For Project Name:'
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        const { _id: project_id } = res[0]
                        console.log(project_name, project_id)
                        ContinueUpdateForProject(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        UpdateEarningMenu()
                    })
            })
    }

    const ContinueUpdateForProject = (project_name, project_id) => {
        console.log(project_name, project_id)
        db.Artihaus_Earnings
            .find({ project_id })
            .then(res => {
                console.log('Choose One Of These Earnings:')
                let earnings = []
                let index = 0
                res.forEach(e => {
                    let { _id: earning_id, amount, category, size, details, status, paidAt } = e
                    earnings[index] = `_id:${earning_id}, Amount:${amount}, Category:${category}, Size:${size}, Details:${details}, Status:${status}, PaidAt:${paidAt}`
                    index++
                })
                earnings.push('exit')
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'earning',
                        choices: earnings
                    }
                ])
                    .then(({ earning }) => {
                        if (earning === 'exit') UpdateEarningMenu()
                        else {
                            const earning_id = earning.slice(4, earning.indexOf(","))
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'field',
                                    message: 'Choose A Field To Update',
                                    choices: UpdateEarningsList
                                }
                            ])
                                .then(({ field }) => {
                                    if (field !== 'delete' || field !== 'exit') {
                                        inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'value',
                                                message: `Enter ${field} value: `
                                            }
                                        ])
                                            .then(({ value }) => {
                                                let query
                                                if (field === 'amount') query = { amount: value }
                                                if (field === 'category') query = { category: value }
                                                if (field === 'size') query = { size: value }
                                                if (field === 'details') query = { details: value }
                                                if (field === 'status') query = { status: value }
                                                if (field === 'paidAt') query = { paidAt: value }
                                                DBUpdateTimeSheet(project_name, project_id, earning_id, query)
                                            })
                                    }
                                    if (field === 'delete') {
                                        DBDeleteEarning(project_name, project_id, earning_id)
                                    }
                                    if (field === 'exit') UpdateEarningMenu(project_name, project_id, earning_id)
                                })
                        }
                    })
            })
    }

    const DBUpdateTimeSheet = (project_name, project_id, earning_id, query) => {
        db.Artihaus_Earnings
            .findByIdAndUpdate(
                { _id: earning_id },
                { $set: query }
            )
            .then(res => {
                UpdateEarningMenu(project_name, project_id)
            })
    }

    const DBDeleteEarning = ({ project_name, project_id, earning_id }) => {
        db.Artihaus_Earnings
            .findByIdAndDelete(
                { _id: earning_id },
            )
            .then(res => {
                UpdateEarningMenu(project_name, project_id)
            })
    }
}
//Update Earning Ends

//Update Image Start
const UpdateImage = () => {
    const Image = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Find All Images For Project Name: '
            }
        ])
            .then(({ project_name }) => {
                const ContinuingUpdateFor = (project_name) => {
                    db.Artihaus_Projects
                        .find({ name: project_name })
                        .then(res => {
                            const { _id } = res[0]
                            db.Artihaus_Images
                                .find({ project_id: _id })
                                .then(res => {
                                    console.log('Choose One Of These Images:')
                                    let images = []
                                    let index = 0
                                    res.forEach(e => {
                                        let { _id: image_id, amount, category, size, details, status, paidAt } = e
                                        images[index] = `_id:${image_id}, Amount:${amount}, Category:${category}, Size:${size}, Details:${details}, Status:${status}, PaidAt:${paidAt}`
                                        index++
                                    })
                                    images.push('exit')
                                    console.log(images)
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'images',
                                            choices: images
                                        }
                                    ])
                                        .then(({ images }) => {
                                            if (images === 'exit') MainMenu()
                                            else {
                                                const image_id = images.slice(4, images.indexOf(","))
                                                inquirer.prompt([
                                                    {
                                                        type: 'list',
                                                        name: 'field',
                                                        message: 'Choose A Field To Update',
                                                        choices: UpdateImagesList
                                                    }
                                                ])
                                                    .then(({ field }) => {
                                                        if (field !== 'delete' || field !== 'exit') {
                                                            inquirer.prompt([
                                                                {
                                                                    type: 'input',
                                                                    name: 'value',
                                                                    message: `Enter ${field} value: `
                                                                }
                                                            ])
                                                                .then(({ value }) => {
                                                                    let query
                                                                    if (field === 'amount') query = { amount: value }
                                                                    if (field === 'category') query = { category: value }
                                                                    if (field === 'size') query = { size: value }
                                                                    if (field === 'details') query = { details: value }
                                                                    if (field === 'status') query = { status: value }
                                                                    if (field === 'paidAt') query = { paidAt: value }
                                                                    db.Artihaus_Images
                                                                        .findByIdAndUpdate(
                                                                            { _id: image_id },
                                                                            { $set: query }
                                                                        )
                                                                        .then(res => {
                                                                            console.log(res)
                                                                            inquirer.prompt([
                                                                                {
                                                                                    type: 'list',
                                                                                    name: 'go_to',
                                                                                    choices: ['Go To Main Menu', 'Update Image For Project Project', `Continuing Update Image For ${project_name}`]
                                                                                }
                                                                            ])
                                                                                .then(({ go_to }) => {
                                                                                    if (go_to === 'Go To Main Menu') MainMenu()
                                                                                    if (go_to === 'Update Image For Project Project') Image()
                                                                                    if (go_to === `Continuing Update Image For ${project_name}`) ContinuingUpdateFor(project_name)
                                                                                })
                                                                        })

                                                                })
                                                        }
                                                        if (field === 'delete') {
                                                            db.Artihaus_Images
                                                                .findByIdAndDelete(
                                                                    { _id: image_id }
                                                                )
                                                                .then(res => {
                                                                    console.log(res)
                                                                    inquirer.prompt([
                                                                        {
                                                                            type: 'list',
                                                                            name: 'go_to',
                                                                            choices: ['Go To Main Menu', 'Update Earning For Project Project', `Continuing Create Earning To ${project_name}`]
                                                                        }
                                                                    ])
                                                                        .then(({ go_to }) => {
                                                                            if (go_to === 'Go To Main Menu') MainMenu()
                                                                            if (go_to === 'Update Earning For Project Project') Image()
                                                                            if (go_to === `Continuing Update Earning For ${project_name}`) ContinuingUpdateFor(project_name)
                                                                        })
                                                                })
                                                                .catch(err => {
                                                                    console.log(err)
                                                                    MainMenu()
                                                                })
                                                        }
                                                        if (field === 'exit') MainMenu()
                                                    })
                                            }
                                        })
                                })
                                .catch(err => {
                                    console.log('ERROR!')
                                    MainMenu()
                                })
                        })
                        .catch(err => {
                            console.log('ERROR!')
                            MainMenu()
                        })
                }; ContinuingUpdateFor(project_name)
            })
    }; Image()
}
//Update Image Ends

//Update TimeSheet Start
const UpdateTimeSheet = () => {
    const UpdateTimeSheetMenu = (project_name, project_id) => {
        const choices = ['Go To Main Menu', 'Update By Field', 'Update By Project Name']
        if (project_name) choices[3] = `Continuing Update TimeSheet For ${project_name}`
        inquirer.prompt([
            {
                type: 'list',
                name: 'update_by',
                choices: choices
            }
        ])
            .then(({ update_by }) => {
                switch (update_by) {
                    case 'Go To Main Menu':
                        MainMenu()
                        break
                    case 'Update By Field':
                        UpdateByField()
                        break
                    case 'Update By Project Name':
                        UpdateByProjectName()
                        break
                    case `Continuing Update TimeSheet For ${project_name}`:
                        ContinueUpdateForProject(project_name, project_id)
                        break
                }
            })
    }; UpdateTimeSheetMenu()

    const UpdateByField = () => {
        console.log('UpdateByField')
        UpdateTimeSheetMenu()
    }

    const UpdateByProjectName = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project_name',
                message: 'Find All TimeSheet For Project Name:'
            }
        ])
            .then(({ project_name }) => {
                db.Artihaus_Projects
                    .find({ name: project_name })
                    .then(res => {
                        const { _id: project_id } = res[0]
                        console.log(project_name, project_id)
                        ContinueUpdateForProject(project_name, project_id)
                    })
                    .catch(err => {
                        console.log(err)
                        UpdateTimeSheetMenu()
                    })
            })
    }

    const ContinueUpdateForProject = (project_name, project_id) => {
        console.log(project_name, project_id)
        db.Artihaus_TimeSheet
            .find({ project_id })
            .then(res => {
                console.log('Choose One Of These TimeSheet:')
                let timesheet = []
                let index = 0
                res.forEach(e => {
                    let { _id: timesheet_id, started, finished, status, isArtipro, isUploaded } = e
                    timesheet[index] = `_id:${timesheet_id}, Started:${started}, Finished:${finished}, Status:${status}, IsArtipro:${isArtipro}, IsUploaded:${isUploaded}`
                    index++
                })
                timesheet.push('exit')
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'time_sheet',
                        choices: timesheet
                    }
                ])
                    .then(({ time_sheet }) => {
                        if (time_sheet === 'exit') UpdateTimeSheetMenu()
                        else {
                            const timesheet_id = timesheet.slice(4, timesheet.indexOf(","))
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'field',
                                    message: 'Choose A Field To Update',
                                    choices: UpdateTimeSheetList
                                }
                            ])
                                .then(({ field }) => {
                                    if (field !== 'delete' || field !== 'exit') {
                                        inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'value',
                                                message: `Enter ${field} value: `
                                            }
                                        ])
                                            .then(({ value }) => {
                                                let query
                                                if (field === 'started') query = { started: value }
                                                if (field === 'finished') query = { finished: value }
                                                if (field === 'status') query = { status: value }
                                                if (field === 'isArtipro') query = { isArtipro: value }
                                                if (field === 'isUploaded') query = { isUploaded: value }
                                                DBUpdateTimeSheet(project_name, project_id, timesheet_id, query)
                                            })
                                    }
                                    if (field === 'delete') {
                                        DBDeleteTimeSheet(project_name, project_id, timesheet_id)
                                    }
                                    if (field === 'exit') UpdateTimeSheetMenu(project_name, project_id, timesheet_id)
                                })
                        }
                    })
            })
    }

    const DBUpdateTimeSheet = (project_name, project_id, earning_id, query) => {
        db.Artihaus_Earnings
            .findByIdAndUpdate(
                { _id: earning_id },
                { $set: query }
            )
            .then(res => {
                UpdateTimeSheetMenu(project_name, project_id)
            })
    }

    const DBDeleteTimeSheet = ({ project_name, project_id, earning_id }) => {
        db.Artihaus_Earnings
            .findByIdAndDelete(
                { _id: earning_id },
            )
            .then(res => {
                UpdateTimeSheetMenu(project_name, project_id)
            })
    }
}
//Update TimeSheet Ends

//Update By Start
const UpdateBy = () => {
    const Update = () => {
        inquirer.prompt

    }; Update()
}
//Update By Ends
