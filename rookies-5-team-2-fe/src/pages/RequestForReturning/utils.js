import moment from 'moment';
import { 
  ASSIGNMENTSTATE_WFA,
  ASSIGNMENTSTATE_ACT,
  ASSIGNMENTSTATE_WFR,
  ASSIGNMENTSTATE_COM,
  ASSIGNMENTSTATE_DEC,
 } from '../../constants';

export const dateToString = (date) => {
  if (date === null) return null;
  return moment(date, true).format("DD/MM/yyyy");
}

export const mapState = (data) => {
  let result = "";
  switch (data) {
    case ASSIGNMENTSTATE_WFR:
      result = "Waiting for returning";
      break;
    case ASSIGNMENTSTATE_COM:
      result = "Completed";
      break;
    case ASSIGNMENTSTATE_WFA:
      result = "Waiting for acceptance";
      break;
    case ASSIGNMENTSTATE_ACT:
      result = "Accepted";
      break;
    case ASSIGNMENTSTATE_DEC:
      result = "Declined";
      break;
    default:
      result = "Invalid state";
  }
  return result;
};