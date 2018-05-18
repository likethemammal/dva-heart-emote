import React, { Component } from 'react'

import HeartContainer from './HeartContainer'


export default class Scene extends Component {
    static defaultProps = {
        className: '',
    }

    render() {

        const { className } = this.props

        return <a-scene
                shadow vr-mode-ui="enabled: false"
            >
            <a-assets>
                <img id="my-texture" src="https://i.imgur.com/nSZhWFK.png"/>
                <img id="texture-glow" src="https://stemkoski.github.io/Three.js/images/glow.png"/>

            </a-assets>


            <a-entity light="intensity:1.11;type:ambient;color:#BBB" position="-5.009 9.652 8.397"></a-entity>
            <a-entity light="angle:62.66;intensity:0.3;castShadow:true;shadowCameraFar:484.59;shadowCameraNear:0.33;shadowCameraTop:15;shadowCameraRight:5.33;shadowCameraLeft:-7;shadowCameraBottom:-3;shadowMapHeight:511.83" position="-3.52 11.472 9.046"></a-entity>

            <a-entity camera="userHeight: 1" position="0 3 11"></a-entity>

            <HeartContainer />


            <a-plane position="0 0 -5" width="100" height="100" color="#fff" material="opacity:0.35" shadow=""></a-plane>

        </a-scene>
    }
}