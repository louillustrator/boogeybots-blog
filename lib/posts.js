"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const fm = require("front-matter");
const showdown = require("showdown");
var converter = new showdown.Converter({
    tables: true,
    tasklists: true,
    openLinksInNewWindow: true,
    // @ts-ignore
    emoji: true,
    metadata: true
});
const postsPath = path.join(__dirname, "../public/posts");
function readPost(postName) {
    const filePath = postsPath + `/${postName}.md`;
    let text = fs.readFileSync(filePath, 'utf8');
    let content = fm(text);
    let markdown = converter.makeHtml(content.body);
    return {
        title: content.attributes['title'],
        description: content.attributes['description'],
        date: content.attributes['date'],
        authors: content.attributes['authors'],
        text: markdown
    };
}
exports.readPost = readPost;
function getPostNames() {
    return fs.readdirSync(postsPath).map((post) => {
        return path.basename(post, '.md');
    });
}
exports.getPostNames = getPostNames;
//# sourceMappingURL=posts.js.map