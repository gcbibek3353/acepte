import React from 'react'
import IndividualSpeakingAnswer from './IndividualSpeakingAnswer'

interface AnswerData {
  id: string
  userId: string
  questionId: string
  audiourl: string
  duration: number
  contentScore: number
  oralFluencyScore: number
  pronunciationScore: number
  totalScore: number
  user: {
    id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

interface SpeakingAnswerProps {
  answers: AnswerData[]
  questionId: string
  questionTitle: string
}

const SpeakingAnswer = ({ answers, questionId, questionTitle }: SpeakingAnswerProps) => {

  return (
    <div>
      <h2>Answers</h2>
      {
        answers && answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className="mb-6 p-4 border rounded-lg">
              <h3 className="text-md font-medium mb-2">Answer by: {answer.user.name} ({answer.user.email})</h3>
              <IndividualSpeakingAnswer
                questionId={questionId}
                questionTitle={questionTitle}
                audioUrl={answer.audiourl}
                contentScore={answer.contentScore}
                oralFluencyScore={answer.oralFluencyScore}
                pronunciationScore={answer.pronunciationScore}
                totalScore={answer.totalScore}
              />
            </div>
          ))
        ) : (
          <p>No answers available.</p>
        )
      }
    </div>
  )
}

export default SpeakingAnswer