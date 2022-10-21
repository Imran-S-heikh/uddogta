import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Collections, Entry, Filter, Record } from "../../type";

const { RECORDS,USER_RECORDS,USER_ENTRIES } = Collections;

export async function createRecord(userId: string, record: Filter<Record,'id'>) {
  const ref = collection(db, RECORDS,userId,USER_RECORDS);

  return addDoc(ref, record);
}

export async function createEntry(userId: string,recordId: string,data: Filter<Entry,'id'>){
  const ref = collection(
    db,
    RECORDS,
    userId,
    USER_RECORDS,
    recordId,
    USER_ENTRIES
  ); 

  return await addDoc(ref,data);
}
