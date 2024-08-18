import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface createFormData {
    title: string,
    description: string,
}

export const CreateForm = () => {

    const navigate = useNavigate();
    
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description"),
    });

    const {register, handleSubmit, formState: {errors} } = useForm<createFormData>({
        resolver: yupResolver(schema),
    });

    const postsref = collection(db, "posts");

    const onCreatePost = async (data: createFormData) => {
        console.log(data);
        await addDoc(postsref, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="title..." {...register("title")}/>
            <p>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")} />
            <p>{errors.description?.message}</p>
            <input className="submitBtn" type="submit" />
        </form>
    )
}