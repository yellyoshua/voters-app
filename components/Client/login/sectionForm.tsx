import { ReactElement, FormEvent, useState, MouseEvent, ChangeEvent } from "react";
import styled from "@emotion/styled";
import Idukay from "./apps/idukay";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Form = styled.form`
  max-width: 350px;
`;

const LoginOptions = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-auto-columns: max-content;
  justify-content: center;
`;

const SubmitWithLostPassword = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  a {
    margin: auto 0;
    font-size: 14px;
    text-align: center;
  }

  button {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const ColorButton = styled(Button)`
  background: #212F7A;

  &:hover, &:active {
    background: #314ff1;
  }
`;

const SectionForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  @media (max-width: 600px) {
    ${Form} {
      max-width: 300px;
    }
    ${SubmitWithLostPassword} {
      grid-template-columns: 1fr 1.5fr;
    }
  }
  @media (max-width: 340px) {
    ${Form} {
      padding: 0px 20px;
    }
  }
`;

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  isValidating: boolean;
  message: string | null;
}

export default (): ReactElement => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
    isValidating: false,
    message: null
  });

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ post: values })
  };

  return <SectionForm>
    <Form onSubmit={submitPost}>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center"
        }}
      >
        Iniciar sesi&oacute;n
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
      <LoginOptions>
        <Idukay />
      </LoginOptions> */}
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
      <FormControl
        fullWidth
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <InputLabel htmlFor="standard-adornment-password">Correo</InputLabel>
        <Input
          fullWidth
          id="field-email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
        />
      </FormControl>

      <FormControl
        fullWidth
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <InputLabel htmlFor="standard-adornment-password">Contrase&ntilde;a</InputLabel>
        <Input
          fullWidth
          id="field-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <SubmitWithLostPassword>
        <a href="/login/recovery">Olvid&eacute; mi contrase&ntilde;a</a>
        <ColorButton
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Iniciar sesi&oacute;n
        </ColorButton>
      </SubmitWithLostPassword>
    </Form>
  </SectionForm>;
}