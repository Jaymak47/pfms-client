import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const AgriliveFishDevStrategies = () => {
  return (
    <div>
      <Row className="m-3">
        <h6>The strategic priorities of the sector/sub-sector</h6>
        <Table striped bordered hover>
          <thead className="tablestlyles">
            <tr>
              <th>Sub-sector</th>
              <th>Development Needs</th>
              <th>Priorities</th>
              <th>Strategies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Agriculture</td>
              <td>Water harvesting for crop production</td>
              <td>
                Development and expansion of land under irrigation and water
                infrastructure
              </td>
              <td>
                Establish/ expand irrigation schemes Promotion climate smart
                agriculture technologies Promotion of water harvesting
                technology
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Reduction of pre and post-harvest losses</td>
              <td>Control for pest and diseases food reserves/storage</td>
              <td>
                {" "}
                Establishing agro processing technologies Integrated pest
                management (IPM)
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Enhance access to farm inputs</td>
              <td>
                Subsidies for inputs (certified seeds, fertilizers, pesticides
                and equipment) Targeting resource poor farmers
              </td>
              <td>
                {" "}
                Capacity building Organising for change(cooperatives) and
                linking to private stockist
              </td>
            </tr>
          </tbody>
          <thead></thead>
        </Table>
      </Row>
    </div>
  );
};

export default AgriliveFishDevStrategies;
