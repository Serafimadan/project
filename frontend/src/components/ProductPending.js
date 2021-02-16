import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Meta from "./Meta";
import ProductRejectInput from "./ProductRejectInput";
import { verifyProduct, deleteProduct } from "../actions/productActions";
import { PRODUCT_DELETE_RESET} from "../constants/productConstants"

const ProductPending = ({ product, history }) => {
  const [toggle, setToggle] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const notificationsList = useSelector((state) => state.notificationsList);
  const { notifications } = notificationsList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  const dispatch = useDispatch();

  const verifyArt = (id) => {
    const notificationId = notifications.filter(
      (not) => not.product === product._id
    );
    //notificationId[0]; to remove this notification from other experts
    dispatch(verifyProduct(id, notificationId[0]._id));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({ type: PRODUCT_DELETE_RESET })
  }, [userInfo, history, dispatch]);

  const deleteHandle = (id) => {
    dispatch(deleteProduct(id));
  };

  return userInfo && (userInfo.isExpert || userInfo._id === product.user) ? (
    <>
      {toggle && (
        <ProductRejectInput
          product={product}
          notifications={notifications}
          toggle={toggle}
          setToggle={setToggle}
          useDispatch={useDispatch}
        />
      )}
      <h1
        className={
          product.validation.status === "rejected"
            ? "text-danger"
            : "text-success"
        }
      >
        {product.validation.status}
      </h1>
      <Meta title={product.name} />
      {success && (
        <p className="bg-danger text-white p-1 d-inline-block">
          Product Deleted Successfully
        </p>
      )}
      <Row>
        <Col>
          <ListGroup.Item className="my-2">
            <Row>
              <Col xs={12} sm={8} md={9} lg={10} className="align-middle">
                {product.validation.status === "rejected" && (
                  <h4 className="m-0 p-0 border-bottom border-dark d-inline-block text-dark">
                    Rejection reason:
                  </h4>
                )}
                <h5 className="my-2 py-1">{product.validation.message}</h5>
              </Col>
              {userInfo._id !== product.user &&
                product.validation.status === "pending" && (
                  <Col xs={8} sm={4} md={3} lg={2} className="my-auto text-right">
                    <Row>
                      <Button
                        className="p-2 m-1 "
                        variant="success"
                        type="button"
                        onClick={() => verifyArt(product._id)}
                      >
                        Verify
                      </Button>
                      <Button
                        className="p-2 m-1"
                        variant="danger"
                        type="button"
                        onClick={() => setToggle(true)}
                      >
                        Rejact
                      </Button>
                    </Row>
                  </Col>
                )}
              {userInfo._id === product.user &&
                product.validation.status === "rejected" &&
                !success && (
                  <Col>
                    <Button
                      className="p-2 m-1 "
                      variant="success"
                      type="button"
                      onClick={() => deleteHandle(product._id)}
                    >
                      Remove Art
                    </Button>
                  </Col>
                )}
            </Row>
          </ListGroup.Item>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  ) : (
    <Message>This item is not available yet</Message>
  );
};

export default ProductPending;
