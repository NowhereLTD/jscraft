const { PostgreSQL } = require("pg")
const MySQL = require('mysql');
var TarantoolConnection = require("tarantool-driver");
const SQLite = require("better-sqlite3");

class SQLHandler {

  constructor(driver, dbName, host = null, user = null, password = null, port = null) {
    this.driver = driver;
    this.dbName = dbName;
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = null;
  }

  connect() {
    switch (this.driver) {
      case "postgres":
        if(this.port == null) {
          this.port = 5432;
        }
        this.database = new PostgreSQL({
          host     : this.host,
          port     : this.port,
          database : this.dbName,
          user     : this.user,
          password : this.password,
        });
        this.database.connect();
        break;
      case "mysql":
        if(this.port == null) {
          this.port = 3306;
        }
        this.database = MySQL.createConnection({
          host     : this.host,
          port     : this.port,
          database : this.dbName,
          user     : this.user,
          password : this.password
        });
        this.database.connect();
        break;
      case "tarantool":
        this.database = new TarantoolConnection(this.host + ":" + this.password + "@" + this.user + ":" + this.port);
        break;
      case "sqlite":
        this.dbName = this.dbName + ".db";
        this.database = new SQLite.Database(this.dbName);
        break;
    }
  }

  disconnect() {
    switch (this.driver) {
      case "postgres":
        this.database.end();
        break;
      case "mysql":
        this.database.end();
        break;
      case "tarantool":
        this.database.disconnect();
        break;
      case "sqlite":
        this.database.close();
        break;
    }
  }

  exec(sqlString) {
    switch (this.driver) {
      case "postgres":
        return this.database.query(sqlString);
        break;
      case "mysql":
        return this.database.query(sqlString);
        break;
      case "tarantool":
        return this.database.sql(sqlString);
        break;
      case "sqlite":
        return this.database.exec(sqlString);
        break;
    }
    return null;
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
