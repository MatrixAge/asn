import chunkBySameValue from './chunkBySameValue'

import type Excel from 'exceljs'

import type { Pallet, Carton } from './parseXML'

interface IDataRaw {
	PALLETID: string
	CARTONID: string
	SERIAL: string
}

export default (sheet: Excel.Worksheet) => {
	const data_raw: Array<IDataRaw> = []

	sheet.eachRow((row) => {
		const PALLETID = row.getCell(1).value?.toString() || ''
		const CARTONID = row.getCell(2).value?.toString() || ''
		const SERIAL = row.getCell(3).value?.toString() || ''

		if (SERIAL) {
			data_raw.push({
				PALLETID,
				CARTONID,
				SERIAL
			})
		}
	})

	const data_chunked = chunkBySameValue(data_raw, 'PALLETID')

	const target = data_chunked.reduce((pallets: Array<Pallet>, pallet) => {
		const cartons_chunked = chunkBySameValue(pallet, 'CARTONID')

		pallets.push({
			PALLETID: pallet[0].PALLETID,
			CARTONS: cartons_chunked.reduce((cartons: Array<Carton>, carton) => {
				cartons.push({
					CARTONID: carton[0].CARTONID,
					SERIALS: carton.reduce((serials: Array<string>, serial) => {
						serials.push(serial.SERIAL)

						return serials
					}, [])
				})

				return cartons
			}, [])
		})

		return pallets
	}, [])

	return target
}
