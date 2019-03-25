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
        selected_role = ''
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
        this.area_id = area_id;
        this.password = password;
        this.lastname = lastname;
        this.positon_id = positon_id;
        this.selected_role = selected_role;
        this.department_id = department_id;
        this.employee_number = employee_number;
    }
}