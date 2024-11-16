import React from "react";
import Link from "next/link";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

interface LayoutProps {
  children: React.ReactNode;
  links: LayoutLink[];
}

const Layout: React.FC<LayoutProps> = ({ children, links }) => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
	<Container>
          <Navbar.Brand href="/">toiflow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
	      {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  href={link.path}
                  className={link.disabled ? "disabled" : ""}
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
	</Container>
      </Navbar>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
