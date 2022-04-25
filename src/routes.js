import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import DashBoard from "./components/dashboard";
import CountyMission from "./components/county/countymission";
import CountyVision from "./components/county/countyvision";
import CountyGoals from "./components/county/countygoals";
import Roles from "./components/accounts/roles";
import Department from "./components/accounts/department";
import AddProject from "./components/projects/addproject";
import EditProject from "./components/projects/editProject";
import Projects from "./components/projects/projects";
import AddActivity from "./components/activities/addactivity";
import EditActivity from "./components/activities/editactivity";
import Activities from "./components/activities/activities";
import EditTarget from "./components/targets/edittarget";
import AddTraining from "./components/trainings/addtraining";
import EditTraining from "./components/trainings/edittraining";
import Trainings from "./components/trainings/trainings";
import SelfAppraisal from "./components/appraisals/selfappraisal";
import SupervisorAppraisal from "./components/appraisals/supervisorappraisal";
import SupervisorAppraisees from "./components/appraisals/supervisorappraisees";
import CommitteeAppraisal from "./components/appraisals/committeeappraisal";
import Appraisals from "./components/appraisals/appraisals";
import AppraisalReviewMeeting from "./components/appraisals/appraisalreviewmeeting";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import EditDepartment from "./components/accounts/editdepartment";
import JobGroup from "./components/accounts/jobgroup";
import EditJobGroup from "./components/accounts/editjobgroup";
import Designation from "./components/accounts/designation";
import EditDesignation from "./components/accounts/editdesignation";
import AgriliveFishDev from "./components/county/subsectors/agrilivefishdev";
import WaterEnergyEnv from "./components/county/subsectors/waterenergyenv";
import HealthServices from "./components/county/subsectors/healthservices";
import LandsUrbanPlanning from "./components/county/subsectors/landurbanplanning";
import TourisimWildlifeTrade from "./components/county/subsectors/tourismwildlifetrade";
import EducationVocationalTraining from "./components/county/subsectors/educationvocationaltraining";
import FinanceEconomicPlanning from "./components/county/subsectors/financeeconomicplanning";
import OfficeofGovDpGov from "./components/county/subsectors/officeofgovdpgov";
import CountyAssembley from "./components/county/subsectors/countyassembley";
import AddActivityTask from "./components/activities/addactivitytask";
import Tasks from "./components/activities/tasks";
import Targets from "./components/targets/targets";
import StaffReponse from "./components/appraisals/staffresponse";
import Register from "./components/accounts/registarstaff";
import AuthRoute from "./utils/AuthRoute";

import Users from "./components/accounts/users";
import PerformanceContracts from "./components/projects/contracts";
import JointReview from "./components/appraisals/jointreview";
import CountyserviceBoard from "./components/appraisals/countyserviceboard";
import SupervisorResponse from "./components/appraisals/supervisorresponse";
import Employees from "./components/accounts/users";
import TargetReview from "./components/targets/targetreviews";
import SupervisorjointreviewAppraisee from "./components/appraisals/supervisorjointreviewappraisee";

function PfmsRoutes() {
  return (
    <div className="maintemplate">
      <Switch>
        {/* Main DashBoard */}

        <AuthRoute path="/dashboard" component={DashBoard} />
        <Route path="/login" component={Login} />
        <Redirect from="/" exact to="/login" />

        {/* County Goals */}
        <AuthRoute exact path="/countymission" component={CountyMission} />
        <AuthRoute path="/countyvision" component={CountyVision} />
        <AuthRoute path="/countyGoals" component={CountyGoals} />

        {/* SubSector Goals */}
        <AuthRoute path="/agrilivefishdev" component={AgriliveFishDev} />
        <AuthRoute path="/waterenergyenv" component={WaterEnergyEnv} />
        <AuthRoute path="/healthservices" component={HealthServices} />
        <AuthRoute path="/landsurbanplanning" component={LandsUrbanPlanning} />
        <AuthRoute
          path="/tourismwildlifetrade"
          component={TourisimWildlifeTrade}
        />
        <AuthRoute
          path="/educationvocationaltraining"
          component={EducationVocationalTraining}
        />
        <AuthRoute
          path="/fiananceeconomicplanning"
          component={FinanceEconomicPlanning}
        />
        <AuthRoute path="/officeofgovdpgov" component={OfficeofGovDpGov} />
        <AuthRoute path="/countyassembley" component={CountyAssembley} />

        {/* County Employees Sectors & Departments */}
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute path="/employees" component={Employees} />
        <AuthRoute path="/roles" component={Roles} />
        <AuthRoute path="/departments" component={Department} />
        <AuthRoute
          exact
          path="/department/:departmentId"
          component={EditDepartment}
        />
        <AuthRoute path="/designations" component={Designation} />
        <AuthRoute
          path="/designations/:designationId"
          component={EditDesignation}
        />
        <AuthRoute path="/jobgroups" component={JobGroup} />
        <AuthRoute path="/jobgroup/:jobgroupId" component={EditJobGroup} />

        {/* Sub Sector Routes */}

        {/* County Programmes Projects Targets Workplans and  Activities Training */}
        <AuthRoute path="/addproject" component={AddProject} />
        <AuthRoute path="/projects" component={Projects} />
        <AuthRoute path="/contracts" component={PerformanceContracts} />
        <AuthRoute path="/project/:projectId" component={EditProject} />
        <AuthRoute path="/addactivity" component={AddActivity} />
        <AuthRoute path="/editactivity" component={EditActivity} />
        <AuthRoute path="/activities" component={Activities} />
        <AuthRoute
          exact
          path="/activity/:activityId"
          component={EditActivity}
        />
        <AuthRoute path="/addtasks" component={AddActivityTask} />
        <AuthRoute path="/tasks" component={Tasks} />
        <AuthRoute path="/task/:taskId" component={EditActivity} />
        <AuthRoute path="/edittarget" component={EditTarget} />
        <AuthRoute path="/targets" component={Targets} />
        <AuthRoute path="/targetreviews" component={TargetReview} />
        <AuthRoute path="/target/:targetId" component={EditTarget} />
        <AuthRoute path="/addtraining" component={AddTraining} />
        <AuthRoute path="/edittraining" component={EditTraining} />
        <AuthRoute path="/trainings" component={Trainings} />
        <AuthRoute path="/training/:trainingId" component={EditTraining} />

        {/* Staff Appraisal Feedback and Rewvies */}

        <AuthRoute path="/selfappraisal" component={SelfAppraisal} />
        <AuthRoute path="/staffresponse" component={StaffReponse} />
        <AuthRoute path="/supervisorresponse" component={SupervisorResponse} />
        <AuthRoute
          path="/supervisorappraisees"
          component={SupervisorAppraisees}
        />
        <AuthRoute
          path="/supervisorappraisalsjointreviews"
          component={SupervisorjointreviewAppraisee}
        />
        <AuthRoute path="/jointreview/:id" component={JointReview} />
        <AuthRoute
          path="/appraisalreviewmeeting"
          component={AppraisalReviewMeeting}
        />
        {/* General Routes */}

        <AuthRoute
          path="/supervisorappraisal/:id"
          component={SupervisorAppraisal}
        />
        <AuthRoute path="/committeeappraisal" component={CommitteeAppraisal} />
        <AuthRoute path="/countyserviceboard" component={CountyserviceBoard} />
        <AuthRoute path="/appraisals" component={Appraisals} />
        <AuthRoute path="/not-Found" component={NotFound} />
        <Redirect to="/not-Found" />
      </Switch>
      <Footer />
    </div>
  );
}

export default PfmsRoutes;
