export default class Position {
    constructor(
        id = '',
        title = '',
        AreaId = '',
        DepartmentId= '',
        createdAt = '',
        updatedAt = ''
    ){
        this.id = id;
        this.title = title;
        this.AreaId = AreaId;
        this.DepartmentId = DepartmentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}