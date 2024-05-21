import { useState, useEffect } from 'react'
import bg from "../assets/bg.jpg"
import correctAnswerImg from "../assets/Check_round_fill.svg"
import wrongAnswerImg from "../assets/Close_round_fill.svg"
import { generateQuize } from "./questions" 


const IndexButton = ({ index, currentIndex, updateCurrentIndex }) => {
  return (
    <button className={`w-9 h-9 rounded-full text-sm font-semibold text-[#E2E4F3] ${ index <= currentIndex ? 'bg-gradient-to-r from-[#E65895] to-[#BC6BE8]' : 'bg-[#393F6E]' }`} 
            onClick={() => { index !== currentIndex && updateCurrentIndex(index)  }}>
      {index+1}
    </button>
  )
}


const Answers = ({ answer, options, currentIndex, updateCurrentIndex }) => {
  const [answerHandler, setAnswerHandler] = useState('') 

  const updateAnswerHandler = (answerHandler) => {
    setAnswerHandler(answerHandler)
  }

  return (
    <div className='w-2/3 grid grid-cols-2 grid-rows-2 place-items-center gap-5'>
      {options.map((choice, idx) => ( <ChoiceButton key={idx} answer={answer} choice={choice} answerHandler={answerHandler} updateAnswerHandler={updateAnswerHandler} currentIndex={currentIndex} updateCurrentIndex={updateCurrentIndex}/> ))}
    </div>
  )
}


const ChoiceButton = ({answer, choice, answerHandler, updateAnswerHandler, currentIndex, updateCurrentIndex}) => {
  const [resultAnswer, setResultAnswer] = useState(null)
  
  const handleClick = () => {
    setResultAnswer(answer === choice)
    updateAnswerHandler('clicked')

    setTimeout(() => {
      setResultAnswer(null)
      updateAnswerHandler('')
      updateCurrentIndex(currentIndex+1)
    }, 3000);
  }

  return (
    <button onClick={() => {handleClick()}} disabled={answerHandler === 'clicked'} className={`w-full bg-[#393F6E] flex justify-center gap-x-2 px-4 py-5 rounded-xl focus:outline-none font-bold text-[#E2E4F3] text-sm hover:bg-gradient-to-r hover:from-[#E65895] hover:to-[#BC6BE8] ${resultAnswer !== null ? ' bg-gradient-to-r from-[#E65895] to-[#BC6BE8] ' : ''}`} >
      {choice}
      {resultAnswer !== null && resultAnswer === false && <img src={wrongAnswerImg} alt="wrong Answer Image" />}
      {answerHandler === 'clicked' && answer === choice && <img src={correctAnswerImg} alt="correct Answer Image" />}
    </button>
  )
}





const LandingPage = () => {
  // states
  const [data, setData] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState([])
  
  
  const updateCurrentIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        setData(data)
        setQuizQuestions(generateQuize(data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    
  }, []);
  


  return (
    <div className="w-full h-full bg-cover bg-no-repeat flex justify-center items-center font-Be_Vietnam_Pro" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-3/5 h-3/5 bg-[#343964] rounded-xl p-8 flex flex-col justify-around items-center gap-y-2">
        <div>
          <p className='text-[#8B8EAB] text-sm text-center mb-3'>Country Quiz</p>
          <div className='flex gap-x-2 flex-wrap justify-center'>
            {quizQuestions.map( ( item, index) => <IndexButton key={index} index={index} currentIndex={currentIndex} updateCurrentIndex={updateCurrentIndex}/>)}
          </div>
        </div>
        {quizQuestions[currentIndex] && (
        <>
          <p className='w-1/2 h-14 text-lg font-semibold text-[#E2E4F3] text-center'>{quizQuestions[currentIndex].question}</p>
          <Answers answer={quizQuestions[currentIndex].answer} options={quizQuestions[currentIndex].options} currentIndex={currentIndex} updateCurrentIndex={updateCurrentIndex}/> 
        </>
        )}
      </div>
    </div>
  )
}

export default LandingPage