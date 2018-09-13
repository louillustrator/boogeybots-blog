"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("better-sqlite3");
const path = require("path");
const posts = require("./posts");
const dbFilePath = path.join(__dirname, '../database/blog.db');
let db = undefined;
function configureDatabase() {
    db = new Database(dbFilePath);
    let filenames = db.prepare('SELECT filename FROM posts').all().map(x => x.filename);
    let postnames = posts.getPostNames();
    let notNeeded = filenames.filter(x => !postnames.includes(x));
    let missing = postnames.filter(x => !filenames.includes(x));
    notNeeded.forEach(filename => {
        db.prepare('DELETE FROM posts WHERE filename=?').run(filename);
    });
    missing.forEach(filename => {
        let post = posts.readPost(filename);
        let query = 'INSERT INTO posts';
        if (post.authors !== null && post.authors !== undefined) {
            query += ' (title, description, date, authors, filename) VALUES (?, ?, ?, ?, ?)';
            db.prepare(query).run([
                post.title,
                post.description,
                `${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`,
                post.authors,
                filename
            ]);
        }
        else {
            query += ' (title, description, date, filename) VALUES (?, ?, ?, ?)';
            db.prepare(query).run([
                post.title,
                post.description,
                `${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`,
                filename
            ]);
        }
    });
}
exports.configureDatabase = configureDatabase;
//# sourceMappingURL=db.js.map