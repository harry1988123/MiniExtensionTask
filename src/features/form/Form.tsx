import { useSelector, useDispatch } from "react-redux";
import React, { FunctionComponent, FormEvent, ChangeEvent } from "react";
import { selectValue, setValue } from "./formSlice";
import { FormProps } from "../../../types";

const Form: FunctionComponent<FormProps> = ({ onSubmit, error }) => {
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setValue(""));
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <div style = {{display: 'flex', width: '22rem', justifyContent: 'space-around', alignItems: 'center'  }}> 
        <span className="login__title">Student's name: </span>
        <input
          required
          type="text"
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
        />
      </div>
      <span className="login__error">{error}</span>
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;
