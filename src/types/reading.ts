import { Prisma } from "@/generated/prisma"

export type FibDropdownListItem = Prisma.FillBlanksDropdownPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type FibDropdownDetail = Prisma.FillBlanksDropdownPassageGetPayload<{
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
    blanks: true
  }
}> & {
  siblings: { id: string; questionId: string }[]
}

export type FibDragDropListItem = Prisma.FillBlanksDragDropPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type FibDragDropDetail = Prisma.FillBlanksDragDropPassageGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type McmListItem = Prisma.MultipleChoiceMultiplePassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type McmDetail = Prisma.MultipleChoiceMultiplePassageGetPayload<{
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
}> & {
  siblings: { id: string; questionId: string }[]
}

export type McsListItem = Prisma.MultipleChoiceSinglePassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type McsDetail = Prisma.MultipleChoiceSinglePassageGetPayload<{
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

export type ReorderListItem = Prisma.ReorderParagraphPassageGetPayload<{
  include: {
    bookmarks: true
    answers: true
  }
}>

export type ReorderDetail = Prisma.ReorderParagraphPassageGetPayload<{
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
    paragraphs: true
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
