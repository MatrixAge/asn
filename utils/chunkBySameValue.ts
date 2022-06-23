function Index<T>(array: Array<T>, key: string) {
	const groupBy = (array: Array<T>, f: Function) => {
		const groups: {
			[key: string]: Array<T>
		} = {}

		array.forEach((item) => {
			const group = JSON.stringify(f(item))

			groups[group] = groups[group] || []
			groups[group].push(item)
		})

		return Object.keys(groups).map((group) => {
			return groups[group]
		})
	}

	const sorted = groupBy(array, (item: any) => {
		return item[key]
	})

	return sorted
}

export default Index
