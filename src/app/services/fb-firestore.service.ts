import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FbFirestoreService<T> {
  private collection!: AngularFirestoreCollection<T>;
  collectionName!: string;
  constructor(private afs: AngularFirestore) {}

  setCollectionName(cName: string): void {
    this.collection = this.afs.collection<T>(cName);
  }

  create(data: T): Promise<void> {
    const id = this.afs.createId();
    return this.collection.doc(id).set(data);
  }

  readOne(id: string): Observable<T | undefined> {
    return this.collection.doc(id).valueChanges();
  }

  readAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<T>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  update(id: string, data: T): Promise<void> {
    return this.collection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }

  query(queryFn: QueryFn): Observable<T[]> {
    return this.afs.collection<T>(this.collectionName, queryFn).valueChanges();
  }

  // const firestoreService = new FbFirestoreService<User>();
  // firestoreService.setCollectionName('your_collection_name_here');
  // const queryFn: QueryFn = (ref) => {
  //   return ref
  //     .where('age', '>=', 18)
  //     .orderBy('name', 'asc');
  // firestoreService.query(queryFn).subscribe((users) => {
  //   console.log('Users:', users);
  // });

  // Query operators
  // The where() method takes three parameters: a field to filter on, a comparison operator, and a value. Firestore supports the following comparison operators:

  // < less than
  // <= less than or equal to
  // == equal to
  // > greater than
  // >= greater than or equal to
  // != not equal to
  // array-contains
  // array-contains-any
  // in
  // not-in

  // orderBy("name"), limit(3)
}
