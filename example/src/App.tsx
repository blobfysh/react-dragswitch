import React, { useState } from 'react'

import { ToggleSwitch, DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'

const App = () => {
	const [checked, setChecked] = useState(false)
	const [dragChecked, setDragChecked] = useState(false)
	const [secondDragChecked, setSecondDragChecked] = useState(false)

	return (
		<div className='container'>
			<h1>react-dragswitch</h1>
			<h3>Toggle switch</h3>
			<label>
				<span className='mr-1'>Click me!</span>
				<ToggleSwitch checked={checked} onChange={(e) => {
					setChecked(e)
				}}/>
			</label>
<pre>{
`import { ToggleSwitch } from 'react-dragswitch'

...
<label>
    <span>Click me!</span>
    <ToggleSwitch checked={checked} onChange={(e) => {
        setChecked(e)
    }}/>
</label>
...`}
</pre>
			<h3>Disabled toggle switch</h3>
			<ToggleSwitch disabled={true} checked={false} onChange={(e) => {
				setChecked(e)
			}}/>
<pre>{
`import { ToggleSwitch } from 'react-dragswitch'

...
<ToggleSwitch disabled={true} checked={false} onChange={(e) => {
    setChecked(e)
}}/>
...`}
</pre>
			<h3>Draggable switch</h3>
			<DragSwitch disabled={false} checked={dragChecked} onChange={(e) => {
				setDragChecked(e)
			}}/>
<pre>{
`import { DragSwitch } from 'react-dragswitch'

...
<DragSwitch checked={dragChecked} onChange={(e) => {
    setDragChecked(e)
}}/>
...`}
</pre>
			<h3>Draggable switch with label</h3>
			<label>
				<span className='mr-1'>Click me!</span>
				<DragSwitch checked={secondDragChecked} onChange={(e) => {
					setSecondDragChecked(e)
				}}/>
			</label>
			<pre>{
`import { DragSwitch } from 'react-dragswitch'

...
<label>
    <span>Click me!</span>
    <DragSwitch checked={dragChecked} onChange={(e) => {
        setDragChecked(e)
    }}/>
</label>
...`}
</pre>
		</div>
	)
}

export default App
