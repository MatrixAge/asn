import cheerio from 'cheerio'

export interface Carton {
	CARTONID: string
	SERIALS: Array<string>
}

export interface Pallet {
	PALLETID: string
	CARTONS: Array<Carton>
}

export default (xml: string) => {
	const $ = cheerio.load(xml, { xmlMode: true, xml: true })
	const pallets: Array<Pallet> = []

	const CLIENT = $('CLIENT').text()
	const ASN = $('ASN').text()
	const DUEDATE = $('DUEDATE').text()
	const name = `${CLIENT}_${ASN}_${DUEDATE}`

	const PALLETS = $('PALLET')

	PALLETS.each(function () {
		pallets.push({
			PALLETID: $(this).children('PALLETID').text(),
			CARTONS: $(this)
				.find('CARTON')
				.map(function () {
					return {
						CARTONID: $(this).find('CARTONID').text(),
						SERIALS: $(this)
							.find('SERIAL')
							.map(function () {
								return $(this).text()
							})
							.toArray()
					}
				})
				.toArray()
		})
	})

	return {
		name,
		pallets
	}
}
