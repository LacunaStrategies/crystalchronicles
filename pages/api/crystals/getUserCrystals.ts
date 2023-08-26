
import { NextApiRequest, NextApiResponse } from "next"

import { crystals } from "@/lib/mock/crystals"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function getUserCrystals(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req
    const { collectionId } = req.query

    const session = await getServerSession(req, res, authOptions)
    if (!session)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'GET':

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            let query

            if (!collectionId) {
                query = { user_id: new ObjectId(session.user._id), collections: new ObjectId(collectionId) }
            } else {
                query = { user_id: new ObjectId(session.user._id) }
            }

            const userCrystals = await db.collection('user_crystals').find(query).toArray()
            const trimCrystalIds = userCrystals.map(userCrystal => String(userCrystal._id))

            const trimCrystals = crystals.map(crystal => trimCrystalIds.includes(crystal._id))

            res.status(200).json({ success: true, data: { userCrystals, trimCrystals } })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }
}