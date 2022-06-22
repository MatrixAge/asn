import getColumnLetter from '@/utils/getColumnLetter'
import { getCartonRows, getPalletRows } from '@/utils/getRows'
import setColumn from '@/utils/setColumn'

import type { Pallet } from './parseXML'
import type Excel from 'exceljs'

export default (
	sheet: Excel.Worksheet,
	raw: Array<Pallet>,
	{ base_width }: { base_width: number }
) => {
	raw.map((pallet, pallet_index) => {
		const pallet_col_index = pallet_index * 3 + 1
		const pallet_col = getColumnLetter(pallet_col_index)

		sheet.mergeCells(`${pallet_col}1:${pallet_col}${getPalletRows(pallet)}`)
		sheet.getColumn(pallet_col_index).values = [pallet.PALLETID]

		setColumn(sheet, pallet_col_index, base_width)

		const carton_col_index = pallet_index * 3 + 2
		const carton_col = getColumnLetter(carton_col_index)

		const serial_col_index = pallet_index * 3 + 3

		pallet.CARTONS.reduce((total: number, carton) => {
			const start_row = total + 1

			const values: Array<string> = []

			values[start_row] = carton.CARTONID

			sheet.getColumn(carton_col_index).values = values

			setColumn(sheet, carton_col_index, base_width)

			sheet.mergeCells(
				`${carton_col}${start_row}:${carton_col}${
					start_row + getCartonRows(carton) - 1
				}`
			)

			carton.SERIALS.map((serial, index) => {
				const values: Array<string> = []

				values[total + index] = serial

				sheet.getColumn(serial_col_index).values = values

				setColumn(sheet, serial_col_index, base_width)
			})

			total += getCartonRows(carton)

			return total
		}, 0)
	})
}
