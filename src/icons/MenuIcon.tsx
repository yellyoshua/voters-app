import React from "react";

export default function MenuIcon(props: { color?: string }) {
  return (
    <svg viewBox='0 0 32 32' className='icon-svg' fill={props.color || "black"}>
      <path d='M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z'></path>
    </svg>
  );
}
