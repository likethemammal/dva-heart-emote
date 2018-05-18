import React, { Component } from 'react'

const ORDER_DESCENDING = 'ORDER_DESCENDING'
const ORDER_ASCENDING = 'ORDER_ASCENDING'

const DEFAULT_HOVER_REPEATS = 1

import {
    animation_keys,
    default_box_middle_positions,
    default_box_side_positions,
    
    START_DELAY,
    END_DELAY,
    DELAY_INTERVAL,

    POSITION_Z_DEFAULT,

    FLY_DOWN_Y_OFFSET,
    FLY_UP_Y_OFFSET,
    INNER_BOX_DEFAULT_COLOR,
} from './Heart.assets'

import Box from './Box'

const animationPropDefaults = {
    [animation_keys.DEFAULT]: {
        attribute: 'scale',
        easing: 'ease-in-out',
        dur: 550,
        to: '1 1 1',
    },
    [animation_keys.FLY_UP]: {
        attribute: 'position',
        easing: 'ease-in-out',
        dur: 2000,
    },
    [animation_keys.FLY_UP_REVERSE]: {
        attribute: 'position',
        easing: 'ease-in-out',
        dur: 2000,
    },
    [animation_keys.FLY_DOWN]: {
        attribute: 'position',
        easing: 'ease-in-out',
        dur: 1000,
    },
    [animation_keys.FLY_DOWN_REVERSE]: {
        attribute: 'position',
        easing: 'ease-in-out',
        dur: 1000,
    },
}

const isHoverNeeded = (key) => {
    return key === animation_keys.DEFAULT ||
            key === animation_keys.FLY_UP_REVERSE ||
            key === animation_keys.FLY_DOWN_REVERSE
}

function getDelayForBoxOfIndex(i) {
    return START_DELAY + (DELAY_INTERVAL * (i + 1))
}

export default class Heart extends Component {

    state = {
        box_inner_color: 'white',
        box_order: ORDER_DESCENDING,
        animation_complete_with_delay: false,
    }

    timer: false

    startBlinkTimer = () => {
        clearTimeout(this.timer)

        this.setState({box_inner_color: INNER_BOX_DEFAULT_COLOR})

        this.timer = setTimeout(() => {

            this.setState({box_inner_color: 'white'})
            this.timer = setTimeout(() => {

                this.setState({box_inner_color: INNER_BOX_DEFAULT_COLOR})
                this.timer = setTimeout(() => {

                    this.setState({box_inner_color: 'white'})
                }, 85)
            }, 90)

        }, 135)
    }

    onAnimationComplete = () => {

        const { animation_key } = this.props

        if (animation_key === animation_keys.DEFAULT) {
            this.startBlinkTimer()
        }

        setTimeout(() => {
            this.setState({
                animation_complete_with_delay: true,
            })
        }, 1700)

        console.log('animation finished apparently')
    }

    getBoxWithAnimations = (key, delay, originalPositions) => {

        const { box_inner_color } = this.state
        const { animation_key } = this.props

        const defaultAnimationProps = animationPropDefaults[animation_key]

        let additionalAnimationProps = {}
        const originalX = originalPositions[0]
        const originalY = originalPositions[1]

        const flyUpVector = `${originalX} ${originalY + FLY_UP_Y_OFFSET} ${POSITION_Z_DEFAULT}`
        const flyDownVector = `${originalX} ${originalY + FLY_DOWN_Y_OFFSET} ${POSITION_Z_DEFAULT}`
        const originalVector = `${originalX} ${originalY} ${POSITION_Z_DEFAULT}`

        let additionalProps = {
            position: originalVector
        }

        switch (animation_key) {
            case animation_keys.FLY_UP:
                additionalAnimationProps = {
                    to: flyUpVector,
                }
                break;
            case animation_keys.FLY_UP_REVERSE:
                additionalAnimationProps = {
                    to: originalVector,
                }
                additionalProps = {
                    position: flyUpVector
                }
                break;
            case animation_keys.FLY_DOWN:
                additionalAnimationProps = {
                    to: flyDownVector,
                }
                break;
            case animation_keys.FLY_DOWN_REVERSE:
                additionalAnimationProps = {
                    to: originalVector,
                }

                additionalProps = {
                    position: flyDownVector
                }
                break;
            case animation_keys.DEFAULT:
                additionalProps = {
                    scale: '0 0 0',
                    position: originalVector
                }
                break;
            default:
        }

        if (key === 'end_box') {
            additionalProps.ref = (el) => { this.end_box = el; }
        }

        return <Box
            {...additionalProps}
            {...{
                key,
                box_inner_color,
            }}
        >
            <a-animation
                key={animation_key}
                {...defaultAnimationProps}
                delay={delay}
                fill="forwards"
                {...additionalAnimationProps}
            />

        </Box>
    }

