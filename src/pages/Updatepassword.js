import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import "./updatePasswordCss.css";
import axios from "axios";

const UpdatePassword = () => {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [hint, setHint] = useState("");
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [newPasswordEye, setNewPasswordEye] = useState(false);
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const [values] = React.useState({
    password: "",
    showPassword: false,
    passwordConfirm: "",
  });

  const passwordData = {
    password: password,
    passwordConfirm: passwordConfirm,
  };
  console.log(password, passwordConfirm);

  function updatePassword(e) {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");

    e.preventDefault();
    axios
      .patch(hostName+`/api/v1/users/resetPassword/${token}`, passwordData)
      .then((res) => {
        console.log("token", res.token);
        setHint("Your Password Successfully Updated");
      })
      .catch((err) => {
        setHint("Please Try again");
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else if (err.message) {
          console.log(err.message);
        }
      });
  }
  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const handleNewPasswordClick = () => {
    setNewPasswordEye(!newPasswordEye);
  };

  return (
    <center>
      <React.Fragment>
        <section>
          <form onSubmit={updatePassword} className="forgottenpasswordform">
            <div className="bg-white w-auto h-auto pb-20 mt-20 rounded-lg mx-5 sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
              <div className="flex items-center justify-center h-32 shadow">
                <p className="uppercase text-4xl font-bold text-center">
                  <h1 id="login">Update Password</h1>{" "}
                </p>
              </div>

              <div>
                <div className="mx-5">
                  <div className="mt-10 relative">
                    <Input
                      name="search"
                      id="label"
                      type={newPasswordEye === false ? "password" : "text"}
                      placeholder="Password"
                      className={`w-full h-14 rounded-lg ${
                        errors.password &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]{10,16}$/,
                          message:
                            "Password should include at least one uppercase, one numeric value and one special character",
                        },
                        minLength: {
                          value: 8,
                          message: "Minimum Required length is 8",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum Required length is 20",
                        },
                      })}
                      endAdornment={
                        <InputAdornment position="left" id="a">
                          <IconButton
                            onClick={handleNewPasswordClick}
                            onChange={handleNewPasswordClick}
                          >
                            {values.password ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <br />
                    <br />
                    {errors.password && (
                      <span id="errorsStyle" style={{ fontSize: "14px" }}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="mt-10 relative">
                    <Input
                      id="label"
                      type={confirmPasswordEye === false ? "password" : "text"}
                      placeholder="Confirm Password"
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      className={`w-full h-14 rounded-lg ${
                        errors.confirm &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("passwordConfirm", {
                        required: "confirm password is required",
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                      endAdornment={
                        <InputAdornment position="left">
                          <IconButton
                            onClick={handleConfirmPasswordClick}
                            onChange={handleConfirmPasswordClick}
                          >
                            {values.passwordConfirm ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    ></Input>
                    <br />
                    <br />
                    {errors.passwordConfirm && (
                      <span id="errorsStyle" style={{ fontSize: "14px" }}>
                        {errors.passwordConfirm.message}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-12">
                    <input
                      className="button"
                      type="submit"
                      value="Submit"
                      onClick={updatePassword}
                    />
                    <br />
                    {hint}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </React.Fragment>
    </center>
  );
};

export default UpdatePassword;
