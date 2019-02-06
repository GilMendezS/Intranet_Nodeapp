const moment = require('moment');
const sequelize = require('../utils/database');
class SSP{
    db(conn){
        if (conn.constructor == Array){
            return this.sql_connect(conn);
        }
        return conn;
    }
    data_output(columns, data, table){
        
        let out = [];
        let row;;
        let column;
        const limit_columms = columns.length;
        const limit_data = data.length;
        let complete_field = '';
        for(let i= 0; i<limit_data; i++){
            row = [];
            for(let j= 0; j<limit_columms; j++){
                column = columns[j][0];
                //Is there a formatter?
                let field = columns[j][0]['db'];    
                complete_field = field.replace(`${table}.`, '')
                if ( typeof column.formatter !== 'undefined' ){

                    //$row[ $column['dt'] ] = columns[j][0].formatter( data[i][ column['db'] ], data[i] );
                    row[column.dt] = columns[j][0].formatter( data[i][ complete_field ], data[i] );   
                }
                else {
                    
                    row[column.dt] = data[i][complete_field];
                }
            }
            
            out.push(row);
        }

        return out;
    }
    filter(request , columns, bindings){
        let globalSearch = [];
        let columnSearch = [];
        let requestColumn;
        let columnIdx;
        let column;
        let str;
        let limit;
        let dtColumns = this.pluck(columns, 'dt' );
        if('search' in request.query && request.query.search['value'] != ''){
            str = request.query.search['value'];
            limit = request.query.columns.length;
            for(let i=0;i< limit; i++){
                requestColumn = request.query.columns[i];
                columnIdx = dtColumns.indexOf(parseInt(requestColumn.data));
                column = columns[ columnIdx ];
				if ( requestColumn['searchable'] == 'true' ) {
					//binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
                    //$globalSearch[] = "`".$column['db']."` LIKE ".$binding;
                    globalSearch.push(`${this.parseColumns(str, column[0])}`);
				}
            }
        }
        // Individual column filtering
		if ( 'columns' in request.query ) {
            const limit = request.query.columns.length;
			for ( let i=0; i<limit ; i++ ) {
				requestColumn = request.query.columns[i];
				columnIdx = dtColumns.indexOf(parseInt(requestColumn['data']))
                column = columns[ columnIdx ];
			    str = requestColumn['search']['value'];
				if ( requestColumn['searchable'] == 'true' && str != '' ) {
					//$binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
                    //$columnSearch[] = "`".$column['db']."` LIKE ".$binding;
                    columnSearch.push(`${this.parseColumns(str, column[0])}`);
				}
			}
        }
        // Combine the filters into a single string
        let where = '';
        globalSearch = globalSearch.filter( where => where != '' )
		if ( globalSearch.length > 0 ) {
            where =  `( ${globalSearch.join(" OR ")} )`;
        }
        columnSearch = columnSearch.filter(where => where != '')
		if ( columnSearch.length > 0 ) {
			where = where == '' ?
                columnSearch.join(" AND "):
                `${where} AND ${columnSearch.join(" AND ")}`
		}
		if ( where != '' ) {
			where = `WHERE ${where}`;
		}
		return where;
    }
    limit(request, columns){
        let limit = '';
        if (request.query.start && request.query.length != -1){
            limit = `LIMIT ${request.query.length} OFFSET ${request.query.start}`
        }
        return limit;
    }
    async simple(request, conn, table, primaryKey, columns){
        let bindings = [];
        //let db = this.db(conn);
        // Build the SQL query string from the request
        let limit = this.limit( request, columns );
		let order = this.order( request, columns );
        let where = this.filter( request, columns, bindings );
        
        // Main query to actually get the data
        const select_columns = this.pluck(columns, "db").join(',');
        let data = await this.sql_exec(bindings, `
            SELECT ${select_columns}
            FROM '${table}'
            ${where}
            ${order}
            ${limit}
        `)
        // Data set length after filtering
        let resFilterLength = await this.sql_exec(bindings, `
            SELECT COUNT(${primaryKey})
            FROM ${table}
            ${where}
        `)
        const recordsFiltered = resFilterLength[0].count;
        let resTotalLength = await this.sql_exec(bindings, `
            SELECT COUNT(${primaryKey})
            FROM ${table}
        `)
        
        const recordsTotal = resTotalLength[0].count;
        /*
		 * Output
		 */
        const draw = request.query.draw ? parseInt(request.query.draw) : 0
        const data_to_send =  {
            draw,
            recordsTotal: parseInt(recordsTotal),
            recordsFiltered: parseInt(recordsFiltered),
            data: this.data_output(columns, data, table)
        }
        return data_to_send;
    }
    
    order(request, columns){
        let order = '';
        if(request.query.order){
            let orderBy = [];
            let dtColumns = this.pluck(columns, 'dt');
            const limit = request.query.order.length;
            let columnIdx;
            let requestColumn;
            let dir;
            let column;
            for(let i = 0; i<limit; i++){
                // Convert the column index into the column data property
                columnIdx = parseInt(request.query.order[i]['column']);
                
                requestColumn = request.query.columns[columnIdx];
                
                columnIdx = dtColumns.indexOf(parseInt(requestColumn.data))
                column = columns[ columnIdx ]
                if (requestColumn['orderable'] && requestColumn['orderable'] == 'true'){
                    dir = request.query.order[i]['dir'] == 'asc' ? 'ASC': 'DESC';
                    orderBy.push(`${column[0].db} ${dir}`)
                }
                if(orderBy.length > 0){
                    order = `ORDER BY ${orderBy.join(',')}`
                }
            }
        }
        return order;
    }
    sql_exec(bindings, query = null){
        
        if (query == null){
            sql = bindings;
        }
        return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error(`Error fetching the data: ${err}`)
        })
    }
    pluck(columns, key){
        let out = [];
        const limit = columns.length;
        for(let i=0; i < limit; i++){
            out.push(columns[i][0][key])
        }
        return out;
    }
    parseColumns(value, column){
        let where = '';
        switch(column.db_type){
            case 'boolean':
                if (vaue == 'Si' || value == 'SI'){
                    where = `${column.db} =true`;
                }
                else if(value == 'No' || value=='NO'){
                    where = `${column.db} =false`;
                }
                break;
            case 'int':
                if(!isNaN(value)){
                    where = `${column.db} = ${value}`;
                }
                break;
            case 'date':
                if(moment(value).isValid()){
                    const start_day =  moment(value).format('YYYY-MM-DD 00:00:00');
                    const end_day =  moment(value).format('YYYY-MM-DD 23:59:00');
                    where = `${column.db} between '${start_day}' AND '${end_day}'`
                }
                break;
            case 'json':

                break;
                
            case 'string':
                where = `${column.db} LIKE '%${value}%'`;
                break;
        }
        return where;
    }

}
module.exports = SSP;