import React, { useCallback, useMemo, useState } from "react";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import { TypeElectionFunc, TypeStatusElection } from "types/electionTypes";
import { Formik, Form } from "formik";
import { useTheElection } from "context/TheElectionContext";
import ModalCargo from "components/Modals/ModalCargo";
import Button from "react-rainbow-components/components/Button";
import ListCargos from "components/Lists/ListCargos";

// [x] Button Star/Stop election votes 
// [] Create/Remove cargos candidates

type PropsTabSettings = {
  updateElection: (newElection: TypeElectionFunc) => Promise<any>
};

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
];

export default function TabSettings({ updateElection }: PropsTabSettings) {
  const { theElection } = useTheElection();
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);

  const [statusPicked, pickStatus] = useState<TypeStatusElection>(theElection.status);
  const [isModalOpen, setModalOpen] = useState(false);
  const [slugCampaign, setSlugCampaign] = useState<string | null>(null);

  const openModal = useCallback((slug: string | null) => {
    setSlugCampaign(slug);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSlugCampaign(null);
    setModalOpen(false);
  }, []);


  return <div>
    <ModalCargo
      isOpen={isModalOpen}
      createOrUpdate={updateElection}
      cancel={closeModal}
      slug={slugCampaign}
    />
    <div className='elections-tabs-view-section'>
      <section>
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
      </section>
      <section className="list-items-col" style={{ textAlign: "center" }}>
        <div>
          <Button label="Crear cargo" onClick={() => openModal(null)} />
        </div>
        <ListCargos
          cargos={cargos}
          editCargo={openModal}
        />
      </section>
    </div>
  </div>
}