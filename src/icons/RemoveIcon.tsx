import React from "react";

export default function RemoveIcon(props: { color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className='icon-svg' fill={props.color || "black"}>
      <path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>
    </svg>
  )
}