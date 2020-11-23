import React, { useState, useCallback, ReactNode, useMemo } from "react";
import Button from "react-rainbow-components/components/Button";
import { TypeElectionStats } from "types/electionTypes";
import { useApp } from "context/AppContext";
import { API_PDF, REACT_API_URL } from "configurations/api";

type PropsTabStatsPerTag = {
  stats: TypeElectionStats;
  isPrivate: boolean;
};

export default function TabStatsPerTag({ stats }: PropsTabStatsPerTag) {
  const id = useMemo(() => stats.id, [stats.id]);

  if (stats.tags.length === 0) {
    return <div>No Tags!</div>
  }

  return <div>
    <div className="list-items-row">
      {stats.tags.map((tag, index) => (
        <ContainerTag key={index} tag={tag}>
          <SectionGeneratePdf id={id} tag={tag} />
        </ContainerTag>
      ))}
    </div>
  </div>
}

type PropsContainerTag = {
  tag: string;
  children?: ReactNode;
};

function ContainerTag({ children, tag }: PropsContainerTag) {
  return <div className="list-items-row">
    <h1>{tag}</h1>
    {children}
  </div>
}

type PropsSectionGeneratePdf = {
  id: number | string;
  tag: string;
}

function SectionGeneratePdf({ id, tag }: PropsSectionGeneratePdf) {
  const { school } = useApp();
  const [pdfLink, setPdfLink] = useState<string | null>(null);

  const loadPDFLink = useCallback(() => {
    const query = `schoolname=${school.schoolName}&schoolicon=${school.schoolIcon}`;
    const props = `?fields=ci,name,second_name,surname&tag=${tag}&${query}`;
    const html = `${REACT_API_URL}/votes/${id}/report_per_tag${props}`
    const url = `${API_PDF}${encodeURIComponent(html)}`;
    return setPdfLink(url);
  }, [school, id, tag]);

  if (pdfLink) {
    return <React.Fragment>
      <a download={`reporte-votos-general-${id}`} href={pdfLink} target='_blank' rel='noopener noreferrer'>
        <Button variant="success" label="Descargar reporte" />
      </a>
    </React.Fragment >
  }

  return <Button onClick={loadPDFLink} label="Generar reporte" />
}