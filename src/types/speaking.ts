import { Prisma } from "@/generated/prisma"

export type ReadAloudListItem = Prisma.SpeakingReadAloudQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ReadAloudDetail = Prisma.SpeakingReadAloudQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type RepeatSentenceListItem = Prisma.SpeakingRepeatSentenceQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type RepeatSentenceDetail = Prisma.SpeakingRepeatSentenceQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type DescribeImageListItem = Prisma.SpeakingDescribeImageQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type DescribeImageDetail = Prisma.SpeakingDescribeImageQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type RetellLectureListItem = Prisma.SpeakingRetellLectureQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type RetellLectureDetail = Prisma.SpeakingRetellLectureQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type AnswerShortListItem = Prisma.SpeakingAnswerShortQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type AnswerShortDetail = Prisma.SpeakingAnswerShortQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type GroupDiscussionListItem = Prisma.SpeakingGroupDiscussionQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type GroupDiscussionDetail = Prisma.SpeakingGroupDiscussionQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type RespondSituationListItem = Prisma.SpeakingRespondSituationQuestionGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type RespondSituationDetail = Prisma.SpeakingRespondSituationQuestionGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
