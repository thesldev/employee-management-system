import bcrypt from 'bcrypt';

const hashPassword = (emp_acc_password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(emp_acc_password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (emp_acc_password, hashed) => {
  return bcrypt.compare(emp_acc_password, hashed);
};

export { hashPassword, comparePassword };