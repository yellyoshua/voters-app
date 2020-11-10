import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "icons/MenuIcon";
import UserIcon from "icons/UserIcon";
import ButtonMenu from "react-rainbow-components/components/ButtonMenu";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import MenuItem from "react-rainbow-components/components/MenuItem";
import MenuDivider from "react-rainbow-components/components/MenuDivider";
import useAuth from "hooks/useAuth";
import { UserContext } from "context/UserContext";
import { useApp } from "context/AppContext";
import "./index.css";

type PropsAppBar = {
  isSidebarHidden: boolean;
  onToogleSidebar: () => void;
};

export default React.memo(function AppBar({ isSidebarHidden, onToogleSidebar }: PropsAppBar) {
  const { removeSession } = useAuth();
  const user = React.useContext(UserContext);
  const { school } = useApp();

  return (
    <header className='react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white'>
      <img src={school.schoolIcon} alt='ue-logo' className='react-rainbow-admin_header-logo' />
      <h2>{school.schoolName}</h2>
      <section className='rainbow-flex rainbow-align_center react-rainbow-admin_header-actions'>
        <ButtonMenu icon={<UserIcon />} assistiveText={`${user && user.username}`} menuAlignment='right' menuSize='small' title={`${user && user.username}`}>
          <li className='rainbow-p-horizontal_small rainbow-align_center rainbow-flex'>
            <div className='rainbow-m-left_x-small'>
              <p className='rainbow-font-size-text_medium rainbow-color_dark-1'>{`${user && user.username}`}</p>
              <p className='rainbow-font-size-text_small rainbow-color_gray-3'>{`${user && user.email}`}</p>
            </div>
          </li>
          <MenuDivider variant='space' />
          <Link to="/profile">
            <MenuItem label='Editar perfil' icon={null} iconPosition='left' />
          </Link>
          <MenuItem label='Cerrar sesión' icon={null} onClick={removeSession} iconPosition='left' />
        </ButtonMenu>
      </section>

      <ButtonIcon onClick={onToogleSidebar} className='react-rainbow-admin_header-hamburger-button' size='large' icon={<MenuIcon />} />
    </header>
  );
});
