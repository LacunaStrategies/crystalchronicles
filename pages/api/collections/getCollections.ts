import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function getCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const session = await getServerSession(req, res, authOptions)
    if (!session)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'GET':

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const userCrystalCollections = await db.collection('crystal_collections').find({ user_id: new ObjectId(session.user._id) }).toArray()

            res.status(200).json({ success: true, data: userCrystalCollections })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}