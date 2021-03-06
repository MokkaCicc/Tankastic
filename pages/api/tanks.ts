import { Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Tank[]>
) {
	if (req.method !== 'GET') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const prisma = PrismaInstance.get()
	const tanks = await prisma.tank.findMany()
	res.status(200).json(tanks)
	await prisma.$disconnect()
}