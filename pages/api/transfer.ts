import parseExcel from '@/utils/parseExcel'
import parseFile from '@/utils/parseFile'
import writeToXML from '@/utils/writeToXML'

import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		bodyParser: false
	}
}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
	const excel = await parseFile(req)
	const sheet = excel.getWorksheet('Sheet2')
	const pallets = parseExcel(sheet)
	const buffer = writeToXML(pallets)

	res.status(200).json({
		name: `${new Date().toLocaleDateString()}_${new Date().valueOf()}`,
		buffer
	})
}
