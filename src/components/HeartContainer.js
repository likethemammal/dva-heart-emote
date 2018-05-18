import React, { Component } from 'react'

import Heart from './Heart'

import {
    animation_keys
} from './Heart.assets'


export default class HeartContainer extends Component {
    state = {
        animation_key: animation_keys.DEFAULT
    }

    render() {


        return <Heart
            animation_key={this.state.animation_key}
            onAnimationComplete={() => {
                this.setState({
                    animation_key: animation_keys.FLY_UP
                })
            }}
        />
    }
}