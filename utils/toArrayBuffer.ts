export const toArrayBuffer = (buf: Buffer) => {
	var ab = new ArrayBuffer(buf.length)
	var view = new Uint8Array(ab)
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i]
	}
	return ab
}
