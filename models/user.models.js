const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(userData) {
    (this.email = userData.email),
      (this.password = userData.password),
      (this.name = userData.name || "");
    if (userData._id) {
      this._id = userData._id;
    }
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async save() {
    await db.getDatabase().collection("users").insertOne({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }
  static async findByEmail(email) {
    const user = await db.getDatabase().collection("users").findOne({ email });
    return user;
  }
}

module.exports = User;
