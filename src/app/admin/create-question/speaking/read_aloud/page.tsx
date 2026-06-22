import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "create speaking questions",
  description : "Page to create speaking questions for the admin",
  keywords : ["PTE" , "admin" , "speaking"],
  openGraph : {  //fields that I want to show in whatsapp , facebook , and all while displaying the link
    title : " acepte",
    description : "Practice english speaking ",
    siteName : "acepte.vercel.app",
    locale : "en_US",
    images : ["example.com"]
  },
  robots : {
    index : true,  // will index my site by the crawlers
    follow : true,  // visit all the links present in this page 
    nocache : false,  // whether to use cached data or fetch new data by the crawlers
    googleBot : {
      // instructions related to google bot only . not necessary for most of the parts
    }, 

  }
}

const CreateReadAloudQuestion = () => {
  return (
    <div>CreateReadAloudQuestion</div>
  )
}

export default CreateReadAloudQuestion