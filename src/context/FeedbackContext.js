import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  //to delete feedback
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete this?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  // to add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{
    feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;
