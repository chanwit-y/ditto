import { app, database } from "./config";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
  getFirestore,
  CollectionReference,
  setDoc,
  updateDoc,
  where,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export function firebase(): string {
  return "firebase";
}

export async function getDataAll(collectionName: string) {
  const docDatum = await getDocs(createCollection(collectionName));
  return docDatum.docs.map((doc) => doc.data());
}

export async function getDataById(collectionName: string, id: string) {
  const docs = doc(database, collectionName, id);
  const docData = await getDoc(docs);
  return docData.data();
}

export async function getDataFilter(
  collectionName: string,
  filter: Map<string, any>
) {
  let result: any[] = [];
  let wheres: QueryConstraint[] = [];
  for (const [key, value] of filter.entries())
    wheres = [...wheres, where(key, "==", value)];

  const q = query(createCollection(collectionName), ...wheres);
  const docs = await getDocs(q);
  docs.forEach((d) => (result = [...result, { doc_id: d.id, ...d.data() }]));
  return result;
}

export const firestore = getFirestore(app);
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export async function addData(collectionName: string, data: any) {
  const userRef = doc(createCollection(`${collectionName}`));
  await setDoc(userRef, data);
}

export const updateData = async (
  collectionName: string,
  id: string,
  data: any
) => {
  const userRef = doc(database, collectionName, "user_12345");
  await updateDoc(userRef, "first_name", "chanwit update", ["last_name", "yimneam update"]);
};

// const converter = <T>() => ({
//   toFirestore: (data: T) => data,
//   fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions) =>
//     snap.data(options) as T,
// });
// const dataPoint = <T>(collectionPath: string) =>
//   createCollection(collectionPath).withConverter(converter<T>());


/**
 * Converter used by `withConverter()` to transform user objects of type `T`
 * into Firestore data.
 *
 * Using the converter allows you to specify generic type arguments when
 * storing and retrieving objects from Firestore.
 *
 * @example
 * ```typescript
 * class Post {
 *   constructor(readonly title: string, readonly author: string) {}
 *
 *   toString(): string {
 *     return this.title + ', by ' + this.author;
 *   }
 * }
 *
 * const postConverter = {
 *   toFirestore(post: WithFieldValue<Post>): DocumentData {
 *     return {title: post.title, author: post.author};
 *   },
 *   fromFirestore(
 *     snapshot: QueryDocumentSnapshot,
 *     options: SnapshotOptions
 *   ): Post {
 *     const data = snapshot.data(options)!;
 *     return new Post(data.title, data.author);
 *   }
 * };
 *
 * const postSnap = await firebase.firestore()
 *   .collection('posts')
 *   .withConverter(postConverter)
 *   .doc().get();
 * const post = postSnap.data();
 * if (post !== undefined) {
 *   post.title; // string
 *   post.toString(); // Should be defined
 *   post.someNonExistentProperty; // TS error
 * }
 * ```
 */
