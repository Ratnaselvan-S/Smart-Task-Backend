const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(userData) {
    if (!userData) {
      return;
    }
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

  async comparePassword(plainpassword) {
    return await bcrypt.compare(plainpassword, this.password);
  }

  async save() {
    await db.getDatabase().collection("users").insertOne({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }
  static async findByEmail(email) {
    const userData = await db
      .getDatabase()
      .collection("users")
      .findOne({ email });

    if (!userData) {
      return null; // ✅ real null
    }
    return new User(userData);
  }
}

module.exports = User;
