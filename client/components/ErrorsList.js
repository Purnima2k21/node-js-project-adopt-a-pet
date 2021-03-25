import React from "react"
import _ from "lodash"

const ErrorsList = (props) => {
  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map((field) => {
      index++
      return (
        <li key={index}>
          {_.startCase(_.camelCase([field]))}: {props.errors[field]}
        </li>
      )
    })
    return (
      <div className="callout alert">
        <ul className="no-bullets">{listItems}</ul>
      </div>
    )
  }
  return ""
}

export default ErrorsList
