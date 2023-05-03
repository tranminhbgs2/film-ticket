import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useRouter } from 'next/router'
import styles from "./Login.module.scss";

// import "./styles.scss";

function Login() {
  const router = useRouter()
  // React States
  const [errorMessages, setErrorMessages] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "admin",
      password: "Admin@123"
    },
    {
      username: "0986123456",
      password: "Admin@123"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event:any) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        router.push('/admin')
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name:any) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" className={styles.text_input} name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" className={styles.text_input} name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className={styles.button_container}>
          <input className={styles.submit} type="submit"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.app_login}>
      <div className={styles.login_form}>
        <div className={styles.title}>Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;