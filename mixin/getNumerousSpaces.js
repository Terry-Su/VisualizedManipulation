import React from 'react'
import mapNumber from 'util/mapNumber'
import Space from 'component/shared/Space/index'


export default function ( count ) {
    return mapNumber(
        count,
        ( index ) =>
        <Space key={ index } />
    )
}