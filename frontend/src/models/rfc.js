export default class Rfc {
    constructor(
        id = '',
        title = '',
        rfc = '',
        created_at = '',
        updated_at = ''
    ){
        this.id = id;
        this.title = title;
        this.rfc = rfc;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}