import React, { useState, useEffect } from "react";
import { format, compareAsc } from "date-fns";
import "../styles.css";

import api from "../services/api";

export default function Teste() {
  const [dados, setDados] = useState([]);
  const [inputData, setInputData] = useState(new Date());
  const [inputData2, setInputData2] = useState(new Date());

  useEffect(() => {
    api.get("rooms").then(res => {
      setDados(res.data);
    });
  }, []);

  function onChangeInit(value){
    setInputData(format(
      new Date(value.target.value),
      "yyyy-MM-dd"
    ))
  };

  function onChangeLast(value){
    setInputData2(format(
      new Date(value.target.value),
      "yyyy-MM-dd"
    ))
  };

  function consultar(){
    api.get(`rooms/${inputData}/${inputData2}`).then(res => {
      setDados(res.data);
    });
  }

  return (
    <div className="App">
      <div className="title">
        <h2>Monitor de luminosidade residencial</h2>
      </div>

      <div className="filterContainer">
        <label>Data da consulta</label>
        <br />
        <br />
        <label>De: </label>
        <input type="Date" value={inputData} onChange={value => onChangeInit(value)} />
        <label>Até</label>
        <input type="Date" value={inputData2} onChange={value => onChangeLast(value)} />
        <button onClick={ () => consultar()}>Consultar</button>
      </div>

      <div className="resultContainer">
        {dados.map(item => {
          return (
            <div key={item.item[0]._id} className="card">
              <h3>Tempo ligado:</h3>
              <span>{item.minutos} minutos</span>
              <h4>
                De{" "}
                {format(
                  new Date(item.item[0].createdAt),
                  "dd/MM/yyyy hh:mm:ss"
                )}
              </h4>
              <h4>
                até{" "}
                {format(
                  new Date(item.item[1].createdAt),
                  "dd/MM/yyyy hh:mm:ss"
                )}
              </h4>
            </div>
          );
        })}
      </div>
      <div className="footerContainer">
        <span>Ligado e desligado {dados.length} vezes</span>
      </div>
    </div>
  );
}
