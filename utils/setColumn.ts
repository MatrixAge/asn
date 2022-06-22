import type Excel from 'exceljs'

export default (sheet: Excel.Worksheet, index: number, base_width: number) => {
	sheet.getColumn(index).width = base_width
	sheet.getColumn(index).alignment = {
		horizontal: 'center',
		vertical: 'middle'
	}
}
