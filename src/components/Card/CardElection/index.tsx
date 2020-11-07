import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import Badge from "react-rainbow-components/components/Badge";
import Button from "react-rainbow-components/components/Button";
import { TypeElection } from "types/electionTypes";
import "./index.css";

type PropsCardElection = {
  election: TypeElection;
  getParsedObj: (item: string, arr?: any[]) => any[];
  onClick: (id: any) => void;
  onDelete: (id: any) => Promise<any>;
};

export default function CardElection(props: PropsCardElection) {

  const id = useMemo(() => props.election.id, [props]);
  const isActiveElection = useMemo(() => props.election.status === "active", [props]);

  const campaigns = useMemo(() => props.getParsedObj("campaigns", props.election.campaigns), [props]);
  const candidates = useMemo(() => props.getParsedObj("candidates", props.election.candidates), [props]);
  const voters = useMemo(() => props.getParsedObj("voters", props.election.voters.data), [props]);
  const tags = useMemo(() => props.getParsedObj("tags", props.election.tags), [props]);

  return <Formik
    initialValues={{}}
    onSubmit={() => props.onDelete(id)}
  >
    {function ({ isSubmitting }) {
      return (
        <Form>
          <div className="card-election-container">
            <div className="card-election-pod-title">
              <p>
                <Badge
                  label={id}
                  variant="success"
                  title="ID"
                />
                <BadgeStatus
                  state={props.election.status}
                />
              </p>
              <h1>{props.election.name}</h1>
            </div>
            <div className="card-election-pod-g-stats">
              <div className="card-election-pod-g-stats-minicard">
                <p>{voters.length}</p>
                <h3>Votantes</h3>
              </div>
              <div className="card-election-pod-g-stats-minicard">
                <p>{campaigns.length}</p>
                <h3>Partidos</h3>
              </div>
              <div className="card-election-pod-g-stats-minicard">
                <p>{tags.length}</p>
                <h3>Etiquetas</h3>
              </div>
              <div className="card-election-pod-g-stats-minicard">
                <p>{candidates.length}</p>
                <h3>Candidatos</h3>
              </div>
            </div>
            <div className="card-election-pod-buttons">
              <div className="card-election-buttons-open-delete">
                <div style={{ padding: 5 }}>
                  <Link to={`/elections/${id}/edit`}>
                    <Button
                      label="Abrir"
                      variant="border-inverse"
                      disabled={isSubmitting}
                    />
                  </Link>
                </div>
                <div style={{ padding: 5 }}>
                  <Button
                    label="Borrar"
                    variant="destructive"
                    type="submit"
                    disabled={isActiveElection || isSubmitting}
                  />
                </div>
              </div>
              <div>
                <div style={{ padding: 5 }}>
                  <Button
                    label="Compartir enlace"
                    disabled={isSubmitting}
                  />
                </div>
                <div style={{ padding: 5 }}>
                  <Link to={`/elections/${id}/stats`}>
                    <Button
                      label="Estadisticas votos"
                      disabled={isSubmitting}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      );
    }}
  </Formik>
}

const BadgeStatus = (props: { state: "active" | "closed" | "archived" | "no_active" }) => {
  switch (props.state) {
    case "archived":
      return <Badge
        label="Cerrado"
        variant="error"
        title="Cerrado"
      />
    case "closed":
      return <Badge
        label="Cerrado"
        variant="error"
        title="Cerrado"
      />
    case "active":
      return <Badge
        label="Activo"
        variant="warning"
        title="Activo"
      />
    default:
      return <Badge
        label="No activo"
        variant="inverse"
        title="No activo"
      />
  }
}