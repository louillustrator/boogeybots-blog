import fs = require("fs");
import path = require("path");
import fm = require("front-matter");
import showdown = require("showdown");

export interface Post {
    title: string,
    description: string,
    date: string,
    authors: string[],
    text: string
}

var converter = new showdown.Converter({
    tables: true,
    tasklists: true,
    openLinksInNewWindow: true,
    // @ts-ignore
    emoji: true,
    metadata: true
});

const postsPath: string = path.join(__dirname, "../public/posts");

export function readPost(postName: string): Post {
    const filePath: string = postsPath + `/${postName}.md`;

    let text: string = fs.readFileSync(filePath, 'utf8');
    let content = fm(text);
    let markdown: string = converter.makeHtml(content.body);
    let date: Date = content.attributes['date'];
    let formattedDate: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return {
        title: content.attributes['title'],
        description: content.attributes['description'],
        date: formattedDate,
        authors: content.attributes['authors'],
        text: markdown
    };
}

export function getHtmlFromPost(postName: string): string {
    const filePath: string = postsPath + `/${postName}.md`;
    let text: string = fs.readFileSync(filePath, 'utf8');
    let html: string = converter.makeHtml(text);
    return html;
}

export function getPostNames(): string[] {
    return fs.readdirSync(postsPath).map((post) => {
        return path.basename(post, '.md');
    })
}
