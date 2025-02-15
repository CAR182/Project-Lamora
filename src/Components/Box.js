import React, { useRef, useState, Fragment } from "react";

export default function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
}
