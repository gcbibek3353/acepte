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
}>

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
}>

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
}>

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
}>

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
}>

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
}>

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
}>

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
