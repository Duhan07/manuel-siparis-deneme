import { useState } from "react";
import {
  useDistricts,
  useDistrictById,
  useNeighbourhoodById,
  useStreetById,
} from "../api/geo-entities";

const FindLocationByAddress = ({
  selectedDistrictId,
  selectedNeighbourhoodId,
  selectedStreetId,
}) => {
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [streets, setStreets] = useState([]);

  const { data: districtsData } = useDistricts({
    enabled: true,
  });

  const { data: districtDataById } = useDistrictById({
    enabled: !!selectedDistrictId,
    id: selectedDistrictId,
    onSuccess: (data) => {
      setNeighbourhoods(data?.neighbourhoods);
    },
  });

  const { data: neighbourhoodDataById } = useNeighbourhoodById({
    enabled: !!selectedNeighbourhoodId,
    id: selectedNeighbourhoodId,
    onSuccess: (data) => {
      setStreets(data?.streets);
    },
  });

  const { data: streetDataById } = useStreetById({
    enabled: !!selectedStreetId,
    id: selectedStreetId,
  });

  return {
    neighbourhoods,
    streets,
    districtsData,
    streetDataById,
  };
};

export default FindLocationByAddress;
