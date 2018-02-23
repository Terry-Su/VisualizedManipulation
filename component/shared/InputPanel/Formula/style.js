export default {
    container: {
      position: 'relative',
      // alignItems: 'center',
    //   justifyContent: 'left',
      margin: '20px',
      padding: '20px',
      borderRadius: '6px',
      overflowX: 'auto',
      whiteSpace: 'nowrap!important',      
      background: '#7ecef4',
      '&::-webkit-scrollbar': {
          width: 6, /* for vertical scrollbars */
          height: 6, /* for horizontal scrollbars */
      },
      '&::-webkit-scrollbar-track': {
          // background: '#D9E4EC',
      },
      '&::-webkit-scrollbar-thumb': {
          background: '#5f9bb8',
      },
      '&::-webkit-scrollbar-thumb:vertical': {
          '-webkit-border-radius': '3px'
      },
    },
    tableLayout: {
        display: 'table',
    }
} 