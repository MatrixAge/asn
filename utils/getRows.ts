import type { Pallet, Carton } from './parseXML'

export const getPalletRows = (pallet: Pallet) => {
	let rows = 0

	pallet.CARTONS.map((item) => {
		item.SERIALS.map(() => rows++)
	})

	return rows
}

export const getCartonRows = (carton: Carton) => {
	let rows = 0

	carton.SERIALS.map(() => rows++)

	return rows
}
