import Excel from 'exceljs'
import formidable from 'formidable'

import type { NextApiRequest } from 'next'
import type { File } from 'formidable'
import type TheExcel from 'exceljs'

export default (req: NextApiRequest): Promise<TheExcel.Workbook> =>
	new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm({
			keepExtensions: true,
			multiples: false
		})

		form.parse(req, async (err, fields, files) => {
			const file = files.file as File
			const excel = new Excel.Workbook()

			await excel.xlsx.readFile(file.filepath)

			resolve(excel)
		})
	})
