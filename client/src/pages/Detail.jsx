import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // veri çekme için query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get(`/api/recipes/${id}`).then((res) => res.data),
  });

  // silme için mutate kullanılıyor
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`/api/recipes/${id}`),
    onSuccess: () => {
      navigate("/");
      toast.success("Tarif başarıyla silindi");
    },
    onError: () => toast.error("Tarif silinemedi"),
  });

  return (
    <div className="flex-1 bg-gray-200 h-screen overflow-auto p-5">
      <div className="flex justify-between">
        <Link
          to={-1}
          className="transition font-semibold text-xl flex items-center gap-4 hover:bg-gray-400 rounded-md p-1"
        >
          <IoMdArrowRoundBack /> Geri
        </Link>
        <button
          onClick={() => deleteMut.mutate()}
          className="bg-red-500 flex items-center gap-4 transition font-semibold hover:bg-red-300 rounded-md p-1 px-4 text-white"
        >
          <MdDeleteForever className="" /> Sil
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error message={error} />
      ) : (
        <div className="max-w-5xl m-auto my-10 flex flex-col">
          <h1 className=" text-3xl font-bold">{data.recipe.recipeName}</h1>
          <div className="flex gap-4 my-6">
            <span className="bg-yellow-500 text-white p-1 px-2 rounded-md">
              {data.recipe.category}
            </span>
            <span className="bg-yellow-500 text-white p-1 px-2 rounded-md flex gap-2 items-center">
              <FaClock /> {data.recipe.recipeTime}
            </span>
          </div>
          <img
            className="rounded-lg max-h-[400px]"
            src={data.recipe.image}
            alt={data.recipeName}
          />
          <div>
            <h1 className="font-bold my-5 mb-4 text-red-400 text-2xl">
              Malzemeler
            </h1>
            <ul className="font-semibold text-lg">
              <li className="font-semibold text-lg">
                {data.recipe.ingredients.map((i) => (
                  <li>{i}</li>
                ))}
              </li>
            </ul>
          </div>
          <div className="ml-5 mt-5">
            <h1 className="text-2xl font-bold mb-4 text-red-400">Tarif</h1>
            <ol className="font-semibold text-xl list-decimal">
              {data.recipe.instructions.map((i) => (
                <li>{i}</li>
              ))}
            </ol>
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-red-400 my-1">
              Sunum Önerisi
            </h1>
            <p className="text-black">{data.recipe.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
