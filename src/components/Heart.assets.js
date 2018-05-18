export const animation_keys = {
    DEFAULT: 'animation__scale',
    FLY_UP: 'animation__fly_up',
    FLY_UP_REVERSE: 'animation__fly_up_reverse',
    FLY_DOWN: 'animation__fly_down',
    FLY_DOWN_REVERSE: 'animation__fly_down_reverse',
}

export const default_box_middle_positions = [
    [0, 8],
    [0, 0],
]

export const default_box_side_positions = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [4, 9],
    [3, 10],
    [2, 10],
    [1, 9],
].reverse()

export const INNER_BOX_DEFAULT_COLOR = '#666'

export const NUM_OF_BOXES_ON_ONE_SIDE = default_box_side_positions.length + default_box_middle_positions.length
export const START_DELAY = 1000
export const DELAY_INTERVAL = 70
export const END_DELAY = START_DELAY + (DELAY_INTERVAL * (NUM_OF_BOXES_ON_ONE_SIDE - 1))

export const POSITION_Z_DEFAULT = '0'

export const FLY_UP_Y_OFFSET = 150
export const FLY_DOWN_Y_OFFSET = -150