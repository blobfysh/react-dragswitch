import React, { useRef, useState, useEffect } from 'react'
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

const DragSwitch = ({
	className,
	checked,
	onChange,
	onColor,
	offColor,
	focusShadow,
	disabled,
	...labelProps
}: Props) => {
	const switchRef = useRef<HTMLLabelElement>(null)
	const [Xpos, setPos] = useState(checked ? 20 : 0)
	const [isMouseDown, setMouseDown] = useState(false)
	const [lastMouseUpTime, setMouseUpTime] = useState(0)
	const [hasOutline, setOutline] = useState(false)
	const [dragging, setDragging] = useState(false)
	const [dragEnd, setDragEnd] = useState(0)

	const handleChange = () => {
		// prevent setting checked if user was just dragging
		if (Date.now() - dragEnd > 25) {
			handleChecked(!checked)
		}
	}

	const handleChecked = (newChecked: boolean) => {
		if (newChecked) {
			setPos(20)
		} else {
			setPos(0)
		}

		if (newChecked !== checked) onChange(newChecked)
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

	const startDrag = (e: React.MouseEvent) => {
		e.preventDefault()

		setMouseDown(true)
		setOutline(true)
	}

	const onMouseUp = (e: MouseEvent) => {
		setMouseDown(false)
		setOutline(false)
		setMouseUpTime(Date.now())

		if (switchRef.current && dragging) {
			const mouseRelativePos =
				e.clientX - switchRef.current.getBoundingClientRect().left

			setDragEnd(Date.now())
			setDragging(false)

			if (mouseRelativePos >= 20) {
				handleChecked(true)
			} else {
				handleChecked(false)
			}
		}
	}

	const onMouseMove = (e: MouseEvent) => {
		if (isMouseDown && !dragging) {
			setDragging(true)
		}

		if (switchRef.current && dragging) {
			const halfHandle = 8
			const newPos =
				e.clientX - switchRef.current.getBoundingClientRect().left - halfHandle

			if (newPos < 0) {
				setPos(0)
			} else if (newPos > 20) {
				setPos(20)
			} else {
				setPos(newPos)
			}
		}
	}

	useEffect(() => {
		// onMouseMove function relies on dragging and isMouseDown state
		window.addEventListener('mousemove', onMouseMove)

		return () => {
			window.removeEventListener('mousemove', onMouseMove)
		}
	}, [dragging, isMouseDown])

	useEffect(() => {
		// onMouseUp function relies on dragging state when setting value
		window.addEventListener('mouseup', onMouseUp)

		return () => {
			window.removeEventListener('mouseup', onMouseUp)
		}
	}, [dragging])

	return (
		<label
			style={{
				cursor: disabled ? 'not-allowed' : 'pointer',
				filter: disabled ? 'brightness(0.9)' : 'unset'
			}}
			{...labelProps}
			className={`${styles.switch} ${className || ''}`}
			ref={switchRef}
			onMouseDown={disabled ? undefined : startDrag}
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
					transform: `translateX(${Xpos}px)`,
					WebkitTransition: dragging ? undefined : 'transform .2s',
					MozTransition: dragging ? undefined : 'transform .2s',
					transition: dragging ? undefined : 'transform .2s',
					boxShadow: hasOutline
						? focusShadow || 'rgba(0,0,0,0.5) 0px 0px 2px 3px'
						: undefined
				}}
				onClick={e => {
					e.preventDefault()

					setOutline(false)
					if (!disabled) handleChange()
				}}
			/>
			<input
				role='switch'
				aria-checked={checked}
				type='checkbox'
				defaultChecked={checked}
				onChange={handleChange}
				onFocus={() => {
					// prevent focus after user clicked/dragged switch
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

export default DragSwitch
