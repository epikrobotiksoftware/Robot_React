import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@material-ui/core/Input";
// import { Input } from '@mui/material';
import "./loginCss.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(hostName+"/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", JSON.stringify(data));

        navigate("/homepage");
      } else {
        alert("Please check your Email and Password");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <center>
        <form onSubmit={handleSubmit} className="form">
          <h1 id="login">LOGIN</h1>
          <br />
          <Input
            id="label"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <Input
            id="label"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            className="button button:hosubmitver"
            type="submit"
            value="Login"
          />
          <p id="forgotPassText">
            Forgot Password ?{" "}
            <a href="http://localhost:3000/resetpassword" id="resetPassword">
              Reset It
            </a>
          </p>
        </form>
        <h4 id="copy_right">Epik Robotik &copy; 2022</h4>
      </center>
    </React.Fragment>
    //       initialValues={{
    //         email: '',
    //         password: '',
    //       }}
    //       validationSchema={Yup.object({
    //         email: Yup.string()
    //           .email('Invalid email address')
    //           .required('Required'),
    //         password: Yup.string().required('Required'),
    //       })}
    //       onSubmit={(values, { setSubmitting }) => {
    //         console.log(values)
    //       }}
    //     >
    //       <form>
    //         <TextInput
    //           name="email"
    //           type="text"
    //           label="Email Address"
    //           value={email}
    //           onChange={(e) => {
    //             setEmail(e.target.value)
    //           }}
    //           icon={<FiMail />}
    //         />
    //         <TextInput
    //           name="password"
    //           type="password"
    //           label="Password"
    //           value={password}
    //           onChange={(e) => {
    //             setPassword(e.target.value)
    //           }}
    //           icon={<FiLock />}
    //         />
    //         <ButtonGroup>
    //           <StyledFormButton onClick={handleSubmit} type="submit">
    //             LOGIN
    //           </StyledFormButton>
    //           {/* <StyledButton  to="/signup">SIGNUP</StyledButton> */}
    //         </ButtonGroup>
    //       </form>
    //     </Formik>
    //     <ExtraText>
    //       Forgotten Password?{' '}
    //       <TextLink to="/forgottenpassword">Reset it</TextLink>
    //     </ExtraText>
    //   </StyledFormArea>
    //   <CopyrightText>Epik Robotik &copy;2020</CopyrightText>
    // </div>
  );
};
export default Login;
