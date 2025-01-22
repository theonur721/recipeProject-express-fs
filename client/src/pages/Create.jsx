import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { toast } from "react-toastify";

const Layout = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
};

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigate = useNavigate();

  //api isteği
  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (newRecipe) =>
      api
        .post("/api/recipes", newRecipe)
        .then((res) => res.data)
        .catch((err) => console.warn(err, "HATA OLUŞTU")),

    //api isteği başarılı olursa çalışır
    onSuccess: () => {
      toast.success("Tarif başarıyla eklendi");
      navigate("/");
    },
    //api isteği başarısız olursa çalışır
    onError: () => {
      toast.error("Tarif eklenemedi");
    },
  });

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // bütün input ve textarealardaki verilerden nesne oluştur
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions: instructions.split("\n"), // Metni diziye çeviriyoruz
      servingSuggestion: newRecipe.servingSuggestions,
      image: `https://picsum.photos/5${Math.round(Math.random() * 89) + 10}`,
    };
    delete newRecipe.servingSuggestions;
    // api isteği at veriyi kaydet
    mutate(newRecipe);
  };

  return (
    <div className="flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className="text-3xl font-bold text-red-400">Yeni Tarif Oluştur</h1>
        <Layout label="Tarif Başlığı">
          <input
            required
            name="recipeName"
            className="rounded-md p-2 focus:outline-red-400"
            type="text"
          />
        </Layout>

        <Layout label="Tarif Kategorisi">
          <input
            name="category"
            required
            className="rounded-md p-2 focus:outline-red-400"
            type="text"
          />
        </Layout>

        <Layout label="Tarif Süresi">
          <input
            type="number"
            name="recipeTime"
            required
            className="rounded-md p-2 focus:outline-red-400"
            min={3}
            max={300}
          />
        </Layout>

        <Layout label="Malzemeler">
          <Select
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
            isMulti
            required
          />
        </Layout>

        <Layout label="Tarif">
          <textarea
            required
            name="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Her bir adımı yeni bir satıra yazın"
            className="rounded-md p-2 focus:outline-red-400 h-40"
          />
        </Layout>

        <Layout label="Sunum Önerisi">
          <textarea
            required
            name="servingSuggestions"
            className="rounded-md p-2 focus:outline-red-400"
          />
        </Layout>

        <div className="flex justify-end gap-6">
          <Link
            className="bg-gray-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500"
            to={"/"}
          >
            İptal
          </Link>
          <button
            type="submit"
            className="bg-red-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-red-500"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
