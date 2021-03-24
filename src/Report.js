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

export default function Report() {
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
  const query = sprRef.orderBy("createdAt", "asc").limitToLast(100);
  const [currentData] = useCollectionData(query, { idField: "id" });

  useEffect(() => {
    if (currentData) {
      let d = currentData.map((d, i) => {
        console.log("request", d.description);
        return <DataRow data={d} i={i} onDeleteClick={handleDelete} />;
      });
      setData(d);
    }
  }, [currentData]);

  const handleDelete = (id) => {
    console.log("handleDeleteClick in Request", id);
    if (window.confirm("Are you sure to delete this record?"))
      sprRef.doc(id).delete();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Reports</h1>
        </Col>
      </Row>
      <Table className="mt-2" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>Reason</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    </Container>
  );
}
function DataRow(props) {
  let d = props.data;
  let i = props.i;
  return (
    <tr>
      <td>
        <BsTrash onClick={() => props.onDeleteClick(d.id)} />
      </td>
      <td>{d.name}</td>
      <td>{d.phone}</td>
      <td>{d.arrivalTime}</td>
      <td>{d.departureTime}</td>
      <td>{d.reason}</td>
      <td>{format(d.createdAt.toDate(), "yyyy-MM-dd")}</td>
    </tr>
  );
}
