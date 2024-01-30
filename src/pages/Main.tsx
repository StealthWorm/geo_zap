import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";
import ReactTooltip from 'react-tooltip';
import { Mark } from "../components/Mark";


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdXR2bHFhcXd4cHp0eHZ2YW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAzNDU0MzcsImV4cCI6MTk3NTkyMTQzN30.1LW7YmdOiPEZqwM87NCclsyf3yP4VTjt-B7l7xJ3uHA'
const SUPABASE_URL = 'https://cdutvlqaqwxpztxvvanc.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaLocaisEmTempoReal(adicionaGrupo: any) {
  return supabaseClient.from('grupos').on('INSERT', (respostaLive) => {
    // o dado em tempo real esta dentro do grupo "new" que vem do supabase
    adicionaGrupo(respostaLive.new);
  }).subscribe();
}

interface Location {
  latitude: number;
  longitude: number;
}

export function Main() {
  const [location, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });
  const [formOpen, setFormOpen] = useState(false);
  const [local, setLocal] = useState('');
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [listaDeGrupos, setListaDeGrupos] = useState<any>([])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDu1DvraN5cjffcp9rty8MpXvodZWJYQMI",
  })

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false, },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    // Check if Geolocation is supported by the browser
    if (navigator.geolocation) {
      // Request the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          // Set the location in the state
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    supabaseClient.from('grupos').select('*').order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeGrupos(data)
      });

    const subscription = escutaLocaisEmTempoReal((novoGrupo: any) => {
      setListaDeGrupos((valorAtualDaLista: any) => {
        return [
          novoGrupo,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [formOpen]);

  function handleNovoGrupo(data: FormData) {

    const grupo = {
      nome_grupo: data.get('local'),
      descricao: data.get('description'),
      link: data.get('link'),
      latitude: location.latitude,
      longitude: location.longitude,
    };

    supabaseClient.from('grupos').insert([grupo]).then(({ data }) => {
      console.log('Dados da Inserção', data)
    });

    setLocal('');
    setDesc('');
    setLink('');
    setFormOpen(false);
  }

  return (
    <>
      <div className="flex flex-col items-center h-full justify-between px-4">
        <div className="grid w-full grid-flow-col grid-cols-3 mb-4">
          <div className="flex flex-col w-full">
            <h2 className="text-[40px] font-sans text-blue-400 font-bold">Bem vindo!!</h2>
            <h3 className="font-bold">Encontre no mapa um grupo a sua escolha</h3>
          </div>

          <div className="flex w-full items-center justify-center">
            <button onClick={() => setFormOpen(!formOpen)} className="flex max-h-12 bg-blue-400 rounded-full items-center text-[40px] px-7 hover:bg-blue-200 transition-colors" type="button" >
              +
            </button>
          </div>

          {coords && (
            <table className="flex w-full items-center justify-end text-sm">
              <tbody>
                <tr>
                  <td>latitude</td>
                  <td>{coords.latitude}</td>
                </tr>
                <tr>
                  <td>longitude</td>
                  <td>{coords.longitude}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="flex h-screen max-h-[70vh] w-full rounded-[10px] overflow-hidden border-4 border-blue-400">
          {isLoaded ? (
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={{ lat: location.latitude, lng: location.longitude }}
              zoom={15}
            >
              <Mark
                latitude={location.latitude.toString()}
                longitude={location.longitude.toString()}
                current={true}
              />

              {listaDeGrupos.map((grupo: any) => {
                return (
                  <Mark
                    key={grupo.id}
                    nome_grupo={grupo.nome_grupo}
                    descricao={grupo.descricao}
                    link={grupo.link}
                    latitude={grupo.latitude}
                    longitude={grupo.longitude}
                    current={false}
                  />
                )
              })}
              <></>
            </GoogleMap>
          ) : <></>
          }
        </div>

        <div className="flex w-full mt-4 max-h-[5rem]">
          <ul className="flex flex-row rounded-sm bg-gray-400 w-full h-[5rem] max-h-[5rem] gap-4 p-2 justify-center">
            {listaDeGrupos &&
              listaDeGrupos.map((grupo: any) => {
                return (
                  <>
                    <li
                      key={grupo.id}
                      data-tip={grupo.nome_grupo}
                      onClick={() => { window.open(grupo.link, "_blank"); }}
                      className="flex items-center rounded-sm bg-gray-300 w-[5rem] cursor-pointer shadow-md transition hover:translate-y-[-2px] hover:border-2 hover:border-blue-400">
                      <img src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/017/951/original/group_6576064.png" alt="icon" className="w-full h-full" />
                    </li>
                    <ReactTooltip />
                  </>
                )
              })
            }
            {/* <ReactTooltip /> */}
          </ul>
        </div>
      </div>

      {formOpen &&
        <div className="flex absolute w-[300px] h-auto rounded-sm shadow-md flex-col items-center top-[20%] left-[40%] bg-gray-50 px-4 py-10 backdrop-blur-md">
          <h2 className="text-blue-400 font-bold mb-4">Cadastro de grupo</h2>
          <form className="flex flex-col" onSubmit={() => {
            handleNovoGrupo;
          }}
          >
            <label className="text-blue-400">Nome do local</label>
            <input type="text" required name="local" className="border border-blue-400 rounded-sm mb-2 text-black" onChange={(event) => { setLocal(event.target.value) }}></input>
            <label className="text-blue-400">Descrição</label>
            <input type="text" required name="description" className="border border-blue-400 rounded-sm mb-2 text-black" onChange={(event) => { setDesc(event.target.value) }}></input>
            <label className="text-blue-400">Link</label>
            <input type="text" required name="link" className="border border-blue-400 rounded-sm mb-8 text-black" onChange={(event) => { setLink(event.target.value) }}></input>
            <button type="submit" className="w-full bg-blue-400 text-gray-50">ENVIAR</button>
          </form>
        </div>
      }
    </>
  )
}