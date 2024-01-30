import { Marker } from "@react-google-maps/api";
import ReactTooltip from 'react-tooltip'

interface MarkProps {
  id?: number;
  nome_grupo?: string;
  descricao?: string;
  link?: string;
  latitude: string;
  longitude: string;
  current?: boolean;
}

export function Mark(props: MarkProps) {
  const { current, nome_grupo, latitude, longitude, link } = props

  const icon = {
    url: current ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/800px-Map_pin_icon_green.svg.png"
      : "https://danielsspectrum.ca/wp-content/uploads/2016/12/BigPin.png",

    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    // anchor: new google.maps.Point(0, 0) // anchor
  };

  return (
    <div className="w-6 h-6">
      <Marker
        animation={current ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
        title={nome_grupo}
        position={{
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        }}
        icon={icon}
        onClick={() => { window.open(link, "_blank"); }}
      >
      </Marker>
      <ReactTooltip id="registerTip" place="top" effect="solid">
        {nome_grupo}
      </ReactTooltip>
    </div>
  )
}