import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '../config';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="sm">
        <Link href="/">
          <NavLink className="text-dark fw-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link href="/signin">
                <NavLink>Signin</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signup">
                <NavLink>Signup</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
