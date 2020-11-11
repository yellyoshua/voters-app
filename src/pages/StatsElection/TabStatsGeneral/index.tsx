import React, { useRef, useState, useCallback, ReactNode } from "react";
import { PDFDownloadLink, Document, Page, Image, View } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import Dataset from "react-rainbow-components/components/Dataset";
import Chart from "react-rainbow-components/components/Chart";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Button from "react-rainbow-components/components/Button";

type PropsTabStatsGeneral = {
  isPrivate: boolean;
};

export default function TabStatsGeneral({ isPrivate }: PropsTabStatsGeneral) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  return <div>
    <RenderIf isTrue={isPrivate}>
      <SectionGeneratePdf pageRef={pageRef} />
    </RenderIf>
    <div ref={pageRef}>
      <div style={{ padding: 20 }}>
        <Chart
          labels={["One", "Two"]}
          type="horizontalBar"
          style={{ maxWidth: 450 }}
          legendPosition="right"
          disableCurves
        >
          <Dataset title="Data" values={[10, 20]} backgroundColor={['#fe4849', '#ff6837']} />
        </Chart>
        <Chart
          labels={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']}
          type="bar"
          style={{ maxWidth: 250 }}
          className="rainbow-m-horizontal_xx-large rainbow-m-top_x-large"
        >
          <Dataset
            title="Dataset 1"
            values={[23, 45, 123, 56, 66, 100, 30, 156]}
            backgroundColor="#1de9b6"
            borderColor="#1de9b6"
          />
        </Chart>
      </div>
    </div>
  </div>
}

type PropsSectionGeneratePdf = {
  pageRef: React.MutableRefObject<HTMLDivElement | null>;
}

function SectionGeneratePdf({ pageRef }: PropsSectionGeneratePdf) {
  const [isClicked, setIsClicked] = useState(false);
  const [element, setElement] = useState<ReactNode | null>(null);

  const getPdfDownloadLink = (pageRendered: string) => {
    return <PDFDownloadLink document={
      <Document onRender={() => {
        return {};
      }} title="Estado genernal">
        <Page >
          <View>
            <Image src={pageRendered} />
          </View>
        </Page>
      </Document>
    }>
      {({ blob, loading, error, url }) =>
        (loading ? 'Generando documento' : 'Descargar Pdf')
      }
    </PDFDownloadLink>
  }

  const getScreenshot = useCallback(function getScreenshot() {
    setIsClicked(true);
    return html2canvas(pageRef.current as HTMLDivElement)
      .then((canvas) => canvas.toDataURL('image/png'))
      .then((screenshot) => {
        return setElement(getPdfDownloadLink(screenshot));
      }).finally(() => setIsClicked(false));
  }, [pageRef]);

  if (element) {
    return <React.Fragment>
      {element}
    </React.Fragment >
  }

  return <Button onClick={getScreenshot} disabled={isClicked} label="Generar PDF" />
}