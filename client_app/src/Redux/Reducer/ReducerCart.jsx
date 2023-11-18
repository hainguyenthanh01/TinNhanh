const initalState = {
    id_user: '',
    listCart: []
}

const ReducerCart = (state = initalState, action) => {

    switch (action.type) {

        //Nhận dữ liệu id_user và thay đổi state
        case 'ADD_USER':

            state = {
                id_user: action.data,
                listCart: state.listCart
            }

            return state
        case 'ADD_CART':
            return {
                ...state,
                listCart: action.data
            }
        default:
            return state

    }

}

export default ReducerCart