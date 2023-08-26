import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb/client"
import { ObjectId } from "mongodb"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

import { ICrystal } from "@/types/Crystal"
import { ICheckbox } from "@/types/CrystalCollection"

export default async function createCollection(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const session = await getServerSession(req, res, authOptions)
    if (!session?.user._id)
        return res.status(401).json({ message: 'Valid session not found' })

    switch (method) {
        case 'POST':

            const data = JSON.parse(req.body)
            const {
                crystalData,
                checkboxes
            }: {
                crystalData: ICrystal,
                checkboxes: ICheckbox[] | []
            } = data

            if (!crystalData || !checkboxes)
                return res.status(400).json({ success: false, message: "Invalid data! POST must include a valid Crystal object and Checkboxes array" })

            const crystalDataId = new ObjectId(crystalData._id)

            const client = await clientPromise
            const db = client.db(process.env.MONGODB_DB)

            // Upsert crystal as a User Crystal
            const userCrystal = await db.collection('user_crystals').findOneAndUpdate(
                {
                    user_id: new ObjectId(session.user._id),
                    crystal_id: crystalDataId,
                },
                {
                    $set: {
                        user_id: new ObjectId(session.user._id),
                        crystal_id: crystalDataId,
                    }
                },
                {
                    upsert: true,
                    returnDocument: 'after'
                }
            )


            // If "Add To" collection ids exist, add user crystal id to associated crystal collections
            const addTo: ObjectId[] = []
            checkboxes.forEach((v) => {
                if (v.isChecked)
                    addTo.push(new ObjectId(v.collectionId))
            })

            if (addTo.length > 0) {
                await db.collection('crystal_collections').updateMany(
                    {
                        user_id: new ObjectId(session.user._id),
                        _id: {
                            $in: addTo
                        }
                    },
                    {
                        // @ts-ignore
                        $addToSet: { user_crystal_ids: crystalDataId }
                    }
                )
            }

            // If "Remove From" collection ids exist, remove user crystal id from associated crystal collections
            const removeFrom: ObjectId[] = []
            checkboxes.forEach((v) => {
                if (!v.isChecked)
                    removeFrom.push(new ObjectId(v.collectionId))
            })

            if (removeFrom.length > 0) {
                await db.collection('crystal_collections').updateMany(
                    {
                        user_id: new ObjectId(session.user._id),
                        _id: {
                            $in: removeFrom
                        }
                    },
                    {
                        // @ts-ignore
                        $pull: { user_crystal_ids: crystalDataId }
                    }
                )
            }

            res.status(200).json({ success: true, data: {} })

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }

}