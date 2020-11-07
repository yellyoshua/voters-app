import React, { useState, memo } from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";
import AddIcon from "icons/AddIcon";
import useElection from "hooks/useElection";
import ContentLoader from "components/ContentLoader";
import CardElection from "components/Card/CardElection";
import ModalCreateElection from "components/Modals/ModalCreateElection";
import { TypeElection } from "types/electionTypes";
import "./index.css";

const breadcrumbs = [{ name: "Elecciones", pathname: "/elections" }];

type PropsElections = RouteComponentProps & {};

export default memo(function Elections(props: PropsElections) {
  useTitle("Elecciones");
  const {
    api,
    data,
    isFetching,
    isFetchError,
    apiCreate,
    apiRemove,
    getParsedObj,
  } = useElection({});

  const [isOpenCreateElection, openCreateElection] = useState<boolean>(false);

  const elections: TypeElection[] = Array.isArray(data) ? data : [];

  const handleEditElection = (id: any) => {
    return props.history.push(`/elections/${id}/edit`);
  };

  const createElection = async (val: TypeElection, cb: () => void) => {
    try {
      await apiCreate(val);
      await api.revalidate();
      return cb();
    } catch (error) {
      await api.revalidate();
      return cb();
    }
  };

  const deleteElection = async (id: any) => {
    try {
      return await apiRemove(`/elections/${id}`, () => {
        return api.mutate(null, true);
      });
    } catch (error) {
      return await api.mutate(null, true);
    }
  };

  return (
    <div>
      <div className='breadcrumbs-with-button'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <button onClick={() => openCreateElection(true)} className='btn-right-breadcrumb'>
          <AddIcon />
          Nueva elecci&oacute;n
        </button>
      </div>
      <ContentLoader
        isFetching={isFetching}
        isError={isFetchError}
        isNoData={elections ? elections.length === 0 : false}
        contentScreen='elections'
        messageNoData='Para crear una nueva, ve al botón [Nueva Elección]'>
        <div>
          {elections.map((election, index) => (
            <CardElection
              key={index}
              election={election}
              onDelete={deleteElection}
              getParsedObj={getParsedObj}
              onClick={handleEditElection}
            />
          ))}
        </div>
      </ContentLoader>
      <ModalCreateElection
        isOpen={isOpenCreateElection}
        onClose={openCreateElection}
        createElection={createElection}
      />
    </div>
  );
});
