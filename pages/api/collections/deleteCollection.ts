import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function deleteCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const session = await getServerSession(req, res, authOptions)
    if (!session?.user._id)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'POST':

            const data = JSON.parse(req.body)
            const { crystalCollectionId } = data

            if (!crystalCollectionId || crystalCollectionId === '')
                return res.status(400).json({ success: false, message: 'A valid document ID is required for this operation!' })

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const deletedCollection = await db.collection('crystal_collections').deleteOne(
                {
                    _id: new ObjectId(crystalCollectionId),
                    user_id: new ObjectId(session.user._id),
                }
            )

            res.status(200).json({ success: true, data: deletedCollection })

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }
}