import { useAuthState } from "react-firebase-hooks/auth";
import { Post as Ipost } from "./main"
import { auth, db } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
    post: Ipost;
}

interface Like {
    likeId:string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;

    const [likes, setlikes] = useState<Like[] | null>(null)

    const [user] = useAuthState(auth);

    const likesref = collection(db, "likes")

    const likesDoc = query(likesref, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setlikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    useEffect(() => {
        getLikes();
    }, []);

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesref, { userId: user?.uid, postId: post.id });
            if (user) {
                setlikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id}]);
            }
        } catch (error) {
            console.log(`message: ${error}`)
        }
    }

    const removelike = async () => {
        try {
            const deletequery = query(likesref, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const delQueryData = await getDocs(deletequery);
            const likeId = delQueryData.docs[0].id
            const liketodelete = doc(db, "likes", likeId);
            await deleteDoc(liketodelete);
            if (user) {
                setlikes((prev) => prev && prev?.filter((like) => like.likeId !== likeId));
            }
        } catch (error) {
            console.log(`message: ${error}`)
        }
    }

    const hasLiked = likes?.find((like) => like.userId === user?.uid);

    return (
        <div className="post">
            <div className="title">
                    <h1>{post.title}</h1>
                <div className="head">
                    <button onClick={hasLiked ? removelike : addLike}>{hasLiked ? <>&#8681;</> : <>&#8679;</>}</button>
                    {likes && <p>{likes.length}</p>}
                </div>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <small>@{post.username}</small>
            </div>
        </div>
    )
}
