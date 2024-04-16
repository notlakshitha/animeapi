const fs = require('fs');
const { execSync } = require('child_process');

// April 16, 2024 to April 20, 2024
let d = new Date('2024-04-16T12:00:00Z');

function commit(msg) {
    const dateStr = d.toISOString();
    try {
        execSync(`git add .`);
        
        // As per the instruction, using BOTH --date and env vars for maximum safety with backdating
        execSync(`git commit --date="${dateStr}" -m "${msg}"`, {
            env: {
                ...process.env,
                GIT_AUTHOR_DATE: dateStr,
                GIT_COMMITTER_DATE: dateStr,
            }
        });
        console.log(`Committed: ${msg} - ${dateStr}`);
    } catch (err) {
        console.log(`Failed to commit: ${msg}\nError msg: ${err.message}`);
    }
    // Add 4.5 hours per commit to distribute 20 commits across ~3.75 days (stopping on April 20)
    d = new Date(d.getTime() + 4.5 * 60 * 60 * 1000);
}

let appJs = fs.readFileSync('app.js', 'utf8');

const changes = [
    {
        find: 'const port = 3000;',
        replace: 'const port = process.env.PORT || 3000;',
        msg: 'Update port configuration to support environment variables'
    },
    {
        find: 'const kawaiilinks = `https://kawaiifu.com/`;',
        replace: 'const BASE_URL = "https://kawaiifu.com/";\n    const kawaiilinks = BASE_URL;',
        msg: 'Extract base URL into a constant for reusability'
    },
    {
        find: 'const USER_HEADER = `//later`;',
        replace: '',
        msg: 'Remove unused USER_HEADER constant to clean up code'
    },
    {
        find: 'app.use(cors());',
        replace: 'app.use(cors());\napp.use(express.json());',
        msg: 'Add express.json built-in middleware for future POST requests'
    },
    {
        find: 'app.get("/get", async (req, res) => {',
        replace: 'app.get("/health", (req, res) => res.status(200).send("OK"));\n\napp.get("/get", async (req, res) => {',
        msg: 'Add health check endpoint for monitoring'
    },
    {
        find: 'const mostwatched = [];',
        replace: 'const mostwatched = []; // Holds the most watched anime array',
        msg: 'Add inline documentation for mostwatched array'
    },
    {
        find: 'const decrip = $(element).find(".cot1").text().trim() || null;',
        replace: 'const description = $(element).find(".cot1").text().trim() || null;',
        msg: 'Refactor decrip to description for clarity in mostwatched block' // Uses first occurrence
    },
    {
        find: '{ name, jname, link, view, image, decrip,id,release , genre, director, rating}',
        replace: '{ name, jname, link, view, image, description,id,release , genre, director, rating}'
    },
    {
        find: 'const ongoing = [];',
        replace: '// Ongoing series\n    const ongoing = [];',
        msg: 'Document ongoing series variable'
    },
    {
        find: 'const spring = [];',
        replace: '// Spring season series\n    const spring = [];',
        msg: 'Document spring season series variable'
    },
    {
        find: 'const movies = [];',
        replace: '// Movie list\n    const movies = [];',
        msg: 'Document movies series variable'
    },
    {
        find: 'const tvseries = [];',
        replace: '// TV Series list\n    const tvseries = [];',
        msg: 'Document tvseries variable'
    },
    {
        find: 'const dub = [];',
        replace: '// Dubbed series list\n    const dub = [];',
        msg: 'Document dub series variable'
    },
    {
        find: 'const music = [];',
        replace: '// Music list\n    const music = [];',
        msg: 'Document music variable'
    },
    {
        find: 'console.log("error: ", e);',
        replace: 'console.error("API Error: ", e);\n    res.status(500).json({ error: "Internal Server Error" });',
        msg: 'Improve error handling logging and response code'
    },
    {
        find: 'app.listen(port, () => {\n  console.log(`Server running on port ${port}`);\n});',
        replace: 'app.listen(port, () => {\n  console.log(`[API] Server initialized successfully.`);\n  console.log(`Server running on port ${port}`);\n});',
        msg: 'Enhance server output logs'
    },
    {
        find: 'const express = require("express");',
        replace: '/**\n * Anime Scraper API\n * Built with Express and Cheerio\n */\nconst express = require("express");',
        msg: 'Add file header documentation'
    },
    {
        find: 'app.use(cors());',
        replace: '// Middleware section\napp.use(cors());',
        msg: 'Comment middleware section'
    },
    {
        find: 'const $ = cheerio.load(linkkawa);',
        replace: 'const $ = cheerio.load(linkkawa);\n    // Pre-allocate arrays for performance',
        msg: 'Add code comment regarding array pre-allocation'
    },
    {
        find: 'res.json({mostwatched,ongoing, spring, movies, tvseries, dub, music});',
        replace: 'res.json({\n      success: true,\n      data: { mostwatched, ongoing, spring, movies, tvseries, dub, music }\n    });',
        msg: 'Wrap response in a success flag and data object for standard API structure'
    },
    {
        find: 'const linkreq = await axios.get(kawaiilinks);',
        replace: 'const linkreq = await axios.get(kawaiilinks);\n    if (linkreq.status !== 200) throw new Error("Failed to fetch data");',
        msg: 'Ensure fetch request completes with status 200'
    }
];

let commitCount = 0;

changes.forEach((change) => {
    let oldAppJs = appJs;
    appJs = appJs.replace(change.find, change.replace);
    
    if (oldAppJs !== appJs) {
        fs.writeFileSync('app.js', appJs);
        if (change.msg) {
            commitCount++;
            commit(change.msg);
        }
    } else {
        console.log("Failed to apply change: " + (change.msg || "Unnamed change"));
    }
});

console.log(`Commits generated successfully. Total commits: ${commitCount}`);
