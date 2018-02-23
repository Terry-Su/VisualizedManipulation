export default {
    namespace: 'itemList',
    state: [
        {
            name: 'Array',
            list: [
                'chunk',
                'compact',
                'concat',
                'difference',
                'differenceBy',
                'differenceWith',
                'drop',
                'dropRight',
                'dropRightWhile',
                'dropWhile',
            ],
            isExpand: true,
        },
        {
            name: 'Object',
            list: [
                'assign',
                'create',
            ],
            isExpand: true,
        },
    ],
    reducers: {
        update( state, action ) {
            return state
        },
        toogleTitle( state, { titleIndex } ) {
            const rawState = [ ...state ]
            const { isExpand } = rawState[ titleIndex ]
            rawState[ titleIndex ][ 'isExpand' ] =  !isExpand

            return [
                ...rawState
            ]
        },
    },
    effects: {

    },
}