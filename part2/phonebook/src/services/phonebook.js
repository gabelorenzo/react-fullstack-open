import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

/**
 * Gets all the people from the phonebook.
 * @returns A Promise wrapping the persons array returned from the server
 */
const getAll = () => {
    return axios
      .get(baseUrl)
      .then((response) => response.data);
}

/**
 * Calls server to save a new person.
 * @param {*} newObject The object representing the person to add to the phonebook.
 * @returns A Promise wrapping the successfully created Person object.
 */
const create = newObject => {
  return axios.post(baseUrl, newObject).then((response) => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, 
  create, 
  update,
  remove
}