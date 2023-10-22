import { Response, Request } from "express"

export interface ApiModule {
    route: string
    type: "get" | "post"
    async execute: (req: Request, res: Response) => void
}