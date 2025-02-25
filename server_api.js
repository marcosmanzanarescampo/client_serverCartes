const http = require("http");
const { log } = require("util");
const fs = require("fs").promises;

// extraction de l'élement à éliminer/modifier d'un URL
const takeElement = (url) => {
    const element = url.substring(url.lastIndexOf('/') + 1);
    return element;
}

// Lecture du fichier JSON
async function readArticles() {
    const data = await fs.readFile("articles.json", "utf8");
    return JSON.parse(data);
}

// Écriture dans le fichier JSON
async function writeArticles(articles) {
    await fs.writeFile("articles.json", JSON.stringify(articles, null, 2));
}

const server = http.createServer(async (req, res) => {
    // Headers CORS
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Gestion du preflight CORS
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Logging des requêtes
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Routes API
        //   ********************************************************************************* GET *****************************************
    if (req.url === "/articles" && req.method === "GET") {
      console.log('Serving GET...');
      
        const articles = await readArticles();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(articles));
    } else if (req.url === "/articles" && req.method === "POST") {
      console.log('Serving POST...');
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
            try {
                const article = JSON.parse(body);
                const articles = await readArticles();
                article.id = Date.now(); // Simple ID unique
                articles.push(article);
                await writeArticles(articles);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(article));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid data" }));
            }
        });
            //   ********************************************************************************* GET *****************************************
    } else if (req.url.match(/\/articles\/\d+$/) && req.method === "DELETE") {      
      //Code
    //   ********************************************************************************* DELETE *****************************************
// 1. Lire tous les articles
// 2. Remplacer l'ancien article par le nouveau article
// 3. Ecrire la liste d'articles de nouveau dans le fichier

            // 1
            const articles = await readArticles();            
            let newArticles = [];
            const elementAEliminer = takeElement(req.url);
            console.log(`èlement à éliminer ${elementAEliminer}`);
            

            // 2

            articles.forEach(element => {

                console.log(`${element.id} = ${elementAEliminer}:`);

                if(parseInt(element.id) === parseInt(elementAEliminer)){  
                }
                else{
                    newArticles.push(element);                 
                }                
            }); 
            
            console.log(newArticles);
            
            // 3
            await writeArticles(newArticles);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newArticles));

    //   ********************************************************************************* DELETE *****************************************
      console.log('Serving DELETE...');
    } else if (req.url.match(/\/articles\/\d+$/) && req.method === "PUT") {
      //   ********************************************************************************* PUT *****************************************
      //Code
      console.log('Serving PUT...');
    // 1. Recuperer l'element à modifier
    // 2. Le remplacer
    // 3. Recrire le fichier 

    // 1
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
        try {

            const elementAModifier = JSON.parse(body);

            // 1. Lire tous les articles
            // 2. Remplacer l'ancien article par le nouveau article
            // 3. Ecrire la liste d'articles de nouveau dans le fichier
            
            // 1
            const articles = await readArticles();            
            let newArticles = [];

            // 2

            articles.forEach(element => {

                console.log(`${element.id} = ${elementAModifier.id}:`);

                if(parseInt(element.id) === parseInt(elementAModifier.id)){  
                    console.log('including nouveau...');                                      
                    newArticles.push(elementAModifier);
                }
                else{
                    console.log('including ancien...');
                    newArticles.push(element);                 
                }                
            }); 
            
            console.log(newArticles);
            
            // 3
            await writeArticles(newArticles);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newArticles));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid data" }));
        }
    });
    
      //   ********************************************************************************* PUT *****************************************


    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

server.listen(4000, () => {
    console.log("API Server running on http://localhost:4000");
});

