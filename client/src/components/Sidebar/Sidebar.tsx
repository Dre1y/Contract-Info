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
  FaClipboardList,
  FaStore,
} from "react-icons/fa";

const itensMenu = [
  {
    nome: "Contratos",
    icone: <FaFileAlt />,
    path: "/gerenciamento-contratos",
  },
  { nome: "Contratantes", icone: <FaUserFriends />, path: "/contratantes" },
  { nome: "Aditivos", icone: <FaFileContract />, path: "/aditivos" },
  { nome: "Repactuações", icone: <FaChartBar />, path: "/repactuacoes" },
  { nome: "Entregáveis", icone: <FaShoppingCart />, path: "/entregaveis" },
  {
    nome: "Ordens de Serviços",
    icone: <FaClipboardList />,
    path: "/ordens-servico",
  },
  { nome: "Postos de Serviços", icone: <FaStore />, path: "/postos-servico" },
  { nome: "Sair", icone: <FaSignOutAlt />, path: "/sair" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar-agenda">
      <div className="sidebar-logo">
        <img
          src="/src/assets/logo-getinfoBack.png"
          alt="Logo Getinfo"
          className="logo-getinfo"
        />
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
