import React, { useRef, useState, useEffect } from 'react'
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

const DragSwitch = ({
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
					backgroundColor: checked
						? onColor || '#66bb6a'
						: offColor || '#cccccc'
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
						: undefined,
					backgroundColor: handleColor || '#ffffff'
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
