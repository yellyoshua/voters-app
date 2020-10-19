import React from "react";
import useTitle from "react-use/lib/useTitle";

export default function NotFound(_props: any) {
  useTitle("No encontrado 404");
  
  return (
    <div>No encontrado</div>
  )
}