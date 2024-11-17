import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Nav, Navbar, Container, Button } from "react-bootstrap";


interface LayoutProps {
  children: React.ReactNode;
  links: LayoutLink[];
  mode: boolean;
  onDarkModeChange: (v: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, links, mode, onDarkModeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(mode);

  useEffect(() => {
    document.body.className = isDarkMode ? "bg-dark text-white" : "bg-light text-dark";
    onDarkModeChange(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
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
	    	            <Button onClick={toggleDarkMode} variant={isDarkMode ? "light" : "dark"}>
  {isDarkMode ? "ライトモード" : "ダークモード"}
</Button>
          </Navbar.Collapse>
	</Container>
      </Navbar>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
