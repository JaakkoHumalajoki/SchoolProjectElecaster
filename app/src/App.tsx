import React from "react"

// Example typescript props usage

export interface IAppProps {
  id: string
  name: string
}

export default function App(props: IAppProps): JSX.Element {
  const { id, name } = props

  return (
    <div>
      {id} {name}
    </div>
  )
}
