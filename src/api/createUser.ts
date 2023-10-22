import { Request, Response } from "express";
import { ApiModule } from "../types";
import { join } from "path";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { database } from "../database"

const apiExports: ApiModule = {
    route: "/createuser",
    type: "post",
    async execute(req: Request, res: Response) {
        const data = req.body
        console.log(data) // --> This returns undefined.

        // sanity checks
        if (!data || !data?.username || !data?.userid || !data?.online) return res.send({status: 400, message: "BAD_REQUEST"})

        const username = data.username
        const userid = data.userid
        const online = data.online
        
        const ref = doc(database.mainDatabase, "users", userid)
        const dbrep = await getDoc(ref)

        if (dbrep.exists()) return res.send({status: 500, message: "RECORD_EXISTS"})

        await setDoc(doc(database.mainDatabase, "users", userid), {
            username: username, 
            userId: userid,
            isOnline: online
        }).then(() => {
            return res.send({status: 200, message: "OK"})
        })
    },
}


export default apiExports