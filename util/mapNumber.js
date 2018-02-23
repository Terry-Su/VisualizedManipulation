export default function ( number, iterateMethod ) {
    let arr = []
    for ( let i = 0; i < number; i++ ) {
        const currentIndex =  i
        arr.push( iterateMethod( currentIndex ) )
    }
    return arr
}