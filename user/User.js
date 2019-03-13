class User {
    constructor(id, name, role, joinDate) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.joinDate = joinDate;
    }

    // This is simple logic for calculating year difference
    getDuration() {
        let joinYear = new Date(this.Date).getFullYear();
        return joinYear - (new Date()).getFullYear();
    }
}