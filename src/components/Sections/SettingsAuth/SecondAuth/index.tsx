import React, { useContext, memo, useMemo } from "react";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import InputFetch from "components/InputFetch";
import Badge from "react-rainbow-components/components/Badge";
import RadioGroup from "react-rainbow-components/components/RadioGroup";


function SecondtAuth() {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;


  const second_auth = theElection.second_auth;
  const selectFieldsList = useMemo(() => theElection.voters.fields.map(field =>
    ({ value: field, label: field, disabled: asyncUpdate.loading })), [asyncUpdate.loading, theElection]);

  return <div className="card-radio-group-fields">
    <Badge variant="warning" className="card-radio-badge" label="Segunda validaci&oacute;n" />
    <InputFetch
      beforeChange={null}
      className="card-settings-auth-input"
      placeholder="Segunda validación"
      initialValue={second_auth.name}
      onChange={(val) => {
        return updateElection({
          second_auth: val
        }, () => { });
      }}
      resolveData={(value) => ({
        ...second_auth,
        name: value
      })}
    />
    <RadioGroup
      id="radio-group-component-2"
      options={selectFieldsList}
      value={second_auth.field}
      className="isActive"
      // @ts-ignore
      onChange={({ target: { value } }) => {
        return updateElection({
          second_auth: { ...second_auth, field: value }
        }, () => { });
      }}
    />
  </div>
}

export default memo(SecondtAuth);