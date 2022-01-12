import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, [])

  //fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

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

  //update feedback item
  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? {...item, ...updatedItem} : item))
    )
  }

  return <FeedbackContext.Provider value={{
    feedback, 
    feedbackEdit,
    isLoading,
    deleteFeedback, 
    addFeedback, 
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;
