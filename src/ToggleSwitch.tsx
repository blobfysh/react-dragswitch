import React, { useState, useEffect } from 'react'
import { hexToRGB, RGBtoHex } from './utils'
import styles from './ToggleSwitch.module.css'

interface Props {
	className?: string
	checked: boolean
	onChange: (checked: boolean) => void
	onColor?: string
	offColor?: string
	focusShadow?: string
	disabled?: boolean
	[props: string]: any
}

const ToggleSwitch = ({
	className,
	checked,
	onChange,
	onColor,
	offColor,
	focusShadow,
	disabled,
	...labelProps
}: Props) => {
	const [hasOutline, setOutline] = useState(false)
	const [lastMouseUpTime, setMouseUpTime] = useState(0)

	const handleChange = () => {
		onChange(!checked)
	}

	const desaturateColor = (hex: string) => {
		const rgb = hexToRGB(hex)
		const gray = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114
		const saturation = 0.4

		rgb.r = Math.round(rgb.r * saturation + gray * (1 - saturation))
		rgb.g = Math.round(rgb.g * saturation + gray * (1 - saturation))
		rgb.b = Math.round(rgb.b * saturation + gray * (1 - saturation))

		return RGBtoHex(rgb.r, rgb.g, rgb.b)
	}

	const getBackgroundColor = () => {
		if (disabled) {
			return checked
				? desaturateColor(onColor || '#66bb6a')
				: desaturateColor(offColor || '#cccccc')
		}

		return checked ? onColor || '#66bb6a' : offColor || '#cccccc'
	}

	const onMouseUp = () => {
		setMouseUpTime(Date.now())
	}

	useEffect(() => {
		window.addEventListener('mouseup', onMouseUp)

		return () => {
			window.removeEventListener('mouseup', onMouseUp)
		}
	}, [])

	return (
		<label
			style={{
				cursor: disabled ? 'not-allowed' : 'pointer',
				filter: disabled ? 'brightness(0.9)' : 'unset'
			}}
			{...labelProps}
			className={`${styles.switch} ${className || ''}`}
		>
			<div
				className={`${styles.switchBg} ${checked ? styles.isChecked : ''}`}
				style={{
					backgroundColor: getBackgroundColor()
				}}
			/>
			<div
				id='dragswitch-handle'
				className={`${styles.switchHandle} ${checked ? styles.isChecked : ''}`}
				style={{
					WebkitTransition: 'transform .2s',
					MozTransition: 'transform .2s',
					transition: 'transform .2s',
					boxShadow: hasOutline
						? focusShadow || 'rgba(0,0,0,0.5) 0px 0px 2px 3px'
						: undefined
				}}
			/>
			<input
				role='switch'
				aria-checked={checked}
				type='checkbox'
				defaultChecked={checked}
				onChange={handleChange}
				onFocus={() => {
					// prevent focus after user clicked switch, allows keyboard to focus switch
					if (Date.now() - lastMouseUpTime > 25) setOutline(true)
				}}
				onBlur={() => {
					setOutline(false)
				}}
				disabled={disabled}
				className={styles.switchInput}
			/>
		</label>
	)
}

export default ToggleSwitch