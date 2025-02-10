import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

const StyledContactForm = styled.div`
width: 400px;

form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  font-size: 16px;

  input {
    width: 100%;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);

    &:focus {
      border: 2px solid rgba(0, 206, 158, 1);
    }
  }

  textarea {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    max-height: 100px;
    min-height: 100px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);

    &:focus {
      border: 2px solid rgba(0, 206, 158, 1);
    }
  }

  label {
    margin-top: 1rem;
  }

  input[type="submit"] {
    margin-top: 2rem;
    cursor: pointer;
    background: rgb(249, 105, 14);
    color: white;
    border: none;
  }
}
`;

const Contact = () => {
  const form = useRef();
  const [defaultValues, setDefaultValues] = useState({
    user_name: "CtrlAtlDefeatTeam",
    user_email: "yonino1649@grassdev.com",
    message: "Disaster Alert from Social media",
  });

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_1nrzuow",
        "template_s5148f7",
        form.current,
        "vhI1z9lEozCaqfS1o"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  
    setTimeout(() => {
      const shouldSendDefaultValues = window.confirm("Send Alert to Authorities?");
      if (shouldSendDefaultValues) {
        sendEmail();
      }
    }, 6000);
  

  return (
    <StyledContactForm>
      {/* <button onClick={showAlert}>Show Alert after 3 seconds</button> */}
      <form ref={form} style={{ display: "none" }}>
        {/* The form is hidden by default */}
        <label>Name</label>
        <input type="text" name="user_name" defaultValue={defaultValues.user_name} />
        <label>Email</label>
        <input type="email" name="user_email" defaultValue={defaultValues.user_email} />
        <label>Message</label>
        <textarea name="message" defaultValue={defaultValues.message} />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;