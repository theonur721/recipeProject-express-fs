import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa6";

const Card = ({ recipe }) => {
  return (
    <Link className="bg-white rounded-lg p-4 " to={`/tarif/${recipe.id}`}>
      <div className="bg-slate-600 relative">
        <img
          className="rounded-lg h-[180px] w-full object-cover"
          src={recipe.image}
        />
        <p className="p-1 absolute bottom-1 left-1 bg-white rounded-lg font-semibold flex items-center gap-2">
          <FaClock />
          <span>{recipe.recipeTime} dakika</span>
        </p>
      </div>

      <h2 className="font-bold text-lg my-3">{recipe.recipeName}</h2>
      <p className="text-gray-400">{recipe.category}</p>

      <p className="flex gap-3 mt-3">
        <span className="bg-gray-300 rounded-lg p-1 line-clamp-1 font-semibold">
          {recipe.ingredients[0]}
        </span>
        <span className="bg-gray-300 rounded-lg p-1 line-clamp-1 font-semibold">
          {recipe.ingredients[1]}
        </span>
      </p>
    </Link>
  );
};

export default Card;
