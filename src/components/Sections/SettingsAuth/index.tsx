import React, { useMemo, useState } from "react";
import { AsyncState } from "react-use/lib/useAsyncFn";
import { useTheElection } from "context/TheElectionContext";
import InputFetch from "components/InputFetch";
import Badge from "react-rainbow-components/components/Badge";
import RadioGroup from "react-rainbow-components/components/RadioGroup";
import { TypeElectionFunc } from "types/electionTypes";
import "./index.css";

type PropsSettingsAuth = {
  execAsyncUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  stateAsyncUpdate: AsyncState<any>;
}

export default function SettingsAuth({ execAsyncUpdate, stateAsyncUpdate }: PropsSettingsAuth) {
  return <section className="container-settings-auth">
    <h1>Autenticación del votante</h1>
    <div className="list-items-row container-settings-row">
      <SettingsFirstAuth
        execAsyncUpdate={execAsyncUpdate}
        stateAsyncUpdate={stateAsyncUpdate}
      />
      <SettingsSecondAuth
        execAsyncUpdate={execAsyncUpdate}
        stateAsyncUpdate={stateAsyncUpdate}
      />
    </div>
  </section>
}

function SettingsFirstAuth({ execAsyncUpdate, stateAsyncUpdate }: PropsSettingsAuth) {
  const { theElection } = useTheElection();
  const [first_auth, setFirst_auth] = useState(theElection.first_auth);

  const selectFieldsList = useMemo(() => theElection.voters.fields.map(field =>
    ({ value: field, label: field, disabled: stateAsyncUpdate.loading })), [stateAsyncUpdate.loading, theElection]);

  return <div className="card-radio-group-fields">
    <Badge variant="warning" className="card-radio-badge" label="Primera validaci&oacute;n" />
    <InputFetch
      beforeChange={null}
      className="card-settings-auth-input"
      placeholder="Primera validación"
      initialValue={first_auth.name}
      onChange={(first_auth) => {
        return execAsyncUpdate({
          first_auth
        });
      }}
      resolveData={(value) => ({
        ...first_auth,
        name: value
      })}
    />
    <RadioGroup
      id="radio-group-component-1"
      options={selectFieldsList}
      value={first_auth.field}
      className="isActive"
      // @ts-ignore
      onChange={({ target: { value } }) => {
        const new_first_auth = { ...first_auth, field: value };
        setFirst_auth(new_first_auth);
        return execAsyncUpdate({
          first_auth: new_first_auth
        });
      }}
    />
  </div>
}
function SettingsSecondAuth({ execAsyncUpdate, stateAsyncUpdate }: PropsSettingsAuth) {
  const { theElection } = useTheElection();
  const [second_auth, setSecond_auth] = useState(theElection.second_auth);

  const selectFieldsList = useMemo(() => theElection.voters.fields.map(field =>
    ({ value: field, label: field, disabled: stateAsyncUpdate.loading })), [stateAsyncUpdate.loading, theElection]);

  return <div className="card-radio-group-fields">
    <Badge variant="warning" className="card-radio-badge" label="Segunda validaci&oacute;n" />
    <InputFetch
      beforeChange={null}
      className="card-settings-auth-input"
      placeholder="Segunda validación"
      initialValue={second_auth.name}
      onChange={(second_auth) => {
        return execAsyncUpdate({
          second_auth
        });
      }}
      resolveData={(value) => ({
        ...second_auth,
        name: value
      })}
    />
    <RadioGroup
      id="radio-group-component-1"
      options={selectFieldsList}
      value={second_auth.field}
      className="isActive"
      // @ts-ignore
      onChange={({ target: { value } }) => {
        const new_second_auth = { ...second_auth, field: value };
        setSecond_auth(new_second_auth);
        return execAsyncUpdate({
          second_auth: new_second_auth
        });
      }}
    />
  </div>
}