export default (x: number) => {
	let s = ''

	while (x > 0) {
		let m = x % 26
		m = m === 0 ? (m = 26) : m
		s = String.fromCharCode(96 + parseInt(String(m))) + s
		x = (x - m) / 26
	}

	return s.toUpperCase()
}
