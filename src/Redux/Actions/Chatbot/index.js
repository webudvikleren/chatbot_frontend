import {
  ANSWER_FETCHING,
  ANSWER_FETCHING_ERROR,
  ANSWER_FETCHING_SUCCESS,
  ADD_USER_ANSWER
} from '../../ActionTypes/Chatbot';
import { postCourseData } from '../../../Components/CoursesDashboard/request';

const generateMessageObject = (data, type) => {
  return {
    answer: data.answer,
    nextPossibleAnswers: data.nextPossibleAnswers,
    displayData: data.displayData,
    type
  }
}

export const getAnswer = (question, course_id, context_id=null, type=null) => {
  return async dispatch => {
    dispatch({
      type: ANSWER_FETCHING
    });

    try {
      let query = '/sessions/getanswer';
      if ( type ) {
        query += `/${type}`;
      }
      const beginData = await postCourseData(query, { question, course_id, context_id });

      dispatch({
        type: ANSWER_FETCHING_SUCCESS,
        message: generateMessageObject(beginData, "bot")
      })

    } catch(error) {
      dispatch({
        type: ANSWER_FETCHING_ERROR,
        error: `Der skete en fejl ved hentning af beskeden: ${error}`
      })
    }
  }
}

export const addUserAnswer = (answer) => {
  return {
    type: ADD_USER_ANSWER,
    message: generateMessageObject(answer, "user")
  }
}