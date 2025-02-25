let lastSelectedCard = 0;

const optionHandlerClick = (option) =>{

    switch(option){
        case 'GET': 
                const articles = getData();
                articles.then(function(result){                
                showArticles(result);
                });
            break;
        case 'PUT':
            // code
            doArticlesClickables();
            break;
        case 'DELETE':
            // code
            doArticlesClickables();
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
        carte.className = "card";
        carte.id = art.id;

        const id =  document.createElement('input');
        id.type = "text";     
        id.id = `id${art.id}`;
        id.style.textAlign = "center";
        id.style.backgroundColor = "yellow";
        const title = document.createElement('input');
        title.type = "text";
        title.id = `title${art.id}`;
        const article = document.createElement('input');
        article.type = "text";
        article.id = `content${art.id}`;
        const button = document.createElement("input");
        button.type = "submit";

        const cover = document.createElement('div');
        cover.className = 'cover';
        cover.id = `cover${art.id}`;
        
        id.value = art.id;
        id.disabled = true;
        title.value = art.title;
        title.disabled = true;
        article.disabled = true;

        article.value = art.content;
        button.value = 'envoyer';
        button.id =  `submit${art.id}`;
        button.disabled = true;

        form.append(id, title, article, button);
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
const doArticlesClickables = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {

            if(!card.className.includes("clickableCard")){            
                card.classList.toggle("clickableCard");
            }

            card.lastChild.addEventListener('click', (event) => {

                const selectedCard = Number(event.target.id.replace(/[^\d]/g, ""));

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
                

                console.log("selected card: " + selectedCard);
                console.log("last selected card: " + lastSelectedCard);


                const titleSelectedCard = document.querySelector(`#title${selectedCard}`);
                const contentSelectedCard = document.querySelector(`#content${selectedCard}`);
                const submitSelectedCard = document.querySelector(`#submit${selectedCard}`);  

                titleSelectedCard.disabled = false;
                contentSelectedCard.disabled = false; 
                submitSelectedCard.disabled = false;   
                
                const coverSelectedCard = document.querySelector(`#cover${selectedCard}`); 
                coverSelectedCard.style.display = 'none';

                lastSelectedCard = selectedCard;
            })

            card.lastChild.addEventListener('blur', (event) =>{
                const selectedCard = Number(event.target.id.replace(/[^\d]/g, ""));

                const coverSelectedCard = document.querySelector(`#cover${selectedCard}`); 
                coverSelectedCard.style.display = 'block';
            })

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

