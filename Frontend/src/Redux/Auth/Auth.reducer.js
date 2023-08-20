import * as types from "./Auth.types";

const UserInitState = {
    token: JSON.parse(localStorage.getItem("admin_login_token")),
    isAuth: JSON.parse(localStorage.getItem("admin_login_token")) ? true : false,
    User_detail: JSON.parse(localStorage.getItem("User_detail")) || null,
    loading: false,
    error: false,
};

export const UserAuthReducer = (state = UserInitState, { type, payload }) => {
    switch (type) {
        case types.USER_AUTH_LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case types.USER_AUTH_LOGIN_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            };
        }

        case types.USER_AUTH_LOGIN_SUCCESS: {
            localStorage.setItem("admin_login_token", JSON.stringify(payload?.token));
            localStorage.setItem("user_detail_userapp", JSON.stringify(payload?.user));
            return {
                ...state,
                loading: false,
                error: false,
                isAuth: true,
                token: payload?.token,
                User_detail: payload?.user
            };
        }

        case types.USER_LOGOUT: {
            localStorage.removeItem("admin_login_token");
            localStorage.removeItem("user_detail_userapp");
            return {
                ...state,
                isAuth: false,
                token: null,
                User_detail: null
            };
        }

        default: {
            return state;
        }
    }
};
