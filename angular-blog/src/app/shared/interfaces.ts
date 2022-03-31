export interface User {
  username?:string
  email: string
  password: string
  identifier?: string
}

export interface Post {
  id?: string
  title: string
  description: string
  content:string
}

export interface CreateResponse {
  name:string
}
