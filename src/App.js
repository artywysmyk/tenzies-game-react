
import Die from "./components/Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App(){
 const styles = {
       color: "green"
   }

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [numRolls, setNumRolls] = React.useState(0)
  const [time, setTime] = React.useState({
    m: 0,
    s: 0
  })
  const [timeOn, setTimeOn] = React.useState(false)
  const [bestTime, setBestTime] = React.useState(
    ()=>JSON.parse(localStorage.getItem("bestTime")) 
  ) 
  const [runInterval, setRunInterval] = React.useState()
  const [clearAll, setClearAll] = React.useState(false)
 


 /* Winning the game*/

  React.useEffect( ()=>{
    /*check if all dice are held and if all dice have the same value*/
    const allHeld = dice.every(dice=> dice.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(dice=> dice.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      setTimeOn(false)
    }
  }, [dice])


 /* starting and stopping the timer*/

React.useEffect(()=>{
  !timeOn ?
  clearInterval(runInterval) :
  setRunInterval(setInterval(()=>{
    setTime(prev => {
      return prev.s === 60 ? 
      {m: prev.m+1, s: 0} :
      {m: prev.m, s: prev.s+1}
  })
  }, 1000))
}, [timeOn])


  function displayTime(time){
    /* 00: 00 */
    return `${time.m < 10 ? "0" : ""}${time.m}:${time.s < 10 ? "0" : ""}${time.s}`
  }
  

/* Saving best time */


 React.useEffect(()=> {
  if (!tenzies){
    const best = JSON.parse(localStorage.getItem("bestTime"))
    best && setBestTime(best)
  } else {
    if(bestTime){
    const newTime = parseInt(`${time.m}${time.s}`)
    const best = parseInt(`${bestTime.m}${bestTime.s}`)
    if(newTime < best){
      localStorage.setItem("bestTime", JSON.stringify(time))
      setBestTime(time)
    }
  } else {
    localStorage.setItem("bestTime", JSON.stringify(time))
    setBestTime(time)
  } 
}
setClearAll(false)
 }, [tenzies])


function generateNewDice(){
  return {
     value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
  }
}


  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(generateNewDice()
      )
    }
    return newDice
  }


  React.useEffect( ()=>{
    if(clearAll === true){
      localStorage.removeItem("bestTime")
      console.log("storage cleared")
      setBestTime()
    } else{
      console.log("storage not cleared")
    }
  }, [clearAll])

  function clearStorage(){
    reset()
    setClearAll(true)
  }

  function reset(){
    setTenzies(false)
      setDice(allNewDice())
      setNumRolls(0)
      setTime({m:0, s:0})
      setTimeOn(false)
      /*setBestTime()*/

  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice=>oldDice.map(dice=>{
      return dice.isHeld ?
      dice :
      generateNewDice()
    }))
    setNumRolls(prev => prev + 1)
    } else {
      reset()
    }
  }

  function holdDice(id){
    setDice(oldDice=> oldDice.map(dice=>{
      return dice.id === id 
      ? {...dice, isHeld: !dice.isHeld}
      : dice
    }) )
    !timeOn && setTimeOn(true)
  }


  const diceElements = dice.map(die => <Die key={die.id} value= {die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)


    return(

            <main>
              {tenzies &&
                <Confetti
                />
              }
              <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <p className="scores">
                Rolls: {numRolls} |
                Time: {displayTime(time)} 
                {bestTime && <p style={styles}>{`| Best time: ${displayTime(bestTime)}`}</p>} 
            </p>
                <div className="dice-container">
                {diceElements}
                </div>
                <button className="roll-dice" onClick={rollDice}>{tenzies ? "Start again" : "Roll"}</button>
                <button className="reset" onClick={clearStorage}>Reset</button>
            </main>
    )
}