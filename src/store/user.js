import { makeAutoObservable } from "mobx";
import axios from 'axios'

class User {
  array = []
  constructor(){
    makeAutoObservable(this)
  }

  async addUser(nickname, phone, email, password, firstName, lastName, gender, about ) {
    await axios.patch('http://localhost:3000/users/1', {nickname, phone, email, password, firstName, lastName, gender, about})
  }

  getUser = async () => {
    const res = await axios.get(`http://localhost:3000/users`)
    this.array = [...this.array, [res.data]]
    return this.array[0][0]
  }


}

export default new User();