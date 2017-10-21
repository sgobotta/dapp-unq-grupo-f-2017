import { Db, ObjectID } from "mongodb";
import { injectable } from "inversify";
import { MongoDBConnection } from "./connection";

@injectable()
export class MongoDBClient {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, filter: Object, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).toArray((error, find) => {
      return result(error, find);
    });
  }

  public findWithPattern(collection: string, filter: any, result: (error, data) => void): void {
    let query = {};
    query[filter.property] = { $regex: filter.value };
    this.db.collection(collection).find(query).toArray((error, find) => {
      return result(error, find);
    });
  }

  public findOneById(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public insert(collection: string, model: any, result: (error, data) => void): void {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      return result(error, insert.ops[0]);
    });
  }

  public update(collection: string, objectId: string, model: any, result: (error, data) => void): void {
    this.db.collection(collection).updateOne({ _id: new ObjectID(objectId) }, model, (error, update) => {
      return result(error, model);
    });
  }

  public remove(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
      return result(error, remove);
    });
  }

  public findOneByProperty(collection: string, object: Object, result: (error, data) => void): void {
    this.db.collection(collection).find(object).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public updateByProperty(collection: string, object: Object, model: any, result: (error, data) => void): void {
    this.db.collection(collection).updateOne(object, { $set: model }, (error, update) => {
      return result(error, model);
    });
  }

  public removeByProperty(collection: string, object: Object, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne(object, (error, remove) => {
      return result(error, remove);
    });
  }
}
