import { getApiEndpoint } from ".."


const ApiTodo = {
  getAll: async () => {
    const url = `${getApiEndpoint()}/todos`
    const response = await fetch(url)
    if(response.status === 200) {
      const todos = await response.json()
      return todos
    }
    throw new Error('missing status 200 to get all todos')
  },
  create: async ({description}) => {
    const url = `${getApiEndpoint()}/todos`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description})
    })
    if(response.status === 201) {
      const {id, description, done, createdAt, updatedAt} = await response.json()
      return {id, description, done, createdAt, updatedAt}
    }
    throw new Error('missing status 201 to create a todo')
  },
  update: async ({id, description, done}) => {
    const url = `${getApiEndpoint()}/todos/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description, done})
    })
    if(response.status != 204) {
      throw new Error('missing status 204 to update a todo')
    }
  },
  del: async id => {
    const url = `${getApiEndpoint()}/todos/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response.status != 204) {
      throw new Error('missing status 204 to delete a todo')
    }
  },
  get: async ({id}) => {
    const url = `${getApiEndpoint()}/todos/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      }
    })
    if(response.status === 200) {
      const {id, description, done, createdAt, updatedAt} = await response.json()
      return {id, description, done, createdAt, updatedAt}
    }
    throw new Error('missing status 200 to get a todo')
  },
}

export default ApiTodo