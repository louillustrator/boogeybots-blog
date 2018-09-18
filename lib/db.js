"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const posts = require("./posts");
const dbFilePath = path.join(__dirname, '../database/blog.db');
let db = undefined;
function configureDatabase() {
    if (!fs.existsSync(path.dirname(dbFilePath))) {
        fs.mkdirSync(path.dirname(dbFilePath));
    }
    db = new Database(dbFilePath);
    db.prepare('CREATE TABLE IF NOT EXISTS posts (\n' +
        '  id           INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
        '  title        TEXT    NOT NULL ,\n' +
        '  description  TEXT    NOT NULL ,\n' +
        '  date_created TEXT    NOT NULL ,\n' +
        '  authors      TEXT             ,\n' +
        '  filename     TEXT    NOT NULL\n' +
        ');').run();
    let filenames = db.prepare('SELECT filename FROM posts').all().map(x => x.filename);
    let postnames = posts.getPostNames();
    let notNeeded = filenames.filter(x => !postnames.includes(x));
    let missing = postnames.filter(x => !filenames.includes(x));
    let mayNeedUpdating = filenames.filter(x => postnames.includes(x));
    notNeeded.forEach(filename => {
        db.prepare('DELETE FROM posts WHERE filename = @filename').run({ filename: filename });
        console.log(`>> Deleted ${filename} from database`);
    });
    missing.forEach(filename => {
        let post = posts.readPost(filename);
        let query = 'INSERT INTO posts';
        if (post.authors) {
            query += ' (title, description, date_created, authors, filename) VALUES (@title, @description, date(@date_created), @authors, @filename)';
            db.prepare(query).run({
                title: post.title,
                description: post.description,
                date_created: post.date,
                authors: post.authors,
                filename: filename
            });
        }
        else {
            query += ' (title, description, date_created, filename) VALUES (@title, @description, date(@date_created), @filename)';
            db.prepare(query).run({
                title: post.title,
                description: post.description,
                date: post.date,
                filename: filename
            });
        }
        console.log(`>> Added ${filename} to database`);
    });
    mayNeedUpdating.forEach(filename => {
        let post = posts.readPost(filename);
        if (post.authors) {
            let query = 'UPDATE posts SET title = @title , description = @description, date_created = date(@date_created), authors = @authors WHERE filename = @filename';
            db.prepare(query).run({
                title: post.title,
                description: post.description,
                date_created: post.date,
                authors: post.authors,
                filename: filename
            });
        }
        else {
            let query = 'UPDATE posts SET title = @title , description = @description, date_created = date(@date_created) WHERE filename = @filename';
            db.prepare(query).run({
                title: post.title,
                description: post.description,
                date_created: post.date,
                filename: filename
            });
        }
        console.log(`>> ${filename} up to date`);
    });
}
exports.configureDatabase = configureDatabase;
function connectDatabase() {
    try {
        db = new Database(dbFilePath);
        console.log('>> Connected to the database!');
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
exports.connectDatabase = connectDatabase;
function getLastRowsByDate(howMany) {
    return db.prepare(`SELECT * FROM posts ORDER BY date(date_created) DESC LIMIT ${howMany}`).all();
}
exports.getLastRowsByDate = getLastRowsByDate;
//# sourceMappingURL=db.js.map