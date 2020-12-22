export const hexToRGB = (hex: string) => {
	const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

	if (!rgb) throw new Error(`${hex} is not a valid hex value`)

	return {
		r: parseInt(rgb[1], 16),
		g: parseInt(rgb[2], 16),
		b: parseInt(rgb[3], 16)
	}
}

export const RGBtoHex = (r: number, g: number, b: number) => {
	const rHex = r.toString(16)
	const gHex = g.toString(16)
	const bHex = b.toString(16)

	return `#${rHex.length === 1 ? '0' + rHex : rHex}${
		gHex.length === 1 ? '0' + gHex : gHex
	}${bHex.length === 1 ? '0' + bHex : bHex}`
}
