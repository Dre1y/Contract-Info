import { Link } from "react-router-dom";
import "./Sidebar.css";
import logoGetinfo from "../../assets/logo-getinfo.png";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUserFriends,
  FaFileContract,
  FaChartBar,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

const itensMenu = [
  { nome: "Início", icone: <FaTachometerAlt />, path: "/" },
  { nome: "Dashboard", icone: <FaTachometerAlt />, path: "/dashboard" },
  {
    nome: "Contratos",
    icone: <FaFileAlt />,
    path: "/gerenciamento-contratos",
  },
  { nome: "Contratantes", icone: <FaUserFriends />, path: "/clientes" },
  { nome: "Aditivos", icone: <FaFileContract />, path: "/aditivos" },
  { nome: "Repactuações", icone: <FaChartBar />, path: "/repactuacoes" },
  { nome: "Entregáveis", icone: <FaShoppingCart />, path: "/compras" },
  { nome: "Sair", icone: <FaSignOutAlt />, path: "/sair" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar-agenda">
      <div className="sidebar-logo">
        <img src={logoGetinfo} alt="Logo Getinfo" className="logo-getinfo" />
      </div>
      <nav>
        <ul>
          {itensMenu.map((item, idx) => (
            <li key={idx} className="sidebar-item">
              <Link to={item.path} className="sidebar-link">
                <span className="sidebar-icon">{item.icone}</span>
                <span className="sidebar-label">{item.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
