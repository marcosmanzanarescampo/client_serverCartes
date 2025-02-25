let lastSelectedCard = 0;

const optionHandlerClick = (option) =>{
    let articles = [];

    switch(option){
        case 'GET':
            articles = [];
            articles = getData();
            articles.then(function(result){ 

                showArticles(result);

            });
            break;
        case 'PUT':
            // code
            doArticlesClickables("PUT");   
            // articles = [];
            // articles = getData();
            // articles.then(function(result){ 

            //     showArticles(result);

            // });         
            break;
        case 'DELETE':
            // code
            doArticlesClickables("DELETE");
            // articles = [];
            // articles = getData();
            // articles.then(function(result){ 

            //     showArticles(result);

            // });
            break;
        default:
            break;
    }
    
}

const showArticles = (a)=>{

    
    // Affiche des articles contenus dans la list d'articles passée par augument
    const container = document.querySelector('#data');
    container.innerHTML = "";
    const articles = JSON.parse(a);

    articles.forEach(art =>{
        const form = document.createElement('form');
        const carte = document.createElement('div');

        form.id = `form${art.id}`;
        carte.className = "card";
        carte.id = art.id;

        const cardLabel = document.createElement('p');
        cardLabel.innerText = art.id;
        cardLabel.style.textAlign = 'center';

        const id =  document.createElement('input');
        id.name = 'id';
        id.type = "hidden";     
        id.id = `id${art.id}`;
        id.value = art.id;
        id.disabled = false;
        id.style.textAlign = "center";
        id.style.backgroundColor = "yellow";

        const title = document.createElement('input');
        title.name = 'title';
        title.type = "text";
        title.id = `title${art.id}`;
        title.value = art.title;
        title.disabled = true;

        const article = document.createElement('input');
        article.name = 'content';
        article.type = "text";
        article.id = `content${art.id}`;
        article.value = art.content;
        article.disabled = true;

        const button = document.createElement("input");
        button.type = "submit";
        button.value = 'envoyer';
        button.id =  `submit${art.id}`;
        button.disabled = true;
        
        const cover = document.createElement('div');
        cover.className = 'cover';
        cover.id = `cover${art.id}`;           

        form.append(cardLabel, id, title, article, button);

        carte.appendChild(form);
        carte.appendChild(cover);

        container.appendChild(carte);
    })

}

// ***************************************** METHODS GET *************************************

const getData = async function(){


    const response = await fetch("http://localhost:4000/articles", {

        method: "GET",
      
      });
      
    //   const text = await response.json();
    const text = await response.text();
      // affice le corps de la réponse JSON
      
    return text; 
};
// ***************************************** METHODS GET *************************************


// ***************************************** METHODS PUT *************************************
const putData = async function(card, cardNumber){

    const response = await fetch(`http://localhost:4000/articles/${cardNumber}`, {

        method: "PUT",
        body: card,
      
      });
      
    //   const text = await response.json();
    const text = await response.text();

};
// ***************************************** METHODS PUT *************************************

// ***************************************** METHODS DELETE *************************************
const deleteData = async function(card, cardNumber){

    const response = await fetch(`http://localhost:4000/articles/${cardNumber}`, {

        method: "DELETE",
        body: card,
      
      });
      
    //   const text = await response.json();
    const text = await response.text();

};

// ***************************************** METHODS DELETE *************************************





// ***************************************** METHODS PUT *************************************
const doArticlesClickables = (method) => {

    // console.log(`doArticlesClickables ${method}`);

    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {

        
        if(!card.className.includes("clickableCard")){            
            card.classList.toggle("clickableCard");
        }
        
        // Evenement click d'une carte
        card.lastChild.addEventListener('click', (event) => {
            
                //On inhabilite la carte précédente
                if (lastSelectedCard != 0){
                    const lastcoverSelectedCard = document.querySelector(`#cover${lastSelectedCard}`); 
                    lastcoverSelectedCard.style.display = 'none';

                    const lastTitleSelectedCard = document.querySelector(`#title${lastSelectedCard}`);
                    const lasstContentSelectedCard = document.querySelector(`#content${lastSelectedCard}`);
                    const lastSubmitSelectedCard = document.querySelector(`#submit${lastSelectedCard}`);
                    const lastCoverSelectedCard = document.querySelector(`#cover${lastSelectedCard}`); 
                    
                    lastTitleSelectedCard.disabled = true;
                    lasstContentSelectedCard.disabled = true; 
                    lastSubmitSelectedCard.disabled = true;
                    
                    lastCoverSelectedCard.style.display = 'block';
                }
                

                // Configuration de la carte selectionnée
                const selectedCard = Number(event.target.id.replace(/[^\d]/g, ""));
                const submitSelectedCard = document.querySelector(`#submit${selectedCard}`);
                const formSelectedCard = document.querySelector(`#form${selectedCard}`);  
                
                const titleSelectedCard = document.querySelector(`#title${selectedCard}`);
                const contentSelectedCard = document.querySelector(`#content${selectedCard}`);

                titleSelectedCard.disabled = false;
                contentSelectedCard.disabled = false; 
                submitSelectedCard.disabled = false;   
                
                const coverSelectedCard = document.querySelector(`#cover${selectedCard}`); 
                coverSelectedCard.style.display = 'none';

                lastSelectedCard = selectedCard;

                // configuration du bouton 'submit' du formulaire de la carteFETCH
                formSelectedCard.addEventListener('submit', (event) => {

                    event.preventDefault();

                    if (method === "PUT"){
                        const formData = new FormData(formSelectedCard);

                        const data = {
                            id: formData.get('id'),
                            title: formData.get('title'),
                            content: formData.get('content')
                        };

                        putData(JSON.stringify(data), selectedCard);
                    }
                    else if (method === "DELETE"){

                        deleteData(JSON.stringify(data), selectedCard);

                    }

                });


        });

        card.lastChild.addEventListener('blur', (event) =>{ //card.firstChild --> cover pour la clicker, card.lastChild --> formulaire dans la carte
            const selectedCard = Number(event.target.id.replace(/[^\d]/g, ""));
            const coverSelectedCard = document.querySelector(`#cover${selectedCard}`); 

            coverSelectedCard.style.display = 'block';
        });

    });

}

// ***************************************** METHOD PUT *************************************


const initSite = () =>{


    const options = document.querySelectorAll('.optionItem');

    options.forEach(option =>{
        option.addEventListener('click', event=>{
            optionHandlerClick(event.target.id) ;         
        });
    });
};

// Main programe
initSite();