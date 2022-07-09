import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  router.events.on('routeChangeStart', (url) => NProgress.start());
  router.events.on('routeChangeComplete', (url) => NProgress.done());
  router.events.on('routeChangeError', (url) => NProgress.done());

  return (
    <div>
      <Navbar color="light" light expand="sm">
        <Link href="/">
          <NavLink className="text-dark fw-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar style={{ cursor: 'pointer' }} className="ms-auto">
            {!isAuth() && (
              <>
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
              </>
            )}
            {isAuth() && (
              <>
                {isAuth() && isAuth().role === 1 ? (
                  <NavItem>
                    <Link href="/admin">
                      <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Link href="/user">
                      <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink
                    onClick={() =>
                      signout(() => {
                        router.replace(`/signin`);
                      })
                    }
                  >
                    Signout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
