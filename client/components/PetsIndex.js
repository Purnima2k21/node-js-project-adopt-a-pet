import React from "react"

const PetsIndex = (props) => {
  const { petType } = props.match.params
  return <h1>List of {petType}</h1>
}

export default PetsIndex
