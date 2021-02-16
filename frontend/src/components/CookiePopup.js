import React from "react";
import {
  Modal,
  Button,
  Accordion,
  Card,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";

function CookiePopup(props) {
  const cookieTerms = [
    {
      id: 1,
      type: "Performance Cookies",
      explanation:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.    All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
    },
    {
      id: 2,
      type: "Functional Cookies",
      explanation:
        "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.    If you do not allow these cookies then some or all of these services may not function properly.",
    },
    {
      id: 3,
      type: "Targeting Cookies",
      explanation:
        "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.    They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.",
    },
  ];
  return (
    <Modal
      dialogClassName='modal-0w'
      {...props}
      size='bg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      backdrop='static'
    >
      <Modal.Header>
        <h3>Manage Your Privacy</h3>
      </Modal.Header>
      <Modal.Body className='cookie-form'>
        <p>
          When you use this site, you give us permission to access and use
          information about your device for the following purposes. By clicking
          'Accept All' you agree to these purposes.You can learn more and manage
          your choices. You can update your choices at any time by clicking on
          the 'Cookie Policy' link at the bottom of your screen.
        </p>
      </Modal.Body>
      <Modal.Footer className='cookie-footer'>
        <Container>
          <Accordion defaultActiveKey='0'>
            <Accordion.Toggle
              as={Button}
              variant='outline-secondary'
              eventKey='1'
            >
              Manage Settings
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Form className='cookie-form font-weight-normal'>
                <Accordion>
                  {cookieTerms.map((term) => {
                    return (
                      <Card key={term.id}>
                        <Card.Header
                          className='toggle-btn d-flex justify-content-center'
                          variant='outline-secondary'
                        >
                          <Accordion.Toggle
                            as={Button}
                            eventKey={term.id}
                            variant='outline-secondary'
                          >
                            <Form.Label style={{ marginRight: 22 }}>
                              {term.type}
                            </Form.Label>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={term.id}>
                          <Container>
                            <Row style={{ padding: 15 }}>
                              <Col className='font-weight-bold' sm={10}>
                                Allow {term.type}
                              </Col>
                              <Col sm={2}>
                                <Form.Check type='switch' id={term.type} />
                              </Col>
                            </Row>
                            <Row style={{ padding: 15 }}>
                              {term.explanation}
                            </Row>
                          </Container>
                        </Accordion.Collapse>
                      </Card>
                    );
                  })}
                  <Card>
                    <Button
                      fluid='true'
                      eventKey='1'
                      onClick={() => props.onHide(false)}
                      size='sm'
                      variant='outline-info'
                    >
                      Save and Exit
                    </Button>
                  </Card>
                </Accordion>
              </Form>
            </Accordion.Collapse>
          </Accordion>
        </Container>
        <Card>
          <Button variant='primary' onClick={() => props.onHide(false)}>
            Accept All
          </Button>
        </Card>
      </Modal.Footer>
    </Modal>
  );
}
export default CookiePopup;
