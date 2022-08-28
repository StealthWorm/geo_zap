import { useState } from "react";

export function Form() {
  const [location, setLocation] = useState({ latitude: -25.081489, longitude: -50.169198 });

  return (
    <div className="flex absolute w-[300px] h-[500px] rounded-md shadow-md">
      <h2>Cadastro de grupo</h2>
      <form className="flex flex-col">
        <label className="">Nome do local</label>
        <input type="text" className=""></input>
        <label className="">Descrição</label>
        <input type="text" className=""></input>
        <label className="">Nome do local</label>
        <input type="text" className=""></input>
      </form>
    </div>
  )
}