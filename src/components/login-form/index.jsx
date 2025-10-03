import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import ForgotPassword from "./forgot-password";
import AuthToggle from "./auth-toggle";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  // if signup mode?
  const [isSignUp, setIsSignUp] = useState(false);

  // while sending the form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // receive data from input
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      if (isSignUp) {
        // if signup mode : create account
        const res = await createUserWithEmailAndPassword(auth, email, password);

        // send email verification
        await sendEmailVerification(res.user);

        // send notofocation
        toast.info("A verification email has been sent to your email address.");

        // back to login mode
        setIsSignUp(false);
      } else {
        // if login mode? : log in
        const res = await signInWithEmailAndPassword(auth, email, password);

        if (!res.user.emailVerified) {
          return toast.info("Please verify your email");
        }

        // after verify the email : log in
        navigate("/feed");
        toast.success("You are now logged in");
      }

      e.target.reset();
    } catch (error) {
      // send error notify
      toast.error("Error: " + error.code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <EmailInput />

      <PasswordInput />

      {!isSignUp ? <ForgotPassword /> : <div className="h-[28px] w-1" />}

      <button
        type="submit"
        className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 cursor-pointer"
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>

      <AuthToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </form>
  );
};

export default Form;
