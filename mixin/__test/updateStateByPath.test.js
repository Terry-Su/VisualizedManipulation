function updateStateByPath( path, value ) {
    // let rawState = { ...this.state }
    let rawState = { setting: { map: 123 } }
    let setter = rawState

    function handleField( value ) {
        return ( field, index ) => {
            const isLastField = index === path.length - 1
            
            if ( !isLastField ) {
                setter = setter[ field ]
            }

            if ( isLastField ) {
                setter[ field ] = value
            }
        }
    }

    path.map( handleField( value ) )

    return rawState
    this.setState( setter )
}

// console.log(
//     updateStateByPath(
//         [ 'setting', 'map' ],
//         456
//     )
// )   
// { setting: { map: 456 } }