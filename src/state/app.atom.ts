import { atom } from "recoil";
import { setData } from "../utils/manage.utils";

export interface AppState {
    page: 'records' | 'record'
    // record: any[]
}


export const AppState = atom<AppState>({
    key: 'APP_STATE',
    default: {
        page: 'records'
    }
})