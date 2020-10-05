import React from "react";

type PropsDisplayError = { message: string };

export default React.memo(function DisplayError(props: PropsDisplayError) {
  const isNotFoundDisplay: boolean = props.message.includes("status code 404");

  if (isNotFoundDisplay) {
    return (
      <div>
        <p>No encontrado</p>
        <p>C&oacute;digo de error: 404</p>
      </div>
    );
  }

  return <div>{props.message}</div>;
});
