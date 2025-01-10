import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { useDebounce } from "@uidotdev/usehooks";

const Home = () => {
  // arama terimi
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);

  const debouncedTerm = useDebounce(searchTerm, 300);

  //apiye gönderilecek parametreler
  const params = {
    search: debouncedTerm,
    order,
  };

  //api isteklerinde usequery kullanımı-apiyi utils/api.js te tanıttık
  const { data, isError, isLoading } = useQuery({
    queryKey: ["recipes", debouncedTerm, order],
    queryFn: () => api.get("/api/recipes", { params }).then((res) => res.data),
  });

  return (
    <main className="flex-1 bg-gray-200 overflow-auto">
      <section>
        <div className="ml-5 mr-5 mt-5 flex flex-row gap-3 p-2 rounded-lg bg-white items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
            type="text"
          />
        </div>
      </section>

      <section className="ml-5 mr-5">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            <div className="ml-5 mr-5 flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.results} tarif bulundu</h1>

              <select
                onChange={(e) => setOrder(e.target.value)}
                className="rounded-md p-2"
              >
                <option selected disabled>
                  Süreye Göre
                </option>
                <option value="asc">Artan</option>
                <option value="desc">Azalan</option>
              </select>
            </div>

            {/* TODO KARTLARI OLUŞTUR */}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols3">
              {data.recipes.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
