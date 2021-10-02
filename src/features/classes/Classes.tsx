import React, { Fragment, FunctionComponent } from "react";
import { ClassesProps, ClassRecord } from "../../../types";

const Classes: FunctionComponent<ClassesProps> = ({ data, handleLogout }) => {
  return (
    <Fragment>
      <div className="boxes">
        {Object.entries(data).map(([key, item]) => (
          <Class {...item} key={key} />
        ))}
      </div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </Fragment>
  );
};

const Class: FunctionComponent<ClassRecord> = ({ Name, Students }) => {
  return (
    <div className="box">
      <h5 className="box__title">Name</h5>
      <span className="box__value">{Name}</span>
      <h5 className="box__title">Students</h5>
      <span className="box__value">{Students.join(", ")}</span>
    </div>
  );
};

export default Classes;
