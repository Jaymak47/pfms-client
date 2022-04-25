import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

const SearchBar = ({ value, name, handleChange, title }) => {
  return (
    <div>
      <Form>
        <Row className="m-3">
          <Form.Group as={Col} md="6">
            <InputGroup>
              <h1>{title}</h1>
            </InputGroup>

            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="m-3">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search.."
                name={name}
                value={value}
                onChange={handleChange}
              />
              <InputGroup.Text>
                <i className="search icon"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
