create or REPLACE view projects_details as 

SELECT p.*, u.name as user_name,u.lastname as user_lastname, s.title as status_title,s.name as status_name, t.title as type_title,t.name as type_name

from projects as p
left join statuses as s
on s.id = p.status_id 
left join types as t
on p.type_id = t.id
left join users as u 
on u.id = p.user_id;