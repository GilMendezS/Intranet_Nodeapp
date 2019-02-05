export default class Department {
    constructor(
        id = '',
        title= '',
        UserId= '',
        AreaId = '',
        createdAt = '',
        updatedAt= ''
    ){
        this.id = id;
        this.title = title;
        this.UserId = UserId;
        this.AreaId = AreaId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}