import { Prisma } from "@/generated/prisma"

export type SstListItem = Prisma.SummarizeSpokenTextQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type SstDetail = Prisma.SummarizeSpokenTextQuestionGetPayload<{
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

export type ListeningMcmListItem = Prisma.ListeningMCMPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningMcmDetail = Prisma.ListeningMCMPassageGetPayload<{
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
    options: true
    bookmarks: true
  }
}>

export type ListeningFibListItem = Prisma.ListeningFillBlankPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningFibDetail = Prisma.ListeningFillBlankPassageGetPayload<{
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
    blanks: true
    bookmarks: true
  }
}>

export type ListeningHcsListItem = Prisma.ListeningHighlightSummaryPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningHcsDetail = Prisma.ListeningHighlightSummaryPassageGetPayload<{
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

export type ListeningMcsListItem = Prisma.ListeningMCSPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningMcsDetail = Prisma.ListeningMCSPassageGetPayload<{
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

export type ListeningSmwListItem = Prisma.ListeningSelectMissingWordPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningSmwDetail = Prisma.ListeningSelectMissingWordPassageGetPayload<{
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

export type ListeningHiwListItem = Prisma.ListeningHighlightIncorrectWordsPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningHiwDetail = Prisma.ListeningHighlightIncorrectWordsPassageGetPayload<{
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
    incorrectWords: true
    bookmarks: true
  }
}>

export type ListeningWfdListItem = Prisma.ListeningWriteFromDictationPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ListeningWfdDetail = Prisma.ListeningWriteFromDictationPassageGetPayload<{
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
