class DataGenerator {
  static generateRandomEmail() {
    return `user_${Date.now()}@test.com`;
  }

  static generateRandomPassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static generateRandomName(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    for (let i = 0; i < length; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TestUser${randomStr}`;
  }
}

module.exports = DataGenerator;