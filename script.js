

document
    .getElementById('btn-search')
    .addEventListener('click', () => {
        clearState();
        document.getElementById("output").innerHTML = '';
        let title = document.getElementById("title").value
        search(title, "", "Title").then(showSlicedResult)
    }
    );

const state = {
    lastNumberOfResults: 0,
    data: [],
    error: ""
  }
  
  
function clearState () {
    state.data = [];
    state.lastNumberOfResults = 0;
    state.error = "";
}

  async function search(title, year, sortByProperty) {
    try{  
      let url = `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=6a0ebf5d`;
      let response = await fetch(url);
      const data = await response.json();
      if(data.Response === "False") {
        state.error = data.Error;
        return;
      } 
      
      state.data = sortBy(data, sortByProperty);
  
    } catch (error) {
      console.log(error);
    }
  }
  
  function sortBy(data, sortByProperty){
    if (sortByProperty === "Title") {
      return sortByTitle(data);
    }
    if(sortByProperty === "Year"){
      return sortByYear(data);
    }
    return data;
  }
  
  function sortByTitle(data){
     return data.Search.sort((a,b) => {
        if(a.Title < b.Title) 
          return -1; 
        if(a.Title > b.Title) 
          return 1;
  
        return 0;
      })
  }
  
  function sortByYear(data){
     return data.Search.sort((a,b) => {
        if(a.Year < b.Year) 
          return -1; 
        if(a.Year > b.Year) 
          return 1;
  
        return 0;
      })
  }
  
  function showSlicedResult (){
    if(!!state.error) {
        document.getElementById("output").innerHTML = state.error;
        return;
    }  

    let newNumberOfResult = state.lastNumberOfResults + 2;
    state.lastNumberOfResults = newNumberOfResult;
  
    let slicedResult = state.data.slice(0,newNumberOfResult);
    let htmlTags = slicedResult
      .map(elem => `<tr>
        <td>
            <img src=${elem.Poster}/>
        </td>
        <td>${elem.Title}</td>
        <td>${elem.Year}</td>
        </tr>`)
      .reduce( (p,n) => p + n);
  
    let output = `<table>
    <tr>
      <th>Title</th>
      <th>Year</th>
      <th>Poster</th>
    </tr>
  ${htmlTags}
  </table>`
  
  let x =  document.getElementById("output");
  x.innerHTML = output;
  }







