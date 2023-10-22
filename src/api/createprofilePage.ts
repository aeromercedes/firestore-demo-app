import { Request, Response } from "express";
import { ApiModule } from "../types";
import { join } from "path";

const apiExports: ApiModule= {
    route: "/createprofile", // Index route
    type: "get",
    async execute(req: Request, res: Response) {
        const PageLocation = join(__dirname, "../../src/pages/createprofile.html")
        res.sendFile(PageLocation)
    },
}

export default apiExports