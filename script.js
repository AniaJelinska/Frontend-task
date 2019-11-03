document
    .getElementById('btn-search')
    .addEventListener('click', () => {
        clearState();
        document.getElementById("output").innerHTML = '';
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        
        search(title, year, state.page).then(showSlicedResult)
    }
    );

const state = {
    data: [],
    error: "",
    page: 1,
    totalResults: 0,
    noMoreResults: false
  }
   
function clearState () {
    state.data = [];
    state.error = "";
    state.page = 1;
    state.totalResults = 0;
    state.noMoreResults = false;
}

  async function search(title, year, page) {
    try{  
      if(title === ""){
          return;
      }  
      let url = `https://www.omdbapi.com/?s=${title}&y=${year}&page=${page}&apikey=6a0ebf5d`;
      let response = await fetch(url);
      const data = await response.json();
      
      if(data.Response === "False") {
        state.error = data.Error;
        return;
      } 
      
      state.totalResults = parseInt(data.totalResults);
      state.data = state.data.concat(data.Search);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  window.addEventListener('scroll',function() {
    if (state.totalResults <= state.data.length) {
        if (!state.noMoreResults) {
            state.noMoreResults = true;
            document.getElementById("output").innerHTML += "No more results.";
        }
        return;
    }
    if(window.scrollY > (document.body.offsetHeight - window.innerHeight)) {
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        state.page += 1;
        search(title, year, state.page).then(showSlicedResult)
    }
  })

  function showSlicedResult (){
    const outputNode =  document.getElementById("output");

    if(!!state.error) {
        outputNode.innerHTML = state.error;
        return;
    }  
    if(state.data.length === 0){
        return;
    }

    let htmlTags = state.data
      .map(elem => `<tr>
        <td>
            <img src=${elem.Poster}/>
            <div>
                <div>${elem.Title}</div>
                <div>${elem.Year}</div>
            </div>    
        </td>
     
        </tr>`)
      .reduce( (p,n) => p + n);
  
    let output = `<table>
    <tr>
      <th></th>
    </tr>
  ${htmlTags}
  </table>
 `
  outputNode.innerHTML = output;
  }












