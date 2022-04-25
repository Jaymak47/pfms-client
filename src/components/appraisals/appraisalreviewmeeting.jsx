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
  FormSelect,
} from "react-bootstrap";

import "semantic-ui-css/semantic.min.css";
import { LOAD_APPRAISAL_REVIEW_MEETING } from "../../graphql/appraisalqueries";
import { ADD_APPRAISAL_REVIEW_MEEETING } from "../../graphql/appraisalmutations";
import LeftMenusGeneral from "../../components/leftmenusgeneral";
import { useForm } from "../../utils/hooks";

const AppraisalReviewMeeting = () => {
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
    remarks,
    sanction,
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
                <h2>Supervisor-Appraisee Appraisal Review Meeting</h2>

                <div className="sectiondescription">
                  <h6 className="leading">
                    The Supervisor and Appraisee shall discuss and agree on the
                    performance evaluation and rating at the end of the
                    appraisal period and Minutes recorded on this Form
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
                        rows={10}
                        value={meetingnotes}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
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

export default AppraisalReviewMeeting;
