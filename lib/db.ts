import Database = require("better-sqlite3");
import path = require("path");
import posts = require("./posts");
import {Post} from "./posts";


const dbFilePath = path.join(__dirname, '../database/blog.db');

let db: Database = undefined;

export function configureDatabase() {
    db = new Database(dbFilePath);

    db.prepare('CREATE TABLE IF NOT EXISTS posts (\n' +
        '  id          INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
        '  title       TEXT    NOT NULL ,\n' +
        '  description TEXT    NOT NULL ,\n' +
        '  date        DATE    NOT NULL ,\n' +
        '  authors     TEXT             ,\n' +
        '  filename    TEXT    NOT NULL\n' +
        ');');

    let filenames: string[] = db.prepare('SELECT filename FROM posts').all().map(x => x.filename);
    let postnames: string[] = posts.getPostNames();

    let notNeeded = filenames.filter(x => !postnames.includes(x));
    let missing = postnames.filter(x => !filenames.includes(x));

    notNeeded.forEach(filename => {
        db.prepare('DELETE FROM posts WHERE filename=?').run(filename);
        console.log(`>> Deleted ${filename} from database`);
    });

    missing.forEach(filename => {
        let post: Post = posts.readPost(filename);
        let query: string = 'INSERT INTO posts';
        if (post.authors !== null && post.authors !== undefined) {
            query += ' (title, description, date, authors, filename) VALUES (?, ?, ?, ?, ?)';
            db.prepare(query).run([
                post.title,
                post.description,
                `${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`,
                post.authors,
                filename
            ]);
        } else {
            query += ' (title, description, date, filename) VALUES (?, ?, ?, ?)';
            db.prepare(query).run([
                post.title,
                post.description,
                `${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`,
                filename
            ]);
        }

        console.log(`>> Added ${filename} to database`);
    })
}