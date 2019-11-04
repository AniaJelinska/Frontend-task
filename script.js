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
      const url = `https://www.omdbapi.com/?s=${title}&y=${year}&page=${page}&type=series&apikey=6a0ebf5d`;
      const response = await fetch(url);
      const data = await response.json();
      
      if(data.Response === "False") {
        state.error = data.Error;
        return;
      } 
      
      for(let i = 0; i < data.Search.length; i++) {
        const id = data.Search[i].imdbID;
        const urlId = `https://www.omdbapi.com/?i=${id}&apikey=6a0ebf5d`;
        const responseId = await fetch(urlId);
        const dataId = await responseId.json();
        state.data.push(dataId);
      }
      
      state.totalResults = parseInt(data.totalResults);
      
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
        <img src=${elem.Poster} onerror="this.src='/default-movie.png'"/>
        <div>
                <div>${elem.Title}</div>
                <div>${elem.Year}</div>
            </div>  
            <div class="details" id="details-plot">${elem.Plot !== "N/A" ? elem.Plot : "-" }</div>  
            <div class="details">${elem.Released}</div>
            <div class="details">${elem.Runtime !== "N/A" ? elem.Runtime : "-" }</div>
            <img class="icon" src="https://img.icons8.com/color/48/000000/star--v2.png">
            <div class="details">${elem.Ratings.length > 0 ? elem.Ratings[0].Value : "-"}</div>
            <img  class="icon" src="https://img.icons8.com/ios/50/000000/laurel-wreath.png">
            <div class="details">${elem.Awards !== "N/A" ? elem.Awards : "-" }</div>
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












