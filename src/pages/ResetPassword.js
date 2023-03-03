import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./resetPasswordCss.css";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import e from "cors";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  function SendResetEmail(e) {
    // setHint(
    //   "Please check your E-mail, We have sent you an email with a link to reset your password"
    // );
    const emailObject = {
      email: email,
    };
    e.preventDefault();
    axios
      .post(hostName+"/api/v1/users/forgetPassword", emailObject)
      .then((res) => {
        console.log("hii", res.data);
        setHint(
          "Please check your E-mail, We have sent you an email with a link to reset your password"
        );
      })
      .catch((err) => {
        console.log(err);
        setHint("The user with this e-mail does not exist");
      });
  }
  return (
    <center>
      <form className="formpassword">
        <h1 id="login">Reset Password</h1>
        <Input
          required
          title="Type your email"
          id="label"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />

        <input
          // to="/passwordreset"
          type="submit"
          value="Cancel "
          className="cancelButton"
          // onClick={Hint}
          onClick={() => navigate(-1)}
        />
        <input
          // to="/passwordreset"
          type="submit"
          value="Send"
          className="button"
          // onClick={Hint}
          onClick={SendResetEmail}
        />

        <br />
        <label id="hint">{hint}</label>
      </form>
    </center>
  );
};
export default ResetPassword;
