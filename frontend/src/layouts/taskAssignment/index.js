import React, { useEffect, useState } from "react";
import { Container, Card, CardTitle, CardText, Nav, NavLink, CardBody, Row, Col } from "reactstrap";
import CircularProgress from '@mui/material/CircularProgress';
// import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import DataTable from "./components/DataTable";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api";
import { tasks_view } from "../../api";
import TaskTable from "./component/TaskTable";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
// import DateAndTodoList from "./components/DateAndTodoList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, getTasks] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const toggleCreateTaskModal = () => {
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    viewAllTasks();
  }, []);

  const viewAllTasks = () => {
    tasks_view()
      .then((req) => {
        const task = req.data.results;
        getTasks(task);
        console.log(req);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const shiftSize = 7;

  const handleLogout = async () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  console.log(tasks);

  return (
    <div className="gradient-background">
      <header className="bg-dark py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white">Dashboard</h1>
            <Nav className="nav">
              <NavLink href="/dashboard" className="nav-link text-white">
                Home
              </NavLink>
              <NavLink href="/tasks" className="nav-link text-white">
                Tasks
              </NavLink>
              <NavLink href="/schedule" className="nav-link text-white">
                Schedule
              </NavLink>
            </Nav>
          </div>
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </header>

      <main>
      
        <Container className="my-4">
          <Card className="h-100 my-card">
            <CardTitle tag="h5" className="p-3">
            <Row>
    <Col md="9">
      Task Table
    </Col>
    <Col md="3" className="text-right">
      <Button className="primary card-button" onClick={toggleCreateTaskModal}>
        Create Task
      </Button>
      <CreateTaskModal isOpen={isCreateTaskModalOpen} toggle={toggleCreateTaskModal} />
    </Col>
  </Row>
            </CardTitle>
            {/* <button onClick={toggleCreateTaskModal}>Create Task</button> */}
            <CardBody>
                {isLoading ? <CircularProgress /> : <TaskTable rows={tasks} />}
            </CardBody>
            <CardText className="p-3"></CardText>
          </Card>
        </Container>
      </main>
      <footer className="bg-dark py-3">
        <Container>
          <p className="text-white text-center">Copyright © 2023</p>
        </Container>
      </footer>
    </div>
  );
};

export default Dashboard;
