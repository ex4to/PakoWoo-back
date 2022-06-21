export default [{
    id: 1,
    firstName: 'Kostya',
    lastName: 'Ivanov',
    fullName() {
        return this.firstName + " " + this.lastName
    }
  }, {
    id: 2,
    firstName: 'Pavel',
    lastName: 'Popov',
    fullName() {
        return this.firstName + " " + this.lastName
    }
  }];