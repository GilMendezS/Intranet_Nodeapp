export default class Viatic {
    constructor(
        id = '',
        user_id = '',
        project_id = '',
        auth_user_id = '',
        status_id = '',
        origin = '',
        destiny = '',
        departure= '',
        arrive= '',
        money_requested = '',
        money_deposited = '',
        money_checked = '',
        money_refunded = '',
        comments = '',
        created_at = '',
        updated_at = '',
        allcomments = [],
        user= {},
        status= {},
        project = {}
        

    ){
        this.id = id;
        this.arrive = arrive;
        this.origin = origin;
        this.destiny = destiny;
        this.user_id = user_id;
        this.comments = comments;
        this.departure = departure;
        this.status_id = status_id;
        this.created_at = created_at;
        this.project_id = project_id;
        this.updated_at = updated_at;
        this.allcomments = allcomments;
        this.auth_user_id = auth_user_id;
        this.money_checked = money_checked;
        this.money_refunded = money_refunded;
        this.money_requested = money_requested;
        this.money_deposited = money_deposited;
        this.user = user;
        this.status = status;
        this.project = project;
    }
}