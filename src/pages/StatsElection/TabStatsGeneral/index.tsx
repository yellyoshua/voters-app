import React, { useState, useMemo, useCallback } from "react";
import { useApp } from "context/AppContext";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";
import VotesStatsGeneral from "reports/VotesStatsGeneral";
import { TypeElectionStats } from "types/electionTypes";
import { API_PDF, REACT_API_URL } from "configurations/api";

type PropsTabStatsGeneral = {
  stats: TypeElectionStats;
  isPrivate: boolean;
};

export default function TabStatsGeneral({ isPrivate, stats }: PropsTabStatsGeneral) {
  const id = useMemo(() => stats.id, [stats.id]);

  return <div>
    <RenderIf isTrue={isPrivate}>
      <SectionGeneratePdf id={id} />
    </RenderIf>
    <VotesStatsGeneral stats={stats} />
  </div>
}

type PropsSectionGeneratePdf = { id: string | number };

function SectionGeneratePdf({ id }: PropsSectionGeneratePdf) {
  const { school } = useApp();
  const [pdfLink, setPdfLink] = useState<string | null>(null);

  const loadPDFLink = useCallback(() => {
    const query = `?schoolname=${school.schoolName}&schoolicon=${school.schoolIcon}`;
    const html = `${REACT_API_URL}/votes/${id}/reportgeneral${query}`
    const url = `${API_PDF}${encodeURIComponent(html)}`;
    return setPdfLink(url);
  }, [school, id]);

  if (pdfLink) {
    return <React.Fragment>
      <a download={`reporte-votos-general-${id}`} href={pdfLink} target='_blank' rel='noopener noreferrer'>
        <Button variant="success" label="Descargar reporte" />
      </a>
    </React.Fragment >
  }

  return <Button onClick={loadPDFLink} label="Generar reporte general" />
}