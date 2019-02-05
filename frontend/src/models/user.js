export default class User{
    constructor(
        id = null,
        name = null,
        lastname = null,
        email= null,
        password = null,
        employee_number = null
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.employee_number = employee_number;
    }
}