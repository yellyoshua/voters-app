import React, { memo } from "react";
import { Link } from "react-router-dom";
import Button from "react-rainbow-components/components/Button";

type PropsDisplayNotFound = {};

export default memo(function DisplayNotFound(_: PropsDisplayNotFound) {
  return <div className='display-content-screen'>
    {/* display-content-screen-cover */}
    <p className='display-content-screen-title'>No encontrado</p>
    <div className="display-content-screen-actions">
      <div className="display-content-screen-actions-wrapper">
        <Link to="/elections">
          <Button label="Regresar" variant="brand" />
        </Link>
      </div>
    </div>
  </div>
});
