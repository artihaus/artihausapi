const db = require('../models')
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient

// let delay = 433276000

// let DataTransfer = setTimeout(request = () => {
//     console.log(moment().format('LTS'))

//     DataTransfer = setTimeout(request, delay)
// }, delay)

// MongoClient.connect('mongodb://localhost/Artipro', function (err, dbb) {
//     if (err) throw err
//     let start = '2018-12-31'
//     let end = '2019-07-15'
//     const dbo = dbb.db('Artipro')
//     dbo.collection('artipro_expenses').find({
//         createdAt: { "$gte": new Date('2018-12-31'), "$lt": new Date('2019-07-15') }
//     }).toArray(function (err, res_artipro_expenses) {
//         if (err) {
//             console.log('ERROR 500!')
//             dbb.close()
//             throw err
//         }
//         console.log(res_artipro_expenses.length)

        // let index = 0
        // let delay = 2000

        // db.Artihaus_Expenses
        // .create(res_artipro_expenses)
        // .then( res => console.log( 'RES', res.length ))
        // .catch( err => console.log( err ))
        // let DataTransfer = setTimeout(request = () => {

        //     DataTransfer = setTimeout(request, delay)
        //     index++
        // }, delay)
//     })
// })


/*

db.Artihaus_Jobs
    .find({})
    .then(artihaus_jobs => {

        db.Artihaus_Clients
            .find({})
            .then( artihaus_clients => {

                db.Artihaus_Projects
                .find({})
                .then( artihaus_projects => {

                    let index = 0
                    let delay = 1500;

                    let DataMigrate = setTimeout(function request() {
                        let artihaus_client_id
                        const { name:  artihaus_project_name, client_id  } = artihaus_projects[index]
                        console.log( artihaus_project_name , client_id)
                        artihaus_jobs.map(artihaus_job => {
                            let { name: artihaus_job_name, client: artihaus_job_client_name  } = artihaus_job
                            if( artihaus_job_name === artihaus_project_name ) {
                                console.log( artihaus_job_name, artihaus_job_client_name )
                                artihaus_clients.map( client => {
                                    let { name: artihaus_client_name, _id} = client
                                    if(artihaus_job_client_name === artihaus_client_name ){
                                        db.Artihaus_Projects
                                        .findOneAndUpdate(
                                            { name: artihaus_job_name },
                                            { $set: {
                                                client_id: _id
                                            }}
                                        )
                                        .then( res => {
                                            console.log( res )
                                            index++
                                            DataMigrate = setTimeout( request, delay)
                                        })
                                    }
                                })
                            }
                        })

                    }, delay)
                })
            })
    })

    */