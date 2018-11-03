const initialState = {dataAvailable:false, retail_data: "Nothing"}

export function retail_data(state = initialState, action) {
    switch (action.type) {
        case 'RETAIL_DATA_SUCCESS':
            return {
                dataAvailable: true,
                retail_data: action.retail_data
            }
        
        default:
            return state;
    }
}