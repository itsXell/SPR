import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { format } from "date-fns";
import { BsPlus, BsTrash, BsPencil, BsFileEarmarkDiff } from "react-icons/bs";
import { useForm } from "react-hook-form";

// Firebase
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
}
const firestore = firebase.firestore();
const auth = firebase.auth();

export default function Request() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit } = useForm();
  const [newData, setNewData] = useState({
    id: null,
    name: "",
    phone: "",
    arrivalTime: "",
    departureTime: "",
    reason: "",
    createAt: new Date(),
  });

  const sprRef = firestore.collection("request");
  const query = sprRef.orderBy("createAt", "asc").limitToLast(100);
  const [currentData] = useCollectionData(query, { idField: "id" });

  const onSubmit = async (data) => {
    let prepareData = {
      name: data.name,
      phone: data.phone,
      arrivalTime: data.arrive,
      departureTime: data.departure,
      reason: data.reason,
      createdAt: new Date(),
    };
    console.log(prepareData);
    await sprRef
      .add(prepareData)
      .then(() => console.log("New record has been added."))
      .catch((error) => {
        console.error("Errror:", error);
        alert(error);
      });
    handleClearForm();
  };

  const handleClearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setNewData({
      id: null,
      name: "",
      phone: "",
      arrivalTime: "",
      departureTime: "",
      reason: "",
      createAt: new Date(),
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <h1>Request</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="name">Name</label>
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Name"
              ref={register}
              name="name"
              id="name"
              defaultValue={data.name}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="phoneNumber">Phone Number</label>
          </Col>
          <Col>
            <input
              type="number"
              placeholder="Phone Number"
              ref={register}
              name="phone"
              id="phone"
              defaultValue={data.phone}
              minLength={10}
              maxLength={10}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="arrival time">Arrival Time</label>
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Arrival Time"
              ref={register}
              name="arrive"
              id="arrive"
              defaultValue={data.arrivalTime}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="description">Departure Time</label>
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Departure TIme"
              ref={register}
              name="departure"
              id="departure"
              defaultValue={data.departureTime}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="reason">Reason</label>
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Reason"
              ref={register}
              name="reason"
              id="reason"
              defaultValue={data.reason}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="description"></label>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Request
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
