import { Request, Response } from "express";
import { ApiModule } from "../types";
import { join } from "path";
import { doc, getDoc } from "firebase/firestore/lite";
import { database } from "../database"

const apiExports: ApiModule = {
    route: "/getuserdata/:userId", // Index route
    type: "get",
    async execute(req: Request, res: Response) {
        const userIdRequested = req.params?.userId
        
        let reply = {
            status: 404,
            message: "USERID_NOT_FOUND",
            data: {}
        }

        const docReference = doc(database.mainDatabase, "users", userIdRequested.toString())
        const docReply = await getDoc(docReference)

        if (!docReply.exists()) return res.send(reply)

        const data = docReply.data()

        reply = {
            status: 200,
            message: "OK",
            data: {
                userid: userIdRequested,
                username: data.username,
                // TERNARY :on: :top: FOR REFERENCE:
                //                        true   -   false
                online: data.isOnline ? "Online" : "Offline"
            }
        }

        return res.send(reply);
    },
}


export default apiExports