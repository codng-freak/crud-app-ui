import { SERVICE_URL } from ".";
import axios from "axios";

export function getNotesData() {
    return axios.get(
        `${SERVICE_URL}/api`
    )
}

export function saveNoteData(data) {
    return axios.post(
        `${SERVICE_URL}/api/`, data
    )
}

export function updateNoteData(data) {
    return axios.put(
        `${SERVICE_URL}/api/${data?.id}`, data
    )
}

export function deleteNoteData(id) {
    return axios.delete(
        `${SERVICE_URL}/api/${id}`
    )
}
