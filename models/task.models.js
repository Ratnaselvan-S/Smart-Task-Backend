const db = require("../data/database");

const mongodb = require("mongodb");

class Task {
  constructor({ title, description, priority, status, userId }) {
    this.title = title;
    this.description = description || "";
    this.priority = priority || "medium";
    this.status = status || "pending";
    this.userId = new mongodb.ObjectId(userId);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    return db.getDatabase().collection("tasks").insertOne(this);
  }

  static findByUser(userId, search = "") {
    const query = {
      userId: new mongodb.ObjectId(userId),
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    return db
      .getDatabase()
      .collection("tasks")
      .find(query)
      .sort({
        priority: -1,
        createdAt: -1,
      })
      .toArray();
  }

  static async update(taskId, userId, data) {
    data.updatedAt = new Date();

    return db
      .getDatabase()
      .collection("tasks")
      .updateOne(
        {
          _id: new mongodb.ObjectId(taskId),
          userId: new mongodb.ObjectId(userId),
        },
        { $set: data }
      );
  }
  static async delete(taskId, userId) {
    return db
      .getDatabase()
      .collection("tasks")
      .deleteOne({
        _id: new mongodb.ObjectId(taskId),
        userId: new mongodb.ObjectId(userId),
      });
  }
}

module.exports = Task;
