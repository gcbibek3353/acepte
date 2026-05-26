import { Prisma } from "@/generated/prisma"

export type WriteEssayListItem = Prisma.WriteEssayQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type WriteEssayDetail = Prisma.WriteEssayQuestionGetPayload<{
  include: {
    answers: {
      include: {
        user: {
          select: {
            id: true
            name: true
            email: true
          }
        }
      }
    }
    bookmarks: true
  }
}>

export type SummarizeWrittenTextListItem = Prisma.SummarizeWrittenTextQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type SummarizeWrittenTextDetail = Prisma.SummarizeWrittenTextQuestionGetPayload<{
  include: {
    answers: {
      include: {
        user: {
          select: {
            id: true
            name: true
            email: true
          }
        }
      }
    }
    bookmarks: true
  }
}>

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
