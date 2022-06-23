import xml from 'xml'

import type { Pallet } from './parseXML'

export default (pallets: Array<Pallet>): Buffer => {
	const PALLETS = pallets.reduce((total: Array<any>, pallet) => {
		total.push({
			PALLET: [
				{
					PALLETID: pallet.PALLETID
				},
				{
					PONBR: '801155205'
				},
				{
					POPOS: 10
				},
				{
					PQTY: 540
				},
				{
					CARTONS: pallet.CARTONS.reduce((total: Array<any>, carton) => {
						total.push({
							CARTON: [
								{
									CARTONID: carton.CARTONID
								},
								{
									PART: 'GNS-14207-58'
								},
								{
									CQTY: 12
								},
								{
									DATECODE: 'W27M'
								},
								{
									LASTCHARGEDATE: '30/6/2020'
								},
								{
									SERIALS: carton.SERIALS.reduce(
										(total: Array<any>, serial) => {
											total.push({
												SERIAL: serial
											})

											return total
										},
										[]
									)
								}
							]
						})

						return total
					}, [])
				}
			]
		})

		return total
	}, [])

	const target = xml(
		[
			{
				HEADER: [
					{
						CLIENT: 'FUTIAN_VMI'
					},
					{
						ASN: 'CE140420221658'
					},
					{
						DUEDATE: '14-4-2021'
					},
					{
						MAWB: 'PL20220421'
					},
					{
						LINES: [
							{
								LINE: [
									{
										STOCKFILE: 'CE'
									},
									{
										PART: 'GNS-14207-58'
									},
									{
										PALLETS
									},
									{
										COO: 'CN'
									},
									{
										TOTLNQTY: '2064'
									}
								]
							}
						]
					}
				]
			}
		],
		{ declaration: true, indent: '    ' }
	)

	// @ts-ignore
	return new Buffer.from(target)
}
