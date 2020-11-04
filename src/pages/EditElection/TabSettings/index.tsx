import React, { useState } from "react";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import { TypeElectionFunc, TypeStatusElection } from "types/electionTypes";
import { Formik, Form } from "formik";
import { useTheElection } from "context/TheElectionContext";

// [x] Button Star/Stop election votes 
// [] Create/Remove position candidates

type PropsTabSettings = {
  updateElection: (newElection: TypeElectionFunc) => Promise<any>
};

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
]

export default function TabSettings({ updateElection }: PropsTabSettings) {
  const { theElection } = useTheElection();

  const [statusPicked, pickStatus] = useState<TypeStatusElection>(theElection.status);

  return <div>

    <div className='elections-tabs-view-section'>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          return updateElection({
            status: statusPicked
          });
        }}
      >
        {function ({ isSubmitting, submitForm }) {
          return (
            <Form>
              <section>
                <ButtonGroupPicker
                  title="Estado eleccion"
                  disabled={isSubmitting}
                  itemPicked={statusPicked}
                  onPick={(iPicked) => {
                    pickStatus(iPicked as TypeStatusElection);
                    return submitForm();
                  }}
                  pickList={pickStatusList}
                />
              </section>
            </Form>
          )
        }
        }
      </Formik>
    </div>
  </div>
}