class User {
  constructor(id, name, role, joinDate = new Date()) {
    this.name = name;
    this.id = id;
    this.role = role;
    this.joinDate = joinDate;
  }

  // This is simple logic for calculating year difference
  getDuration() {
    const joinYear = new Date(this.joinDate).getFullYear();
    return (new Date()).getFullYear() - joinYear;
  }
}

module.exports = User;
