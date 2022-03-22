export interface User {
  username:string
  email: string
  password: string
}

export interface Post {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

export interface CreateResponse {
  name:string
}
