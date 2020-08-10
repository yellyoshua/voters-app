import { ReactElement } from "react";
import styled from "@emotion/styled";
import FormControl from "./formControl";
import Typography from '@material-ui/core/Typography';

const RegisterOptions = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-auto-columns: max-content;
  justify-content: center;
`;

const SectionForm = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  font-weight: 600;
`;
const Container = styled.div`
  max-width: 350px;
  @media (max-width: 600px) {
    max-width: 300px;
  }
  @media (max-width: 340px) {
    padding: 0px 20px;
  }
`;

export default (): ReactElement => {
  return <SectionForm>
    <Container>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center"
        }}
      >
        Registrarme
      </Typography>
      {/* <Typography
        variant="caption"
        component="h2"
        style={{
          textAlign: "center",
          color: "grey"
        }}
      >
        Puedes iniciar sesi&oacute;n usando...
      </Typography>
      <RegisterOptions>
        <Idukay />
      </RegisterOptions> */}
      <Typography
        variant="caption"
        component="h2"
        style={{
          textAlign: "center",
          color: "grey"
        }}
      >
        o usa tu cuenta de email:
      </Typography>
      <FormControl />
    </Container>
  </SectionForm>;
}