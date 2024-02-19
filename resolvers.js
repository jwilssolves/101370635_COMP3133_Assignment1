const User = require('./model/user_model'); 
const Employee = require('./model/employee_model'); 

const resolvers = {
  Query: {
    async login(_, { user_name, password }) { 
      const user = await User.findOne({
        $or: [{ user_name: user_name }, { email: user_name }],
        password: password,
      });
      if (!user) {
        throw new Error('User not found or password is incorrect');
      }
      return user;
    },
    async get_employees() { 
      return await Employee.find({});
    },
    async get_employee_by_id(_, { _id }) { 
      return await Employee.findById(_id);
    },
  },
  Mutation: {
    async sign_up(_, { user }) { 
      const { user_name, email, password } = user;

      const existingUser = await User.findOne({
        $or: [{ user_name: user_name }, { email: email }],
      });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const newUser = new User({
        user_name,
        email,
        password,
      });

      return await newUser.save();
    },
    async add_employee(_, { employee }) { 
      const newEmployee = new Employee({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        gender: employee.gender,
        salary: employee.salary,
      });

      return await newEmployee.save();
    },
    async update_employee(_, { _id, employee }) { 
      const updatedEmployee = await Employee.findByIdAndUpdate(_id, {
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        gender: employee.gender,
        salary: employee.salary,
      }, { new: true });

      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }

      return updatedEmployee;
    },
    async delete_employee(_, { _id }) { 
      const deleted = await Employee.findByIdAndDelete(_id);
      if (!deleted) {
        throw new Error('Employee not found');
      }
      return true;
    },
  },
};

module.exports = { resolvers };





