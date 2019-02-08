export default class Project {
    constructor(
        id = '',
        name= '',
        code = '',
        client= '',
        user_id = '',
        type_id = '',
        status_id = '',
        budget= '',
        money_spent= '',
        money_refunded= '',
        comments = [],
        extra_comments= '',
        users= [],
        created_at = '',
        updated_at = ''

    ){
        this.id = id;
        this.name = name;
        this.code = code;
        this.client = client;
        this.user_id = user_id;
        this.type_id = type_id;
        this.status_id = status_id;
        this.budget = budget;
        this.money_spent= money_spent;
        this.money_refunded = money_refunded;
        this.comments = comments;
        this.extra_comments = extra_comments;
        this.users = users;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}