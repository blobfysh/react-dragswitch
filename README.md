# react-dragswitch

> A simple draggable toggle switch

[![NPM](https://img.shields.io/npm/v/react-dragswitch.svg)](https://www.npmjs.com/package/react-dragswitch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-dragswitch

or

yarn add react-dragswitch
```

## Usage

```jsx
import React, { Component } from 'react'

import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'

class Example extends React.Component {
  render() {
    return (
      <DragSwitch
        checked={this.state.checked}
        onChange={c => {
          this.setState({ checked: c })
        }}
      />
    )
  }
}
```

Functional Component
```jsx
import React, { useState } from 'react'

import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'

const Example = () => {
	const [checked, setChecked] = useState(false)

	return (
		<DragSwitch checked={checked} onChange={(e) => {
			setChecked(e)
		}/>
	)
}

```

## Props

`<DragSwitch />`, `<ToggleSwitch />`

| Prop                      | Type                    | Default                           | Required | Description                                                         |
| ------------------------- | ----------------------- | --------------------------------- | -------- | ------------------------------------------------------------------- |
| checked                   | boolean                 |                                   | true     | Whether switch should be checked                                    |
| onChange                  | function                |                                   | true     | Callback for when the switch is checked, use this to set your state |
| className                 | string                  | null                              | false    | Optional class for applying your own styles to the switch           |
| onColor                   | string                  | '#66bb6a'                         | false    | Background color when switch is checked                             |
| offColor                  | string                  | '#cccccc'                         | false    | Background color when switch is not checked                         |
| handleColor               | string                  | '#ffffff'                         | false    | Color of the handle                                                 |
| focusShadow               | string                  | 'rgba(0,0,0,0.5) 0px 0px 2px 3px' | false    | Box shadow of handle when switch is focused                         |
| disabled                  | boolean                 | false                             | false    | Whether the switch is disabled                                      |

## License

MIT © [blobfysh](https://github.com/blobfysh)
