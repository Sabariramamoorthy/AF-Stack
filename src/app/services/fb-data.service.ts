import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Write, Read, Order } from 'src/models/firebaseDataModel';

@Injectable({
  providedIn: 'root',
})
export class FbDataService {
  constructor(private db: AngularFireDatabase) {}

  async InsertData(argInput: Write): Promise<boolean> {
    try {
      await this.db.database
        .ref(`/${argInput.basePath}/${argInput.tableName}/${argInput.itemName}`)
        .set(argInput.insertData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async GetDatabase(argInput: Read): Promise<any> {
    const dbRef = this.db.database.ref(argInput.basePath);
    const snapshot = await dbRef.get();
    return snapshot.exists() ? snapshot.val() : [];
  }

  async GetDataTable(argInput: Read): Promise<any> {
    const dbRef = this.db.database.ref(`${argInput.basePath}/${argInput.tableName}`);
    const snapshot = await dbRef.get();
    return snapshot.exists() ? snapshot.val() : [];
  }

  async DataExisting(argInput: Read): Promise<boolean> {
    const dbRef = this.db.database.ref(`${argInput.basePath}/${argInput.tableName}/${argInput.itemName}`);
    const snapshot = await dbRef.get();
    return snapshot.exists();
  }

  async GetValue(argInput: Read): Promise<any> {
    const dbRef = this.db.database.ref(`${argInput.basePath}/${argInput.tableName}/${argInput.itemName}`);
    const snapshot = await dbRef.get();
    return snapshot.exists() ? snapshot.val() : [];
  }

  async UpdateValue(argInput: Write): Promise<any> {
    try {
      await this.db.database
        .ref(`/${argInput.basePath}/${argInput.tableName}/${argInput.itemName}`)
        .update(argInput.insertData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async DeleteValue(argInput: Write): Promise<any> {
    try {
      await this.db.database
        .ref(`/${argInput.basePath}/${argInput.tableName}/${argInput.itemName}`)
        .remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async OrderByChild(argInput: Order): Promise<any> {
    const result: any = [];
    const query = this.db.database
      .ref(`/${argInput.basePath}/${argInput.tableName}`)
      .orderByChild(argInput.itemName);

    query.on('child_added', (data) => {
      result.push(data.val());
    });

    return result;
  }
}
