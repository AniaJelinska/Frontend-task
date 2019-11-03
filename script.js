document
    .getElementById('btn-search')
    .addEventListener('click', () => {
        clearState();
        document.getElementById("output").innerHTML = '';
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const sortByProperty = getValueFromRadioBtn();
        search(title, year, sortByProperty).then(() => showSlicedResult(sortByProperty))
    }
    );

 function getValueFromRadioBtn(){
    const radios = document.getElementsByName('radioselector');

    for (var i = 0, length = radios.length; i < length; i++){
        if (radios[i].checked){
            return radios[i].value;
        }
    }
 }   


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
      if(title === ""){
          return;
      }  
      let url = `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=6a0ebf5d`;
      let response = await fetch(url);
      const data = await response.json();
      if(data.Response === "False") {
        state.error = data.Error;
        return;
      } 
      
      state.data = data.Search;
  
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
    return data.Search;
  }
  
  function sortByTitle(data){
     return data.sort((a,b) => {
        if(a.Title < b.Title) 
          return -1; 
        if(a.Title > b.Title) 
          return 1;
  
        return 0;
      })
  }
  
  function sortByYear(data){
     return data.sort((a,b) => {
        if(a.Year < b.Year) 
          return -1; 
        if(a.Year > b.Year) 
          return 1;
  
        return 0;
      })
  }
  
  window.addEventListener('scroll',function() {
    scrollHeight = this.scrollY;
    if(scrollHeight = 125) {
        const sortByProperty = getValueFromRadioBtn();
        showSlicedResult(sortByProperty);
    }
  })

  function showSlicedResult (sortByProperty){
    if(!!state.error) {
        document.getElementById("output").innerHTML = state.error;
        return;
    }  
    if(state.data.length === 0){
        return;
    }

    let newNumberOfResult = state.lastNumberOfResults + 12;
    state.lastNumberOfResults = newNumberOfResult;
  
    let slicedResult = state.data.slice(0,newNumberOfResult);
    let sorted = sortBy(slicedResult, sortByProperty);
    let htmlTags = sorted
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
  
  let x =  document.getElementById("output");
  x.innerHTML = output;
  }












