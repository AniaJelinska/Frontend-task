async function search(title, year, sortByProperty) {
  try{
    let url = `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=6a0ebf5d`;
    let response = await fetch(url);
    const data = await response.json();
    const z = sortBy(data, sortByProperty);

    console.log(z);
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


doSomethign("Avengers", '', "");



