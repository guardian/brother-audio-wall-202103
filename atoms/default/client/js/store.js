const {createStore} = require( "redux");
const initial = {
    ui: {},
    data: {
        sections: []
    }
};

export const ACTION_SET_SECTIONS = 'set_sections';

const rootReducer = (state = initial, action) => {
    switch (action.type) {
        case ACTION_SET_SECTIONS:
            return {...state, data:{...state.data, sections: action.payload} };
    }
    return state;
}

export default createStore(rootReducer);