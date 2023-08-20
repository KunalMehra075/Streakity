import * as UserTypes from "./App/Types/User.types";

const initState = {
    Users: [],
    UserByID: {},
    loading: false,
    error: false,
};



//? User-------------
export const UserReducer = (state = initState, { type, payload }) => {
    switch (type) {

        case UserTypes.USER_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case UserTypes.USER_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case UserTypes.USER_GET_SUCCESS: {
            return { ...state, loading: false, error: false, Users: payload?.Users, TotalUsers: payload?.TotalUsers };
        }

        case UserTypes.USER_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case UserTypes.USER_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case UserTypes.USER_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, UserByID: payload?.User, };
        }

        case UserTypes.USER_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case UserTypes.USER_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case UserTypes.USER_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }

        case UserTypes.USER_UPLOAD_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case UserTypes.USER_UPLOAD_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case UserTypes.USER_UPLOAD_SUCCESS: {
            return { ...state, loading: false, error: false }
        }
        case UserTypes.USER_SEND_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case UserTypes.USER_SEND_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case UserTypes.USER_SEND_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        default: {
            return state;
        }
    }
};



