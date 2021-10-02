import React, { Fragment, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Airtable from "airtable";

import {
  selectData,
  selectLoggedIn,
  selectError,
  selectLoading,
  selectUser,
  setData,
  setError,
  setLoading,
  setLoggedIn,
  setUser,
} from "./appSlice";

import Form from "../form/Form";
import Classes from "../classes/Classes";
import { AppProps, AppState } from "../../../types";

const base = new Airtable({ apiKey: "keyoUBSXI8CKOeRxM" }).base(
  "app8ZbcPx7dkpOnP0"
);

const App: FunctionComponent<AppProps> = () => {
  const loading = useSelector(selectLoading);
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser(""));
    dispatch(setData({}));
    dispatch(setLoggedIn(false));
  }

  function getLinkedRecord(table: string, id: string) {
    return base(table).find(id);
  }

  async function getResult() {
    dispatch(setLoading(true));
    dispatch(setError(""));

    base("Students")
      .select({
        maxRecords: 1,
        view: "Grid view",
        filterByFormula: `({Name}="${user}")`,
      })
      .firstPage(async (err, records) => {
        if (err && (records === undefined || records === null)) {
          console.error(err);
          dispatch(setError("Could not fetch results !!!"));
        }

        if (records !== undefined && records !== null) {
          if (records.length < 1) {
            dispatch(setError(`Student "${user}" does not exist !!!`));
            dispatch(setUser(""));
          } else {
            const data = await (
              (records[0]?.get("Classes") as string[]) ?? []
            ).reduce(async (acc, item) => {
              const record = await getLinkedRecord("Classes", item);
              const Students = await Promise.all(
                ((record?.get("Students") as string[]) ?? []).map(
                  async (item) =>
                    (await getLinkedRecord("Students", item)).get("Name")
                )
              );

              return Object.assign(await acc, {
                [item]: {
                  Name: record.get("Name"),
                  Students:
                    Students.length > 1 ? Students : ["No Linked Students"],
                },
              });
            }, {} as Promise<AppState["data"]>);

            dispatch(setData(data));
            dispatch(setLoggedIn(true));
          }
        }

        dispatch(setLoading(false));
      });
  }

  useEffect(() => {
    if (user !== "") getResult();
  }, [user]);

  return (
    <Fragment>
      {loading === true ? (
        <span className="loading">Loading...</span>
      ) : loggedIn === false ? (
        <Form
          onSubmit={(user: string) => dispatch(setUser(user))}
          error={error}
        />
      ) : (
        <Classes data={data} handleLogout={logout} />
      )}
    </Fragment>
  );
};

export default App;
