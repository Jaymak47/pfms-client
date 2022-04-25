import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import LeftMenusGeneralPrivilaged from "./leftmenusgeneralprivilaged";
import LeftMenusGeneralSupervisor from "./leftmenusgeneralsupervisor";
import LeftMenusGeneralUser from "./leftmenusgeneraluser";

function LeftMenusGeneral() {
  const user = useContext(AuthContext);

  function chooserole() {
    if (user.user.role === "62286801eee4a6c17e5b1dd9") {
      return <LeftMenusGeneralPrivilaged />;
    } else if (user.user.role === "62286825eee4a6c17e5b1ddb") {
      return <LeftMenusGeneralSupervisor />;
    } else {
      return <LeftMenusGeneralUser />;
    }
  }

  const LeftmenuBar = chooserole();
  return LeftmenuBar;
}

export default LeftMenusGeneral;

function theTest(val) {
  var answer = "";
  switch (val) {
    case 1:
    case 2:
    case 3:
      answer = "Low";
      break;
    case 4:
    case 5:
    case 6:
      answer = "Mid";
      break;
    case 7:
    case 8:
    case 9:
      answer = "High";
      break;
    default:
      answer = "Massive or Tiny?";
  }
  return answer;
}

theTest(9);
