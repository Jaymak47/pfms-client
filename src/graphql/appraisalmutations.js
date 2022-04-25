import { gql } from "@apollo/client";

//Add Component Project
export const ADD_APPRAISAL_REVIEW_MEEETING = gql`
  mutation createAppraisalReviewMeeting(
    $meetingno: String!
    $meetingdate: String!
    $meetingtitle: String!
    $memberspresent: String!
    $meetingnotes: String!
  ) {
    createAppraisalreviewMeeting(
      CreateAppraisalreviewMeetingInput: {
        meetingno: $meetingno
        meetingdate: $meetingdate
        meetingtitle: $meetingtitle
        memberspresent: $memberspresent
        meetingnotes: $meetingnotes
      }
    ) {
      id
      meetingno
      meetingdate
      meetingtitle
      memberspresent
      meetingnotes
      createdAt
    }
  }
`;
