
const isLocal = false
const baseURL = isLocal ? 'http://localhost:8080/quests' : 'https://boom-quests-api-tyejyrnl5a-uc.a.run.app/quests'

class QuestService {
  constructor (authorization) {
    this.authorization = authorization
  }

  get authHeaders () {
    return { Authorization: this.authorization }
  }

  async getAvailableQuests () {
    const response = await fetch(`${baseURL}/available`, { headers: this.authHeaders })
    return response.json()
  }

  async getActiveQuests () {
    const response = await fetch(`${baseURL}/active`, { headers: this.authHeaders })
    return response.json()
  }

  async getCompleteQuests () {
    const response = await fetch(`${baseURL}/complete`, { headers: this.authHeaders })
    return response.json()
  }

  async takeQuest (questId) {
    const response = await fetch(`${baseURL}/active/${questId}`, { method: 'PATCH', headers: this.authHeaders })
    return response.json()
  }

  async completeQuest (questId) {
    const response = await fetch(`${baseURL}/complete/${questId}`, { method: 'PATCH', headers: this.authHeaders })
    return response.json()
  }
}

export const questService = new QuestService('alec')
