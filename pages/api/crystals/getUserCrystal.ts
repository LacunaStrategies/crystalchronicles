import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function getUserCrystal(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req
    const { crystalId } = req.query
    
    const session = await getServerSession(req, res, authOptions)
    if (!session)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'GET':


            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const userCrystal = await db.collection('user_crystals').findOne(
                {
                    user_id: new ObjectId(session.user._id),
                    crystal_id: crystalId
                }
            )

            console.log(userCrystal)

            res.status(200).json({ success: true, data: userCrystal })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}