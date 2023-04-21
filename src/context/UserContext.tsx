import { createContext } from "react";

type User ={
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string
    profilePicture: string,
}

type ContextProps = {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<ContextProps>({
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userName: '',
        profilePicture: ''
    },
    setUser: () => {}
})
