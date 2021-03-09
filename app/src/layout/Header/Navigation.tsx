import React from "react"
import { NavLink } from "react-router-dom"

interface NavProps {
  to: string
  children: string
}

const StyledNavLink = ({
  to: location,
  children: text,
}: NavProps): JSX.Element => (
  <li className="list-none">
    <NavLink
      end
      to={location}
      className="navlink border-b-2 border-black border-opacity-0"
      activeClassName="border-opacity-100"
    >
      {text}
    </NavLink>
  </li>
)

export default (): JSX.Element => (
  <nav className="flex-auto flex items-center justify-end space-x-2">
    <StyledNavLink to="/">Home</StyledNavLink>
    <StyledNavLink to="weather">Weather</StyledNavLink>
    <StyledNavLink to="electricity">Electricity</StyledNavLink>
    <StyledNavLink to="analysis">Analysis</StyledNavLink>
  </nav>
)
