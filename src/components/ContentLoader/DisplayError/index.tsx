import React from "react";

type PropsDisplayError = { message?: string }

const defaultMessage = "Se produjo un error en el servidor";

export default function DisplayError({ message = defaultMessage }: PropsDisplayError) {
  return <div className='display-content-screen'>
    {/* className='display-content-screen-cover' */}
    <p className='display-content-screen-title'>{message}</p>
  </div>
}