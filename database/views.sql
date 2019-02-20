SELECT p.*, concat(u.name, u.lastname) as user, s.title as status_title,s.name as status_name, t.title as type_title,t.name as type_name

from projects as p
left join statuses as s
on s.id = p.status_id 
left join types as t
on p.type_id = t.id
left join users as u 
on u.id = p.user_id;

-- get all data related to viatics
create or replace view viatics_details as 
select v.*, 
s.name as status_name, s.title as status_title, 
p.code, 
u.name as user_name, u.lastname as user_lastname, 
ua.name as authorizator_name, ua.lastname as authorizator_lastname ,
p.user_id as responsable_id
from viatics as v
inner join statuses as s on s.id = v.status_id
inner join projects as p on p.id = v.project_id
inner join users as u on u.id = v.user_id
left join users as ua on ua.id = auth_user_id;
