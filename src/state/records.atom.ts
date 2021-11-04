import { atom, selector } from "recoil";
import { StateKeys } from "../types/state.type";
import { getData, setData } from "../utils/manage.utils";
import { AppState } from "./app.atom";



export const RecordsState = atom({
    key: 'RECORDS_STATE',
    default: getData(StateKeys.Records),
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((state) => setData(StateKeys.Records, state))
        }
    ]
});

export interface RecordState {
    currentRecord: string | null,
    record: any[]
}

export const RecordState = atom<RecordState>({
    key: 'RECORD_STATE',
    default: {
        currentRecord: null,
        record: []
    },
    effects_UNSTABLE: [
        ({ onSet, setSelf }) => {
            onSet((state, oldState: any) => {
                if (state.currentRecord && state.currentRecord !== oldState.currentRecord) {
                    // setTimeout(() => {
                        setSelf(() => ({
                            currentRecord: state.currentRecord,
                            record: getData(state.currentRecord as string)
                        }));
                    // }, 50);
                }
            });
        },
        ({onSet})=>{
            onSet((state,oldState:any)=>{
                if (state.currentRecord && state.record && state.currentRecord === oldState.currentRecord) {
                    setData(state.currentRecord,state.record);
                }
            })
        }
    ]
})