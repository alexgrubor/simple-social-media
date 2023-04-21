import { createContext } from "react";

interface Like {
  id: string;
  user: string;
  post: string;
}


interface ContextProps {
    likes: Like[];
    addLike: (like: Like) => void;
}

export const LikesContext = createContext<ContextProps>({
    likes: [],
    addLike: () => {}
})