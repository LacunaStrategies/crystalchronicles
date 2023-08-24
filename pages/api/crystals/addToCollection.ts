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
            const { crystalData, collectionsCheckboxes } = data

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const userCrystal = await db.collection('user_crystals').findOne(
                {
                    user_id: new ObjectId(session.user._id),
                    crystal_id: new ObjectId(crystalData._id)
                }
            )

            // If user doesn't already have crystal, add it to their user crystals
            if (!userCrystal) {

            } // otherwise, update crystal document with collection IDs 
            else {
                
            }
                

            res.status(200).json({ success: true })

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}