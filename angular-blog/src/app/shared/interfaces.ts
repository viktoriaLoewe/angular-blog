export interface User {
  // id: string
  // username:string
  email: string
  password: string
  // returnSecureToken: boolean
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