    onHoverAnimationComplete = () => {
        this.hoverAnimationEl.el.removeEventListener('animationend', this.onHoverAnimationComplete)

        this.props.onAnimationComplete()
    }

    componentDidUpdate(prevProps, prevState) {

        const { animation_key } = this.props
        const { animation_complete_with_delay } = this.state

        const animationNowExists = !prevProps.animation_key && !!animation_key
        const animationJustCompleted = animation_complete_with_delay && !prevState.animation_complete_with_delay
        const animationSwitched = animationNowExists || animation_key !== prevProps.animation_key

        let newState = {}

        if (animationJustCompleted && isHoverNeeded(animation_key)) {
            this.hoverAnimationEl.el.addEventListener('animationend', this.onHoverAnimationComplete)
        }

        if (animationSwitched) {
            console.log('animation switched')
            switch (animation_key) {
                case animation_keys.DEFAULT:
                    newState.box_inner_color = INNER_BOX_DEFAULT_COLOR
                    break;
            }

            newState.animation_complete_with_delay = false


            this.setState(newState)
        }

    }

    componentDidMount() {

        if (this.props.animation_key === animation_keys.DEFAULT) {
            this.setState({box_inner_color: INNER_BOX_DEFAULT_COLOR})
        }

        this.end_box.el.addEventListener('animationend', this.onAnimationComplete)

    }

    componentWillUnmount() {
        this.end_box.el.removeEventListenr('animationend', this.onAnimationComplete)
    }

    render() {

        const { box_order, animation_complete_with_delay } = this.state
        const { animation_key, onAnimationComplete } = this.props

        const box_middle_positions = box_order === ORDER_DESCENDING ?
            default_box_middle_positions :
            default_box_middle_positions.reverse()

        const box_side_positions = box_order === ORDER_DESCENDING ?
            default_box_side_positions :
            default_box_side_positions.reverse()

        const start_positions = box_middle_positions[0]
        const end_positions = box_middle_positions[1]

        const start_box = this.getBoxWithAnimations("start_box", START_DELAY, start_positions)

        const left_heart_boxes = box_side_positions.map((xy, i) => {
            return this.getBoxWithAnimations('left_box_' + i, getDelayForBoxOfIndex(i), [-xy[0], xy[1]])
        })
        const right_heart_boxes = box_side_positions.map((xy, i) => {
            return this.getBoxWithAnimations('right_box_' + i, getDelayForBoxOfIndex(i), [xy[0], xy[1]])
        })

        const end_box = this.getBoxWithAnimations('end_box', END_DELAY, end_positions)

        const boxes = [
            start_box,
            ...left_heart_boxes,
            ...right_heart_boxes,
            end_box,
        ]

        return <a-entity>
            <a-animation
                attribute="position"
                delay="500"
                dur="2500"
                from="0 5 0"
                to="0 0 0"
                easing="ease-out-cubic"
            />
            {animation_complete_with_delay && isHoverNeeded(animation_key) && <a-animation
                attribute="position"
                direction="alternate"
                repeat={onAnimationComplete ? DEFAULT_HOVER_REPEATS : 'indefinite'}
                easing="ease-in-out-quad"
                delay="250"
                dur="2450"
                to="0 0.75 0"
                ref={el => this.hoverAnimationEl = el}
            />}
            {boxes}
        </a-entity>
    }
}
