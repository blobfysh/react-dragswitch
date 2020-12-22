import React, { useState, useEffect } from 'react'
import styles from './ToggleSwitch.module.css'

interface Props {
	className?: string
	checked: boolean
	onChange: (checked: boolean) => void
	onColor?: string
	offColor?: string
	handleColor?: string
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
	handleColor,
	focusShadow,
	disabled,
	...labelProps
}: Props) => {
	const [hasOutline, setOutline] = useState(false)
	const [lastMouseUpTime, setMouseUpTime] = useState(0)

	const handleChange = () => {
		onChange(!checked)
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
					backgroundColor: checked
						? onColor || '#66bb6a'
						: offColor || '#cccccc'
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
						: undefined,
					backgroundColor: handleColor || '#ffffff'
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
