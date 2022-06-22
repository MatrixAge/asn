import formidable from 'formidable'
import fs from 'fs'

import type { NextApiRequest } from 'next'
import type { File } from 'formidable'

export default (req: NextApiRequest): Promise<string> =>
	new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm({
			keepExtensions: true,
			multiples: false
		})

		form.parse(req, (err, fields, files) => {
			const file = files.file as File

			const xml = fs.readFileSync(file.filepath).toString()

			resolve(xml)
		})
	})
