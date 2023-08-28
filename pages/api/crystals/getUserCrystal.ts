import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function getUserCrystal(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req
    let { userCrystalId } = req.query

    if (Array.isArray(userCrystalId))
        userCrystalId = userCrystalId.join()

    if (!(typeof userCrystalId === 'string') || userCrystalId === '')
        return res.status(400).json({ success: false, message: 'Please enter a valid crystal id' })

    const session = await getServerSession(req, res, authOptions)
    if (!session)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'GET':

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            console.log(userCrystalId)
            const crystalData = await db.collection('user_crystals').aggregate([
                {
                    $match: {
                        _id: new ObjectId(userCrystalId)
                    }
                },
                {
                    $lookup: {
                        from: 'trim_crystals',
                        localField: 'crystal_id',
                        foreignField: '_id',
                        as: 'trim_crystal',
                    }
                },
            ]).toArray()

            res.status(200).json({ success: true, data: crystalData })
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}