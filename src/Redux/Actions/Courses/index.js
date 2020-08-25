import {
  UPDATE_TITLE,
  UPDATE_SHORT_DESCRIPTION,
  UPDATE_SECTION_NAME,
  FETCH_JSON,
  UPDATE_DESCRIPTION,
  UPDATE_QUIZ_TITLE,
  UPDATE_LEVEL,
  UPDATE_QUESTION,
  UPDATE_POSSIBLE_ANSWER,
  DELETE_COURSE,
  DELETE_DESCRIPTION,
  DELETE_LEVEL,
  DELETE_QUESTION,
  DELETE_QUIZ,
  DELETE_SECTION,
} from '../../ActionTypes/Courses';
import axios from 'axios';

export const updateTitle = (value, index) => {
  return {
    type: UPDATE_TITLE,
    value,
    index
  };
}

export const updateShortdescription = (value, index) => {
  return {
    type: UPDATE_SHORT_DESCRIPTION,
    value,
    index
  };
}

export const updateSectionname = (value, index, sectionindex) => {
  return {
    type: UPDATE_SECTION_NAME,
    value,
    index,
    sectionindex
  };
}

export const updateDescription = (value, index, sectionindex, descriptionindex, inputtype) => {
  return {
    type: UPDATE_DESCRIPTION,
    value,
    index,
    sectionindex,
    descriptionindex,
    inputtype
  };
}

export const updateQuiztitle = (value, index, sectionindex, quizindex) => {
  return {
    type: UPDATE_QUIZ_TITLE,
    value,
    index,
    sectionindex,
    quizindex
  };
}

export const updateLevel = (value, index, sectionindex, quizindex, levelindex) => {
  return {
    type: UPDATE_LEVEL,
    value,
    index,
    sectionindex,
    quizindex,
    levelindex
  };
}

export const updateQuestion = (value, index, sectionindex, quizindex, levelindex, questionindex, inputtype) => {
  return {
    type: UPDATE_QUESTION,
    value,
    index,
    sectionindex,
    quizindex,
    levelindex,
    questionindex,
    inputtype
  };
}

export const updatePossibleAnswer = (value, index, sectionindex, quizindex, levelindex, questionindex, answerindex) => {
  return {
    type: UPDATE_POSSIBLE_ANSWER,
    value,
    index,
    sectionindex,
    quizindex,
    levelindex,
    questionindex,
    answerindex
  };
}

export const deleteCourse = (courseindex) => {
  return {
    type: DELETE_COURSE,
    courseindex
  }
}

export const deleteSection = (sectionindex, courseindex) => {
  return {
    type: DELETE_SECTION,
    sectionindex,
    courseindex
  }
}

export const deleteDescription = (descriptionindex, sectionindex, courseindex) => {
  return {
    type: DELETE_DESCRIPTION,
    descriptionindex,
    sectionindex,
    courseindex
  }
}

export const deleteQuiz = (quizindex, sectionindex, courseindex) => {
  return {
    type: DELETE_QUIZ,
    quizindex,
    sectionindex,
    courseindex
  }
}

export const deleteLevel = (levelindex, quizindex, sectionindex, courseindex) => {
  return {
    type: DELETE_LEVEL,
    levelindex,
    quizindex,
    sectionindex,
    courseindex
  }
}

export const deleteQuestion = (questionindex, levelindex, quizindex, sectionindex, courseindex) => {
  return {
    type: DELETE_QUESTION,
    questionindex,
    levelindex,
    quizindex,
    sectionindex,
    courseindex
  }
}

export const fetchJson = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:8000/get_json`);
    dispatch({
      type: FETCH_JSON,
      data: response.data
    });
  }
};