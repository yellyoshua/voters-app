import React from "react";
import MenuIcon from "icons/MenuIcon";
import UserIcon from "icons/UserIcon";
import ButtonMenu from "react-rainbow-components/components/ButtonMenu";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import MenuItem from "react-rainbow-components/components/MenuItem";
import MenuDivider from "react-rainbow-components/components/MenuDivider";
import useAuth from "hooks/useAuth";
import UserContext from "context/UserContext";
import "./index.css";

type PropsAppBar = {
  onToogleSidebar: () => void;
};

export default React.memo(function AppBar(props: PropsAppBar) {
  const { removeSession } = useAuth();
  const { user } = React.useContext(UserContext)!;

  return (
    <header className='react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white'>
      <img src='https://s3-us-east-2.amazonaws.com/gonzu-api-bucket/2020/09/apple-touch-icon-1.png' alt='gonzu logo' className='react-rainbow-admin_header-logo' />
      <h2>Cardenal Gonzalez Zumárraga</h2>
      <section className='rainbow-flex rainbow-align_center react-rainbow-admin_header-actions'>
        <ButtonMenu icon={<UserIcon />} assistiveText={`${user && user.username}`} menuAlignment='right' menuSize='small' title={`${user && user.username}`}>
          <li className='rainbow-p-horizontal_small rainbow-align_center rainbow-flex'>
            <div className='rainbow-m-left_x-small'>
              <p className='rainbow-font-size-text_medium rainbow-color_dark-1'>{`${user && user.username}`}</p>
              <p className='rainbow-font-size-text_small rainbow-color_gray-3'>{`${user && user.email}`}</p>
            </div>
          </li>
          <MenuDivider variant='space' />
          <MenuItem label='Editar perfil' icon={null} iconPosition='left' />
          <MenuItem label='Cerrar sesión' icon={null} onClick={removeSession} iconPosition='left' />
        </ButtonMenu>
      </section>
      <ButtonIcon onClick={props.onToogleSidebar} className='react-rainbow-admin_header-hamburger-button' size='large' icon={<MenuIcon />} />
    </header>
  );
});
