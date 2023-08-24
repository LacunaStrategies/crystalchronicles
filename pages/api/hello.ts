import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb/client"

export default async function createCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    switch (method) {
        case 'GET':

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const users = await db.collection('users').find().toArray()

            res.status(200).json({ success: true, data: users })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}