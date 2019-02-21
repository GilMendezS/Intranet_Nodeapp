export default class User{
    constructor(
        id = '',
        name = '',
        lastname = '',
        email= '',
        password = '',
        employee_number = '',
        active = '',
        area_id = '',
        department_id = '',
        positon_id = '',
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.employee_number = employee_number;
        this.active = active;
        this.area_id = area_id;
        this.department_id = department_id;
        this.positon_id = positon_id;
        
    }
}