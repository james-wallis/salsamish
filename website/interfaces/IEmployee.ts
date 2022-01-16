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

export const emptyEmployee: IEmployee = {
  _id: '-1',
  image: '',
  name: '',
  urlSafeName: '',
  role: '',
  description: '',
}

export default IEmployee
