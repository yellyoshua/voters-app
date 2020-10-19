import React, { useState } from "react";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import { TypeElection, TypeStatusElection } from "types/appTypes";
import { Formik, Form } from "formik";

// [x] Button Star/Stop election votes 
// [] Create/Remove position candidates

type PropsTabSettings = {
  election: TypeElection;
  updateElection: (data: {
    [key: string]: any;
  }) => Promise<any>
};

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
]

export default function TabSettings({ election, updateElection }: PropsTabSettings) {
  const [statusPicked, pickStatus] = useState<string>(election.status);

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
                    pickStatus(iPicked);
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