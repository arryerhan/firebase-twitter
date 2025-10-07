import { useRef, useState } from "react";
import Modal from "../modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();

  const handlePasswordReset = () => {
    const email = inputRef.current.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset link has been sent to your email address.");
        setIsOpen(false);
      })
      .catch(() => toast.error("Failed to send email"));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-end text-sm text-gray-500 hover:text-gray-400 mt-2 cursor-pointer"
      >
        Forgot Password?
      </button>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Forgot Password?</h1>
          <p className="text-zinc-400">
            We will send a password reset link to your email address.
          </p>

          <input ref={inputRef} type="email" className="input mt-10" />

          <button
            type="button"
            onClick={handlePasswordReset}
            className="bg-white hover:bg-gray-300 transition text-black rounded-full mt-8 py-1 cursor-pointer"
          >
            Send a password reset link
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-zinc-400 hover:bg-zinc-500 transition text-black rounded-full mt-3 py-1 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
