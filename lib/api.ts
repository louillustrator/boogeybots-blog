import db = require("./db");
import posts = require("./posts");
import {Post} from "./posts";

export function getPosts(howMany: number): Post[] {
    let dbPosts = db.getLastRowsByDate(howMany);
    let results: Post[] = [];
    dbPosts.forEach((p) => {
        results.push({
            title: p['title'],
            description: p['description'],
            authors: p['authors'],
            date: p['date'],
            text: posts.getHtmlFromPost(p['filename'])
        });
    });

    return results;
}