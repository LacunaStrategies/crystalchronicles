import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function createCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const session = await getServerSession(req, res, authOptions)
    if (!session?.user._id)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'POST':

            const data = JSON.parse(req.body)
            const { newCollectionName } = data

            if (!newCollectionName || newCollectionName === '')
                return res.status(400).json({ success: false, message: 'Collection name is required!' })

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const existingCollection = await db.collection('crystal_collections').findOne(
                {
                    user_id: new ObjectId(session.user._id),
                    name: newCollectionName
                },
                {
                    collation: { locale: 'en', strength: 2 }
                }
            )

            if (existingCollection)
                return res.status(400).json({ success: false, message: `A collection with the name "${newCollectionName}" already exists!` })

            const newCollection = await db.collection('crystal_collections').insertOne(
                {
                    user_id: new ObjectId(session.user._id),
                    name: newCollectionName,
                    user_crystal_ids: []
                }
            )

            res.status(200).json({ success: true, data: newCollection })

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}