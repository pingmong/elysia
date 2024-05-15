import Database from "bun:sqlite";

let rdbms: Database;

const open = () => {
  // rdbms = new Database("sqlite.db");
  rdbms = new Database(":memory:");
};

const close = () => {
  rdbms.close();
};

const createTable = () => {
  return `CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        status TEXT)`;
};

const insertDummy = () => {
  return `INSERT INTO todo (title, status)
    VALUES ('First Todo', 'pending'),
           ('Second Todo', 'done'),
           ('Third Todo', 'pending'),
           ('Fourth Todo', 'progress'),
           ('Fifth Todo', 'pending')`;
};

const initialize = () => {
  runCommend(createTable());
  runCommend(insertDummy());
};

const runCommend = (query: string) => {
  return rdbms.query(query).values();
};

const getQuery = (query: string) => {
  return rdbms.query(query).get();
};

const allQuery = (query: string) => {
  return rdbms.query(query).all();
};

export const RdbmsConfig = {
  open,
  close,
  initialize,
  getQuery,
  allQuery,
};
