import Excel from 'exceljs'
import { chunk } from 'lodash-es'

import getSheet from './getSheet'

import type { Pallet } from './parseXML'

export default async (pallets: Array<Pallet>) => {
	const excel = new Excel.Workbook()
	const base_width = 16
	const base_height = 16

	excel.creator = 'wendao'
	excel.created = new Date()

	const chunked_data = chunk(pallets, 3)

	chunked_data.map((item, index) => {
		const sheet = excel.addWorksheet(`sheet ${index + 1}`)

		sheet.properties.defaultColWidth = base_width
		sheet.properties.defaultRowHeight = base_height

		getSheet(sheet, item, { base_width })
	})

	return await excel.xlsx.writeBuffer()
}
