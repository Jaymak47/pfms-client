import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useMutation } from "@apollo/client";
import {
  Row,
  Col,
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import "semantic-ui-css/semantic.min.css";
import { LOAD_APPRAISAL_REVIEW_MEETING } from "../../graphql/appraisalqueries";
import { ADD_APPRAISAL_REVIEW_MEEETING } from "../../graphql/appraisalmutations";
import LeftMenusGeneral from "../leftmenusgeneral";
import { useForm } from "../../utils/hooks";

const CountyserviceBoard = () => {
  const user = useContext(AuthContext);
  const [Addrecord, setAddRecord] = useState("");
  const { onChange, onSubmit, values, validated } = useForm(
    createAppraisalReviewMeetingCallback,
    {
      meetingno: "",
      meetingtitle: "",
      memberspresent: "",
      meetingdate: "",
      meetingnotes: "",
    }
  );

  const [createAppraisalReviewMeeting, { error }] = useMutation(
    ADD_APPRAISAL_REVIEW_MEEETING,
    {
      variables: values,

      update(proxy, result) {
        setAddRecord(
          `A new Department: ${values.meetingtitle} successfully added to the System `
        );
        const data = proxy.readQuery({
          query: LOAD_APPRAISAL_REVIEW_MEETING,
        });
        data.getAppraisalReviewMeeting = [
          result.data.createAppraisalReviewMeeting,
          ...data.getAppraisalReviewMeeting,
        ];
        proxy.writeQuery({ query: LOAD_APPRAISAL_REVIEW_MEETING, data });
        values.meetingno = "";
        values.memberspresent = "";
        values.meetingdate = "";
        values.meetingnotes = "";
        values.title = "";
      },
      onError(err) {
        if (err) {
          // console.log(err.networkError.result.errors);
          return error;
        }
      },
    }
  );

  function createAppraisalReviewMeetingCallback() {
    createAppraisalReviewMeeting();
  }

  const {
    meetingno,
    meetingdate,
    meetingtitle,
    memberspresent,
    meetingnotes,
    reward,
    sanction,
    remarks,
  } = values;
  return (
    <div>
      <Row>
        <Row className="m-4"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9">
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Row className="m-5">
                <h2>County Public Service Board</h2>

                <div className="sectiondescription">
                  <h6 className="leading">
                    The Departmental Performance Management Committee report
                    shall be submitted to the County Public Service Board at the
                    end of appraisal period
                  </h6>
                </div>
              </Row>
              <Row className="adddataform m-3">
                <Row className="m-3 ">
                  <Col></Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text>Meeting No--</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="meetingno"
                          name="meetingno"
                          value={meetingno}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Meeting Date--</InputGroup.Text>
                      <FormControl
                        required
                        type="date"
                        name="meetingdate"
                        value={meetingdate}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mx-auto">
                    <InputGroup>
                      <InputGroup.Text>Members Present--</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        name="memberspresent"
                        value={memberspresent}
                        as="textarea"
                        rows={3}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="m-3">
                  <Form.Group as={Col} md="12" className="mx-auto">
                    <InputGroup>
                      <InputGroup.Text>Meeting Subject/Title--</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        name="meetingtitle"
                        value={meetingtitle}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="m-3">
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FormControl
                        required
                        type="text"
                        placeholder="Meeting Notes"
                        name="meetingnotes"
                        as="textarea"
                        rows={5}
                        value={meetingnotes}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="12" className="mx-auto">
                  <InputGroup>
                    <InputGroup.Text>Remarks--</InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      name="remarks"
                      value={remarks}
                      as="textarea"
                      rows={2}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="4" className="mx-auto">
                  <InputGroup>
                    <InputGroup.Text>Reward--</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      name="reward"
                      value={reward}
                      onChange={onChange}
                    >
                      <option key="1">0: Choose Reward Type</option>
                      <option value="Bonus" key="1">
                        Bonus
                      </option>
                      <option value="Recommendation Letter" key="2">
                        Recommendation Letter
                      </option>
                      <option value="promote" key="3">
                        Promote
                      </option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" className="mx-auto">
                  <InputGroup>
                    <InputGroup.Text>Other interventions --</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      name="reward"
                      value={reward}
                      onChange={onChange}
                    >
                      <option key="1">0: Choose other Interventions</option>
                      <option value="Counselling" key="2">
                        Counselling
                      </option>
                      <option value="Training" key="3">
                        Training {"&"} Development
                      </option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" className="mx-auto">
                  <InputGroup>
                    <InputGroup.Text>Sanction --</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      name="sanction"
                      value={sanction}
                      onChange={onChange}
                    >
                      <option key="1">0: Choose Sanction</option>
                      <option value="Warning" key="2">
                        Warning
                      </option>
                      <option value="Separation" key="3">
                        Separation
                      </option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Col></Col>
                <Col md="3">
                  <Button type="submit" variant="success">
                    Submit Meeting Notes
                  </Button>
                </Col>
              </Row>
              <Row className="m-3">
                {error && (
                  <div
                    className="ui error message"
                    style={{ marginBottom: 20 }}
                  >
                    <ul
                      className="list "
                      style={{
                        "text-align": "center",
                      }}
                    >
                      <li>
                        {error.networkError
                          ? "Network Error: - Error connecting to PFMS Database Server: Contact System Administrator"
                          : error.graphQLErrors[0].message}
                      </li>
                    </ul>
                  </div>
                )}

                <div className={Addrecord ? "ui success message" : null}>
                  {Addrecord ? Addrecord : null}
                </div>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default CountyserviceBoard;
