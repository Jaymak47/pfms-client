import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Row } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/menubar";
import PfmsRoutes from "./routes";
import { AuthProvider } from "./context/auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Row className="m-2">
          <MenuBar />
        </Row>

        <PfmsRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
