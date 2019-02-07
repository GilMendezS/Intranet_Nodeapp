export default class Position {
    constructor(
        id = '',
        title = '',
        area_id = '',
        department_id= '',
        created_at = '',
        updated_at = ''
    ){
        this.id = id;
        this.title = title;
        this.area_id = area_id;
        this.department_id = department_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}