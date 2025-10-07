import UserAvatar from "./user-avatar";
import TextArea from "./text-area";
import FormActions from "./form-actions";
import { useRef, useState } from "react";
import ImagePreview from "./image-preview";
import { toast } from "react-toastify";
import uploadToStorage from "../../firebase/uploadToStorage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // preview 
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // remove preview
  const clearImage = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // receive data from input
    const text = e.target.text.value;
    const file = e.target.image.files[0];

    // if there is no data send notification
    if (!text.trim() && !file) return toast.warning("Please specify the content");

    try {
      setIsLoading(true);

      // send img to storage and take the url
      const url = await uploadToStorage(file);

      // take tweets collection's ref
      const collectionRef = collection(db, "tweets");

      // send new tweet to collection
      await addDoc(collectionRef, {
        content: { text, image: url },
        isEdited: false,
        likes: [],
        createdAt: serverTimestamp(),
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });

      // reset form
      e.target.reset();
      clearImage();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="border-b border-tw-gray p-4 flex gap-3">
      <UserAvatar photo={user.photoURL} name={user.displayName} />

      <form onSubmit={handleSubmit} className="w-full pt-1">
        <TextArea />

        <ImagePreview image={image} clearImage={clearImage} />

        <FormActions isLoading={isLoading} fileInputRef={fileInputRef} onImageChange={onImageChange} />
      </form>
    </div>
  );
};

export default Form;
