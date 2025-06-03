export interface Appointment {
  id: number
  animalName: string
  breed: string
  weight: string
  service: string
  ownerName: string
  contact: string
  scheduleDate: Date
  startTime: Date
  endTime: Date
  observations: string | null
  createdAt: Date
  updatedAt: Date
}

export interface FormData {
  animalName: string
  breed: string
  weight: string
  service: string
  ownerName: string
  contact: string
  scheduleDate: string
  startTime: string
  endTime: string
  observations: string
}