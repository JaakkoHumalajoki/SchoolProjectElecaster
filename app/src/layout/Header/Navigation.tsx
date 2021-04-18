import React from "react"
import { NavLink } from "react-router-dom"

interface MenuProps {
  navMenuOpen: boolean
  toggleNavMenu: () => void
  closeNavMenu: () => void
}

interface LinkProps {
  children: string
  menuOpen: boolean
  closeMenu: () => void
}
const NavLinks = ({
  children,
  menuOpen,
  closeMenu,
}: LinkProps): JSX.Element => {
  return (
    <>
      <div
        aria-hidden
        className={`${
          menuOpen ? "absolute inset-0 h-screen w-screen sm:hidden" : "hidden"
        }`}
        onClick={closeMenu}
      />
      <ul
        className={`items-center text-xl w-full sm:flex sm:flex-row sm:relative sm:inset-0 sm:space-y-0 sm:border-none sm:shadow-none ${
          menuOpen ? "flex-col mt-2" : "hidden"
        }`}
      >
        {children.split(" ").map((link) => (
          <li
            key={link}
            className={`list-none text-center p-2 border-b-2 border-transparent hoverAnimation ${
              menuOpen
                ? "hover:bg-gray-400 hover:bg-opacity-40"
                : "hover:border-black"
            }`}
          >
            <NavLink to={link.toLowerCase()} onClick={closeMenu}>
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

const MenuIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="h-8 w-8"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
)

export default ({
  navMenuOpen,
  toggleNavMenu,
  closeNavMenu,
}: MenuProps): JSX.Element => {
  return (
    <nav className="flex w-full sm:w-auto">
      <button
        className="sm:hidden p-2 absolute right-1 top-1"
        type="button"
        onClick={toggleNavMenu}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeNavMenu()
        }}
      >
        <MenuIcon />
      </button>
      <NavLinks menuOpen={navMenuOpen} closeMenu={closeNavMenu}>
        Weather Electricity Analysis
      </NavLinks>
    </nav>
  )
}
