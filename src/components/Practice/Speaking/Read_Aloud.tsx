'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder'

interface Read_AloudProps {
  passage: string;
}

const Read_Aloud = ({ passage }: Read_AloudProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const submitHandler = () => {
    console.log("Submitted");
    console.log(audioFile);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-sm border">
      
      <h1 className="text-xl font-semibold text-gray-800">
        Read Aloud
      </h1>

      <div className="p-4 bg-gray-50 border rounded-lg text-gray-700 leading-relaxed">
        {passage}
      </div>

      <AudioRecorder audioFile={audioFile} setAudioFile={setAudioFile} />

      <div className="flex justify-end">
        <button
          onClick={submitHandler}
          disabled={!audioFile}
          className="px-6 py-2 rounded-lg font-medium
                     bg-blue-600 text-white
                     hover:bg-blue-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      </div>
    </div>
  )
}

export default Read_Aloud
