import parseFile from '@/utils/parseFile'
import parseXML from '@/utils/parseXML'
import writeToExcel from '@/utils/writeToExcel'

import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		bodyParser: false
	}
}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
	const xml = await parseFile(req)
	const { name, pallets } = parseXML(xml)
	const buffer = await writeToExcel(pallets)

	res.status(200).json({ name, buffer: buffer })
}
