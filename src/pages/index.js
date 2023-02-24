import { useMemo, useState } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import {LocationSearchingIcon} from '@mui/icons-material';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption

} from '@reach/combobox'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import SearchCard from 'component/SearchCard';
import PlaceIcon from '@mui/icons-material/Place';

import { useSelector, useDispatch} from 'react-redux'
import { addSearch } from '../store/indexSlice'

const libraries = ['places'];
// const apiKey = 'AIzaSyDUuimn5T9m40ISQC_MllDzXUsJLCohOh4'
let removeCurrLocation = false;
let refreshKey = 1;
export default function Home() {
  const storeApi = useSelector((state) => state.apiKey)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: storeApi,
    libraries
  })

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map key={refreshKey}/>
      {/* <SearchCard/> */}
    </>
  ) 
}


function Map() {
  const center = useMemo(() => ({ lat:18.735693, lng: -70.162651}), []);
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className='places-container'>
          <PlacesAutoComplete setSelected={setSelected}/>
          
      </div>
      <GoogleMap
        options={{
          mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
          }, // here´s the array of controls
          // disableDefaultUI: true,
          mapTypeControl: false,
          }}  
        zoom={10} center={selected} mapContainerClassName='map-container'>
          {selected && <MarkerF  position={selected}/>}
      </GoogleMap>
    </>
  )
}

const PlacesAutoComplete = ( {setSelected} ) => {
  const [storeLocation, setStoreLocation] = useState([]);
  const storeArry = useSelector((state) => state.searchHistory)
  const dispatch = useDispatch()
  getLocation();
  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    removeCurrLocation = true;
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({address});
    const {lat, lng} = getLatLng(results[0]) 
    setSelected({lat, lng})

    //Store user and save in redux
    let store = [...storeLocation];

    if (storeArry.indexOf(address) !== -1) {
      return;
    } 
    else {
      // store.push(address);
      dispatch(addSearch(address));
    }

    setStoreLocation(store);
  }

  function getLocation() {
    if (removeCurrLocation) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      setSelected({lat, lng})
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:s
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }


  return (
    <>
      <div>
        <SearchCard searchHistory={storeLocation} handleSelect={handleSelect}>
        <Combobox onSelect={handleSelect}>
          <div className='position-relative'>
            <ComboboxInput value={value} onChange={(e) => {setValue(e.target.value)}} disabled={!ready}
            className="combobox input" placeholder='Search Location'
            />
            <PlaceIcon style={{position: 'absolute', top: 7, left: 8}} htmlColor='#663399'/>
            <span style={{position: 'absolute', top: 10, right: 14, zIndex: 3, cursor: 'pointer'}}
              onClick={() => {setValue('')}}              
            >&times;</span>
          </div>
          <ComboboxPopover className='combobox-list'>
            <ComboboxList>  
              {status === "OK" && data.map(({place_id, description}) => 
                <ComboboxOption className="combobox option" key={place_id} value={description}/>)}
            </ComboboxList>
          </ComboboxPopover>  
        </Combobox>
        </SearchCard>
      </div>
    </>
  ) 
}