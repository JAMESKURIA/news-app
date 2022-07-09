import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Loading } from "../components";

const FETCH_STATIONS = gql`
  query fetchStations {
    media_station {
      media_station_name
      media_station_id
    }
  }
`;

const useStations = () => {
  const [items, setItems] = React.useState([]);

  const {
    loading: stationsLoading,
    error: stationsError,
    data: stationsData,
  } = useQuery(FETCH_STATIONS);

  // Stations data
  React.useEffect(() => {
    if (stationsData) {
      setItems(
        stationsData.media_station.map((station) => ({
          label: station.media_station_name,
          value: station.media_station_id,
        }))
      );
    }
  }, [stationsData]);

  if (stationsLoading) {
    <Loading message="Loading stations..." />;
  }

  // stations Error
  if (stationsError) {
    console.log("Error fetching stations: ", stationsError);
  }

  return items;
};

export default useStations;
