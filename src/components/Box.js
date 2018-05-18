import React, { Component } from 'react'

export default class Box extends Component {
    render() {

        const { box_inner_color, children } = this.props

        const opacity = box_inner_color === 'white' ? 0.85 : 0.9

        return <a-box
            ref={el => this.el = el}
            shadow
            material={`src: #my-texture; transparent: true; opacity: ${opacity};`}
            {...this.props}
        >
            <a-box material={`color: ${box_inner_color};`} />
            {children}
        </a-box>
    }
}