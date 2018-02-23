import _ from 'lodash'
import replaceKey from 'util/replaceKey'


/**
 * 
 * @param { Number } mode__all__Fields 
 * The mode of all. 
 * 0: __all: { __fields: [] } / __all: { __fields: { __defaultAll: [] } }
 * 1: __all: { __fields: { field } }
 */
export default function ( { state, type, value, field, mode__all__fields = 0, updateFn } ) {
    if ( _.isPlainObject( state ) && _.isPlainObject( state[ 'value' ] ) ) {
        handleObjectSelectChange( { state, type, value, field, mode__all__fields, updateFn } )
    } else {
        handleOtherSelectChange( { state, value, updateFn } )
    }
}

function handleObjectSelectChange( { state, type, value, field, mode__all__fields, updateFn } ) {
    let rawObject = { ...state }                                        
    
    if ( type === 'field' ) {
        const newField = value
        const oldField = field

        // replace key in value
        rawObject[ 'value' ] = replaceKey( rawObject[ 'value' ], oldField, newField )

        // replace key in __all
        if ( rawObject[ '__all' ] && rawObject[ '__all' ][ newField ] === undefined ) {
            rawObject[ '__all' ] = replaceKey( rawObject[ '__all' ], oldField, newField )
        }
        
        // replace field in __fields of __all when mode__all__fields is 1
        if ( mode__all__fields === 1 ) {
            if (
                rawObject[ '__all' ] 
                && rawObject[ '__all' ][ '__fields' ]
                && rawObject[ '__all' ][ '__fields' ][ newField ] === undefined
            ) {
                rawObject[ '__all' ][ '__fields' ] = replaceKey( rawObject[ '__all' ][ '__fields' ], oldField, newField )
            }
        }
    }
    if ( type === 'harvest' ) {
        rawObject[ 'value' ][ field ] = value
    }

    updateFn( rawObject )
}

function handleOtherSelectChange( { state, value, updateFn } ) {
    updateFn(
        {
            ...state,
            value,
        }
    )
}


