import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // useEffect(() => {
  //   const url = 'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=R4zqJ5ZHschneHIM3WHmkEuBdif2TkOU&limit=5';
  //   fetch(url)
  //   .then((resp) => resp.json())
  //   .then(function(data) {
  //     // Here you get the data to modify as you please
  //     console.log(data)
  //     })
  //   .catch(function(error) {
  //     // If there is any error you will catch them here
  //     console.log(error);
  //   }); 
  // }, []);

  useEffect(() => {
    const url = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=232e35216b3f4470a1b0e848f29d4dd8&pageSize=12';
    axios.get(url)
      .then(function (result) {
        // console.log(result.data.articles);
        setNews(result.data.articles);
        setLoading(false);
      })
      .catch(function (error) {
        setError(true);
        console.log(error.message)
        setErrorMessage(error.message)
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h2>Call News API</h2>
      <div className="CardContainer">
        {loading ? (
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        ) : (
            error ? (
              <div>{errorMessage}</div>
            ) : (
                news.map((item) => (
                  <div className="Card" key={item.title}>
                    <div className="CardImage">
                      <img src={item.urlToImage} alt="news" />
                    </div>
                    <div className="CardTitle">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="CardAuthor">
                      <p>{item.description}</p>
                    </div>
                    <div className="CardLink">
                      <i className="far fa-eye" style={{color: "#fff"}}></i><a href={item.url} target="_blank" rel="noopener noreferrer">Read Article</a>
                    </div>
                  </div>
                ))
              )
          )
        }
      </div>
    </div>
  );
};

export default App;
