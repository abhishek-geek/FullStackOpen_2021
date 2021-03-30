import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handle={()=>{
        setGood(good+1)
        setAll(all+1)
      }} text="good" />
      <Button handle={()=>{
        setNeutral(neutral+1)
        setAll(all+1)
        }} text="neutral" />
      <Button handle={()=>{
        setBad(bad+1)
        setAll(all+1)
      }} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

const Statistics = ({good, neutral, bad, all}) => {

  const average = (good, neutral, bad, all) => 
    (good*1 + neutral*0 + bad*-1) / all
  
  const positive = (good, all) =>
    (good/all)*100

  if(all === 0) 
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  return (
    <>
      <h1>statistics</h1>

      <table>
        <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={average(good, neutral, bad, all)}/>
        <Statistic text="positive" value={positive(good, all)+" %"}/>
        </tbody>
      </table>

    </>
  )
}

const Statistic = ({text, value}) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Button = ({handle, text}) => 
  <button onClick={handle}>{text}</button>

export default App