import React, { useState, ReactNode } from "react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";
import { TypeElectionStats } from "types/electionTypes";
import { useApp } from "context/AppContext";
import { VotesStatsGeneral, docVotesStatsGeneral } from "reports/VotesStatsGeneral";

type PropsTabStatsGeneral = {
  stats: TypeElectionStats;
  isPrivate: boolean;
};

export default function TabStatsGeneral({ isPrivate, stats }: PropsTabStatsGeneral) {
  const { school } = useApp();

  function getDocumentRendered() {
    return docVotesStatsGeneral({ stats, school });
  }

  return <div>
    <RenderIf isTrue={isPrivate}>
      <SectionGeneratePdf getDoc={getDocumentRendered} />
    </RenderIf>
    <VotesStatsGeneral stats={stats} />
  </div>
}

type PropsSectionGeneratePdf = {
  getDoc: () => React.ReactElement<ReactPDF.DocumentProps>;
}

function SectionGeneratePdf({ getDoc }: PropsSectionGeneratePdf) {
  const [element, setElement] = useState<ReactNode | null>(null);

  const getPdfDownloadLink = () => {
    const element = <PDFDownloadLink document={getDoc()}>
      {({ blob, loading, error, url }) =>
        (loading ? 'Generando documento' : 'Descargar Pdf')
      }
    </PDFDownloadLink>
    return setElement(element);
  }

  if (element) {
    return <React.Fragment>
      {element}
    </React.Fragment >
  }

  return <Button onClick={getPdfDownloadLink} label="Generar PDF" />
}