import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";

import {
  carParkImg,
  bathtubImg,
  arrowsOutImg,
  personImg,
  favImg,
  addImg,
  shareImg,
} from "../assets";
import ReactPaginate from "react-paginate";

const PropertiesCards = ({ hitsPerPage, hasPaginate }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [propertiesData, setPropertiesData] = useState([]);
  const [page, setPage] = useState(searchParams.get("page") || 0);

  const allDataParams = {
    locationExternalIDs: "5002,6020",
    purpose: "for-rent",
    hitsPerPage: hitsPerPage || 25,
    page: page,
    lang: "en",
    sort: "city-level-score",
    rentFrequency: "monthly",
    categoryExternalID: "4",
  };

  const handlePaginate = (data) => {
    const currentPage = data.selected;
    setPage(currentPage);
    setSearchParams({ page: currentPage });
  };

  useEffect(() => {
    //fetch properties data from api
    const GetData = async () => {
      const response = await useFetch(
        "https://bayut.p.rapidapi.com/properties/list",
        allDataParams
      );
      setPropertiesData(response.hits);
    };
    GetData();
  }, [page]);

  return (
    <section>
      <div className="flex flex-wrap gap-3 justify-center">
        {propertiesData.map((property) => (
          <Link key={property.id} to={property.externalID}>
            <div className="flex flex-col py-[15px] px-[13px] w-[380px] border-2 rounded-[10px] gap-5">
              <img
                className="w-full h-[200px] rounded-[10px]"
                src={property.coverPhoto.url}
                alt=""
              />
              <div className="flex flex-row justify-between">
                <span className=" capitalize font-semibold text-[#4A60A1] text-base">
                  {property.purpose}
                </span>
                <span className="text-[#fff] bg-[#4A60A1] items-center p-1 rounded-lg font-normal text-[14px]">
                  {property.isVerified ? "verified" : "not verified"}
                </span>
              </div>
              <p className="text-[#6D737A] max-w-[300px] h-[50px]">
                {property.title}
              </p>
              <div className=" flex flex-row justify-between text-[#6D737A]">
                <span className=" font-semibold text-[#4A60A1]">
                  ${property.price}
                </span>
                <span>{property.rentFrequency}</span>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-1 text-[#6D737A]">
                  <img src={carParkImg} alt="parking" />{" "}
                  <span>{property.rooms}</span>
                </div>
                <div className="flex gap-1 text-[#6D737A]">
                  <img src={bathtubImg} alt="bathrooms" />{" "}
                  <span>{property.baths}</span>
                </div>
                <div className="flex gap-1 text-[#6D737A]">
                  <img src={arrowsOutImg} alt="area" />{" "}
                  <span>{property.area} m</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold text-[#4A60A1]">
                  <img
                    className="w-[30px] h-[30px]"
                    src={personImg}
                    alt="person"
                  />{" "}
                  {property.contactName}
                </div>
                <div className="flex gap-2 items-center">
                  <img className="w-[20px] h-[20px]" src={addImg} alt="add" />
                  <img className="w-[20px] h-[20px]" src={favImg} alt="fav" />
                  <img
                    className="w-[20px] h-[20px]"
                    src={shareImg}
                    alt="share"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasPaginate && (
        <ReactPaginate
          className=" flex justify-center gap-5 mt-[80px]"
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={propertiesData.length / 8}
          onPageChange={handlePaginate}
          previousClassName="bg-[#EDEFF6] text-[#6D737A] w-[40px] h-[40px] flex items-center justify-center rounded-[4px]"
          nextClassName="bg-[#4A60A1] text-[#fff] w-[40px] h-[40px] flex items-center justify-center rounded-[4px]"
          activeClassName="bg-[#4A60A1] text-[#fff] "
          pageClassName="font-semibold text-[#4A60A1] w-[40px] h-[40px] flex items-center justify-center rounded-[4px]"
        />
      )}
    </section>
  );
};

export default PropertiesCards;
