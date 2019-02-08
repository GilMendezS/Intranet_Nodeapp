export default class Hour {
    constructor(
        id = '',
        hours = '',
        in_time = '',
        date= '',
        activity= '',
        comments= '',
        user_id='',
        project_id='',
        reg_user_id='',
        user='',
        project= '',
        project_manager= '',
        created_at= '',
        updated_at = ''
    ){
        this.id = id;
        this.hours = hours;
        this.in_time = in_time;
        this.date = date;
        this.activity = activity;
        this.comments = comments;
        this.user_id = user_id;
        this.project_id = project_id;
        this.reg_user_id = reg_user_id;
        this.user = user;
        this.project = project;
        this.project_manager = project_manager;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}