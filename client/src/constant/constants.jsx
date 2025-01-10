import { IoHome, IoCreate } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";

export const links = [
  { icon: <IoHome />, title: "Anasayfa", path: "/" },
  { icon: <IoCreate />, title: "Oluştur", path: "/ekle" },
  { icon: <FaRegCompass />, title: "Keşfet", path: "/kesfet" },
  { icon: <MdFavorite />, title: "Favoriler", path: "/favoriler" },
  { icon: <IoIosHelpCircle />, title: "Yardım", path: "/yardim" },
];
