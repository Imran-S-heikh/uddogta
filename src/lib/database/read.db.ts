import {
  doc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Collections, Entry, Record } from "../../type";

const { RECORDS, USER_RECORDS, USER_ENTRIES } = Collections;

export async function getUserRecords(userId: string) {
  const items: Record[] = [];
  const ref = collection(db, RECORDS, userId, USER_RECORDS);
  const snap = await getDocs(ref);

  snap.forEach((doc) => {
    const data = doc.data();
    items.push({ id: doc.id, name: data.name });
  });

  return items;
}

export async function getUserSingleRecord(userId: string, recordId: string) {
  const ref = doc(db, RECORDS, userId, USER_RECORDS, recordId);
  const snap = await getDoc(ref);

  return snap.data() as Record | undefined;
}

export async function getUserRecord(userId: string, recordId: string) {
  const items: Entry[] = [];
  const ref = collection(
    db,
    RECORDS,
    userId,
    USER_RECORDS,
    recordId,
    USER_ENTRIES
  );

  const snap = await getDocs(query(ref, orderBy("date", "asc")));
  snap.forEach((doc) => {
    const data = doc.data() as any;
    items.push({
      id: doc.id,
      value: data.value,
      date: data.date,
      action: data.action,
      title: data.title,
    });
  });

  return items;
}
