import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function getCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req
    let { collectionId } = req.query

    if (!(typeof collectionId === 'string') || collectionId === '')
        return res.status(400).json({ success: false, message: 'Valid collection id is required' })

    const session = await getServerSession(req, res, authOptions)
    if (!session)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'GET':

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)


            const collectionData = await db.collection('crystal_collections').findOne({ _id: new ObjectId(collectionId), user_id: new ObjectId(session.user._id) })
            if (!collectionData)
                return res.status(400).json({ success: false, message: 'No collection found' })

            // const crystalData = await db.collection('user_crystals').find({
            //     _id: {
            //         $in: collectionData.user_crystal_ids
            //     }
            // }).toArray()

            // console.log(crystalData)

            const crystalData = await db.collection('user_crystals').aggregate([
                {
                    $match: {
                        _id: {
                            // @ts-ignore
                            $in: collectionData.user_crystal_ids
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'trim_crystals',
                        localField: '_id',
                        foreignField: 'crystal_id',
                        as: 'trim_crystal',
                    }
                },
            ]).toArray()

            console.log(crystalData)

            // const userCrystals = await db.collection('user_crystals').find({
            //     _id: {
            //         // @ts-ignore
            //         $in: collectionData.user_crystal_ids
            //     },
            //     user_id: new Object(session.user._id)
            // }).toArray()
            // const trimCrystals = await db.collection('trim_crystals').find({
            //     _id: {
            //         $in: userCrystals.map(crystal => crystal._id)
            //     }
            // }).toArray()


            res.status(200).json({ success: true, data: {} })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}