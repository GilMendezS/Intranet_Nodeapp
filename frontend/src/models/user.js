export default class User{
    constructor(
        id = '',
        name = '',
        lastname = '',
        email= '',
        password = '',
        employee_number = ''
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.employee_number = employee_number;
    }
}