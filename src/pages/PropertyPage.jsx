import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

const PropertyPage = () => {
  const { externalID } = useParams();
  const [allData, setAllData] = useState([]);
  // const [property, setProperty] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      const response = await useFetch(
        "https://bayut.p.rapidapi.com/properties/detail",
        { externalID }
      );
      setAllData(response);
    };
    GetData();
  }, [externalID]);

  // console.log(allData);

  return (
    <section>
      <div className=" text-center">{allData.contactName}</div>
    </section>
  );
};

export default PropertyPage;
