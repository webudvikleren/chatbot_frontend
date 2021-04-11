import {
  ANSWER_FETCHING,
  ANSWER_FETCHING_ERROR,
  ANSWER_FETCHING_SUCCESS,
  ADD_USER_ANSWER,
  RESET_MESSAGE_LIST,
  MESSAGE_LIST_UPDATED_HANDLED
} from '../../ActionTypes/Chatbot';
import { postCourseData, generateUrl } from '../../../Components/CoursesDashboard/request';

const generateMessageObject = (data, type) => {
  return {
    type,
    data
  }
}

export const resetMessageList = () => {
  return {
    type: RESET_MESSAGE_LIST
  }
}

export const getAnswer = (question, courseId, userId, initialHistoryId=0, contextId=0, type=0) => {
  return async dispatch => {
    dispatch({
      type: ANSWER_FETCHING
    });

    try {
      if ( type === "question" ) {
        type = 1;
        question = JSON.stringify(question);
      }
      let query = generateUrl('/bot/getanswer', { userId, courseId, contextId, initialHistoryId, question, type });

      const data = await postCourseData(query);

      dispatch({
        type: ANSWER_FETCHING_SUCCESS,
        message: generateMessageObject(data, "bot")
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

const scrollToBottom = (element) => {
  if ( element ) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export const handleMessageListUpdated = (element) => {
  scrollToBottom(element.current);
  return {
    type: MESSAGE_LIST_UPDATED_HANDLED
  }
}