import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

import { Crystal } from "@/types/Crystal"
import { ICollectionCheckbox, ICrystalCollection } from "@/types/CrystalCollection"

export default async function createCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const session = await getServerSession(req, res, authOptions)
    if (!session?.user._id)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'POST':

            const data = JSON.parse(req.body)
            const crystalData: Crystal = data.crystalData
            const collectionsCheckboxes: ICollectionCheckbox[] = data.collectionsCheckboxes

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            const collections = collectionsCheckboxes.map(collection => collection._id)

            const userCrystal = await db.collection('user_crystals').updateOne(
                {
                    user_id: new ObjectId(session.user._id),
                    crystal_id: new ObjectId(crystalData._id),
                },
                {
                    $set: {
                        user_id: new ObjectId(session.user._id),
                        crystal_id: new ObjectId(crystalData._id),
                        custom_name: '',
                        custom_nickname: '',
                        notes: '',
                        collections,
                    }
                },
                {
                    upsert: true
                }
            )

            console.log(userCrystal)

            res.status(200).json({ success: true, data: userCrystal })

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}