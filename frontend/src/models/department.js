export default class Department {
    constructor(
        id = '',
        title= '',
        user_id= '',
        area_id = '',
        created_at = '',
        updated_at= ''
    ){
        this.id = id;
        this.title = title;
        this.user_id = user_id;
        this.area_id = area_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}