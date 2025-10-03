const AuthToggle = ({ isSignUp, setIsSignUp }) => {
  return (
    <p className="mt-5 select-none">
      <span className="text-gray-500">
        {isSignUp ? "Already have an account" : "If you do not have an account"}
      </span>
      <span
        className="cursor-pointer ms-2 text-blue-500 hover:underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Sign In" : "Sign Up"}
      </span>
    </p>
  );
};

export default AuthToggle;
