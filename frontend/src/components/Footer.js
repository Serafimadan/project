import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CookiePopup from "../components/CookiePopup";

const Footer = () => {
  const cookiesFromStorage = localStorage.getItem("isCookies")
    ? JSON.parse(localStorage.getItem("isCookies"))
    : true;

  const [cookiePopup, setCookiePopup] = useState(cookiesFromStorage);
  useEffect(() => {
    localStorage.setItem("isCookies", cookiePopup);
  }, [cookiePopup]);

  const popUpCookie = () => {
    localStorage.setItem("isCookies", true);
    setCookiePopup(localStorage.getItem("isCookies"));
  };

  return (
    <footer>
      <Container>
        {cookiePopup && <CookiePopup show={true} onHide={setCookiePopup} />}

        <Row>
          <Col className='text-center py-3'>
            <span>Copyright &copy; Galileo </span> |
            <span
              onClick={(e) => popUpCookie()}
              className='cookie-policy-footer text-center py-3'
            >
              Cookie Policy
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
