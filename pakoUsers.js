export default [{
    pakoId: 1,
    vkId: 100,
    firstName: 'Kostya',
    lastName: 'Ivanov',
    photo: 'null',
    fullName() {
        return this.firstName + " " + this.lastName
    }
  }, {
    pakoId: 2,
    vkId: 200,
    firstName: 'Pavel',
    lastName: 'Popov',
    photo: 'null',
    fullName() {
      return this.firstName + " " + this.lastName
  },
  }];