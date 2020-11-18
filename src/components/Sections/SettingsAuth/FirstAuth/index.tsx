import React, { useContext, memo, useMemo } from "react";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import InputFetch from "components/InputFetch";
import Badge from "react-rainbow-components/components/Badge";
import RadioGroup from "react-rainbow-components/components/RadioGroup";


function FirstAuth() {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;
  const first_auth = theElection.first_auth;

  const selectFieldsList = useMemo(() => theElection.voters.fields.map(field =>
    ({ value: field, label: field, disabled: asyncUpdate.loading })), [asyncUpdate.loading, theElection]);

  return <div className="card-radio-group-fields">
    <Badge variant="warning" className="card-radio-badge" label="Primera validaci&oacute;n" />
    <InputFetch
      beforeChange={null}
      className="card-settings-auth-input"
      placeholder="Primera validación"
      initialValue={first_auth.name}
      onChange={(val) => {
        return updateElection({
          first_auth: val
        }, () => { });
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
        return updateElection({
          first_auth: { ...first_auth, field: value }
        }, () => { });
      }}
    />
  </div>
}

export default memo(FirstAuth);