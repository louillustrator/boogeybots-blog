"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./db");
const posts = require("./posts");
function getPosts(howMany) {
    let dbPosts = db.getLastRowsByDate(howMany);
    let results = [];
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
exports.getPosts = getPosts;
//# sourceMappingURL=api.js.map