import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { Upload } from 'src/models/firebaseStorageModel';

@Injectable({
  providedIn: 'root',
})
export class FbStorageService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  uploadFile(file: Upload): Observable<string> {
    const filePath = this.buildFilePath(file);

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file.file);

    return from(task).pipe(
      finalize(() => {}),
      switchMap(() => this.getDownloadUrl(fileRef)),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  private buildFilePath(file: Upload): string {
    return `${file.BasePath}/${file.pageName}/${file.orderFolder}/${file.fileName}`;
  }

  private getDownloadUrl(ref: any): Observable<string> {
    return ref.getDownloadURL().pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  downloadURL(file: Upload): Observable<string> {
    const filePath = this.buildFilePath(file);
    const fileRef = this.storage.ref(filePath);
    return this.getDownloadUrl(fileRef);
  }

  deleteFile(file: Upload): Observable<void> {
    const dbListRef = this.db.list(file.BasePath);
    const storageRef = this.storage.ref(file.BasePath);

    return from(dbListRef.remove(file.fileName)).pipe(
      finalize(() => {
        storageRef.child(file.fileName).delete().toPromise();
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
