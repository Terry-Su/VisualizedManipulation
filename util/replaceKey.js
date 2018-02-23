export default function ( object, oldKey, newKey ) {
    let rawObject = { ...object }
    return Object.assign(
        {},
        ...(
            Object.keys( rawObject )
            .map(
                key => 
                ( { [ updateKey( { key, oldKey, newKey } ) ]: rawObject[ key ] } )
            )
        )
      )
}

function updateKey( { key, oldKey, newKey } ) { return key.replace( new RegExp( `^${ oldKey }$` ), newKey) }
