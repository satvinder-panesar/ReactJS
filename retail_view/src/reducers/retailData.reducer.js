const initialState = {dataAvailable:false, retail_data: "Nothing"}

export function reatil_data(state = initialState, action) {
    switch (action.type) {
        case 'RETAIL_DATA_SUCCESS':
            console.log("reducer reached: response: ",action.retail_data);
            return {
                dataAvailable: true,
                retail_data: action.retail_data
            }
        
        default:
            return state;
    }
}