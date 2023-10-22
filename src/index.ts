import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { readdirSync } from 'fs'
import { join } from 'path'

import express from 'express'
import firebaseConfig from './config/firebase.json'
import webConfig from './config/web.json'
import { ApiModule } from './types'

const WebApp = express()

const apiFolder = join(__dirname, "./api")
const apiModules = readdirSync(apiFolder)

WebApp.listen(webConfig.port,() => {
    console.log('Started endpoint at port ' + webConfig.port)
})

WebApp.use(express.json())

apiModules.forEach((modulePath) => {
    const module: ApiModule = require(`${apiFolder}/${modulePath}`).default
    console.log(module)

    console.log("Assigning", module.route, " to", module.type)
    switch(module.type){
        case "get":
            WebApp.get(module.route, (req, res) => {
                module.execute(req, res)
            })
        case "post":
            WebApp.post(module.route, (req, res) => {
                module.execute(req, res)
            })
    }
    
})