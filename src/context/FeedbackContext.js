import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
const proxy = `${process.env.REACT_APP_API_URL}`

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
    const response = await fetch(`${proxy}/feedback`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //to delete feedback
  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete this?')) {
      await fetch(`${proxy}/feedback/${id}`, { method: "DELETE" })

      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  // to add feedback
  const addFeedback = async (newFeedback) => {
    newFeedback.id = uuidv4()
    const response = await fetch(`${proxy}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`${proxy}/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? {...item, ...data} : item))
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
