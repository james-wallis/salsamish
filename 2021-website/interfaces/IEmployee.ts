interface IEmployee {
  _id: string
  name: string
  urlSafeName: string
  role: string
  image: string
  description: string
  stylesOfMusic?: string[]
  typesOfDance?: string[]
}

export default IEmployee
