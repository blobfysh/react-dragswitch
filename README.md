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

```tsx
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

## License

MIT © [blobfysh](https://github.com/blobfysh)
