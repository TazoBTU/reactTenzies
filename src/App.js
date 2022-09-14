import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import {useState, useEffect} from "react"
import Stopwatch from "./Stopwatch"

export default function App() {
  
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [countRolls, setCountRolls] = useState(0)
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [shake, setShake] = useState(false);
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setRunning(false)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function shakeDice () {
        // Dice begin to shake
        setShake(true)
        // Dice stop to shake after 0.269 seconds
        setTimeout(() => setShake(false), 169)
    }
    
    function rollDice() {
        shakeDice()
        if(!tenzies) {
            setRunning(true)
            setCountRolls(prevCountRolls => prevCountRolls + 1)
            setDice(oldDice => oldDice.map(die => {
                return (
                    die.isHeld ? 
                    die :
                    generateNewDie()
                )
            }))
        } else {
            setTime(0)
            setCountRolls(0)
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
            shake={shake}
        />
    ))

    // This Hook checks if the timer is running and if so updates the time.
    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);

    // Save best time and rolls on localStorage

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="stats"> 
                <Stopwatch time={time} />
                <div className="rolls-count">
                    <p>Rolls: {countRolls}</p>
                </div>
            </div>
        </main>
    )
}