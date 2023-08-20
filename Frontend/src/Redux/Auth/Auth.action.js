
import axios from "axios";
import * as types from "./Auth.types";
import { BASE_URL } from "../../utils/config";

export const loginAdmin = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.USER_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/user/admin-login`, payload)
        .then((res) => {
            dispatch({ type: types.USER_AUTH_LOGIN_SUCCESS, payload: res?.data });
            toast({
                title: "Login Successfull!",
                description: "You have succesfully logged in as an admin",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/admin");
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.msg,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.USER_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
export const loginUser = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.USER_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/user/login`, payload)
        .then((res) => {
            dispatch({ type: types.USER_AUTH_LOGIN_SUCCESS, payload: res?.data });
            toast({
                title: "Login Successfull!",
                description: "You have succesfully logged in as User",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/user");
        })
        .catch((res) => {
            console.log(res);
            toast({
                title: "Login Failed!",
                description: res?.response?.data?.msg || "Something went wrong",
                status: res?.response?.data?.status || "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.USER_AUTH_LOGIN_ERROR,
                payload: res?.response?.data?.msg,
            });
        });
};