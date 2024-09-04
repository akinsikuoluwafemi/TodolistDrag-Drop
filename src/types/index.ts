export interface ITodo {
  id: string
  title: string
  description: string
  done: boolean
  deadline?: Date | string
  tags?: string[]
  createdAt: Date | string
  updatedAt: Date | string
} 

// User can search tasks by their title and/or description using a search box
// User can add a deadline to a task
//  User can add tags to a task and filter tasks based on these tags
// User can sort tasks by their deadline and title
// Unit or integration tests for (some of) the functionality