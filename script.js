{
    let int = 6;
    let characters = document.querySelector(".characters");
    let children = characters.children;
    const btnPrev = document.getElementById("buttons__previous");
    const btnNext = document.getElementById("buttons__next");
    
    const prev = () =>{
      characters.prepend(children[children.length-1]);
      if(int <= 1){
        int = 20;
      }
      else{
        int--;
      }
      handleCharacterChange();
    }

    window.addEventListener("wheel", e => e.deltaY < 0 ? prev() : next())

    const next = () =>{
      characters.appendChild(characters.children[0])
      if(int >= 20){
        int = 1;
      }
      else{
        int++;
      }
      handleCharacterChange();
    }
    
    btnPrev.addEventListener("click",prev);
    btnNext.addEventListener("click",next);
    window.addEventListener("scroll", ()=>{
      console.log("scrolled");
    });
  
    const getCharacters = async charName => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${charName}`);
      const characters = await response.json();
      showCharacters(characters.results);
    }
  
    const showCharacters = characters => {
      document.querySelector(`.characters`).innerHTML = ``;
      characters&&characters.forEach(character => {
        const $fig = document.createElement(`figure`);
        $fig.classList.add(`characters__item`);
  
        const $img = document.createElement(`img`);   
        $img.setAttribute(`src`, character.image);
          
        $fig.dataset.id = character.id;
  
        $fig.appendChild($img);
        document.querySelector(`.characters`).appendChild($fig);
      });
    };
  
    const handleCharacterChange = () => {
      showCharacterDetail(int);
    }
  
    const showCharacterDetail = async id => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
    
      
      document.querySelector(`.character-details`).innerHTML = `
      <div id="character-details--left">
        <img src="${data.image}" width="450" height="450" alt="thumbnail">
      </div>
      <div id="character-details--right">
        <h2 class="character__title">${data.name}</h2>         
          <p class="character__instructions">Gender: ${data.gender}</p>
          <p class="character__instructions">Species: ${data.species}</p>
          <p class="character__instructions">Status: ${data.status}</p>
          <p class="character__instructions">Origin: ${data.origin.name}</p>
      </div>
      `;
    };
    
    let init = () => {

      getCharacters("");
      handleCharacterChange();
    };
    
    init();
  }
  