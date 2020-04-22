
class SQLHandler {

  constructor() {

  }

  connect() {
    //TODO connect to database
  }

  disconnect() {
    //TODO disconnect from database
  }

  update(table, columns, values, condition, value) {
    let sqlcode = `UPDATE ${table} SET `;
    if (!Array.isArray(columns) && !Array.isArray(values))
      sqlcode += `${columns}='${values}'`
    else
      for (let i = 0; i < columns.length; i++)
        sqlcode += `${columns[i]}='${values[i]}',`
      sqlcode = sqlcode.substr(0, sqlcode.length - 2) + ` WHERE ${condition}='${value}'`
    //TODO use sqlcode
  }

  get(select, table, conditions, values) {
    let sqlcode = `SELECT ${select} FROM ${table} WHERE `

    if (!Array.isArray(conditions) && !Array.isArray(values))
      sqlcode += `${conditions}='${values}'`
    else
      for (let i = 0; i < conditions.length; i++)
        sqlcode += `${conditions[i]}='${conditions[i]}' AND `
      sqlcode = sqlcode.substr(0, sqlcode.length - 5)
    //TODO use sqlcode
  }

  insert(table, rows, values) {
    let sqlcode = `INSERT INTO ${table} (${rows.join(', ')}) VALUES (${values.join(', ')})`
  }

  delete(table, conditions, values) {
    let sqlcode = `DELETE FROM ${table} WHERE `

    if (!Array.isArray(rows) && !Array.isArray(values))
      sqlcode += `${rows}='${values}'`
    else
      for (let i = 0; i < conditions.length; i++) {
        sqlcode += `${conditions[i]}='${values[i]}' AND `
      }
      sqlcode = sqlcode.substr(0, sqlcode.length - 5)
    
    //TODO use sqlcode
  }

}
