import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [postslist, setpostslist] = useState<Post[] | null>(null);

    const postsref = collection(db, "posts");

    const getposts = async () => {
        const data = await getDocs(postsref)
        setpostslist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    }

    useEffect(() => {
        getposts();
    }, []);
    return (
        <div className="content">
            {postslist?.map((post) => (<Post post={post} />))}
        </div>
    )
}