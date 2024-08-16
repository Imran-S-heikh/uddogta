import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Collections, Entry, Filter, Record } from "../../type";

const { RECORDS, USER_RECORDS, USER_ENTRIES } = Collections;

export async function createRecord(
  userId: string,
  record: Filter<Record, "id">
) {
  const ref = collection(db, RECORDS, userId, USER_RECORDS);

  return addDoc(ref, record);
}

export async function createEntry(
  userId: string,
  recordId: string,
  data: Filter<Entry, "id">
) {
  const ref = collection(
    db,
    RECORDS,
    userId,
    USER_RECORDS,
    recordId,
    USER_ENTRIES
  );

  return await addDoc(ref, data);
}

export async function deleteRecord(userId: string, recordId: string) {
  const ref = doc(db, RECORDS, userId, USER_RECORDS, recordId);

  return await deleteDoc(ref);
}

export async function deleteEntry(
  userId: string,
  recordId: string,
  entryId: string
) {
  const ref = doc(
    db,
    RECORDS,
    userId,
    USER_RECORDS,
    recordId,
    USER_ENTRIES,
    entryId
  );

  return await deleteDoc(ref);
}
