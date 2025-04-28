import { Link } from "react-router-dom";
import "./Sidebar.css";
import logoGetinfo from "../../assets/logo-getinfo.png";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaCashRegister,
  FaUserFriends,
  FaUserTie,
  FaFileContract,
  FaChartBar,
  FaShoppingCart,
  FaDatabase,
  FaStethoscope,
  FaKey,
  FaCog,
  FaFileInvoice,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

const itensMenu = [
  { nome: "Dashboard", icone: <FaTachometerAlt />, path: "/" },
  {
    nome: "Gerenciamento Contratos",
    icone: <FaFileAlt />,
    path: "/gerenciamento-contratos",
  },
  { nome: "Caixa", icone: <FaCashRegister />, path: "/caixa" },
  { nome: "Clientes", icone: <FaUserFriends />, path: "/clientes" },
  { nome: "Profissional", icone: <FaUserTie />, path: "/profissional" },
  { nome: "Aditivos", icone: <FaFileContract />, path: "/aditivos" },
  { nome: "Repactuações", icone: <FaChartBar />, path: "/repactuacoes" },
  { nome: "Análise", icone: <FaChartBar />, path: "/analise" },
  { nome: "Compras", icone: <FaShoppingCart />, path: "/compras" },
  { nome: "Cadastros Gerais", icone: <FaDatabase />, path: "/cadastros" },
  { nome: "Consulta", icone: <FaStethoscope />, path: "/consulta" },
  { nome: "Permissões", icone: <FaKey />, path: "/permissoes" },
  { nome: "Configurações", icone: <FaCog />, path: "/configuracoes" },
  { nome: "NFS-e", icone: <FaFileInvoice />, path: "/nfse" },
  { nome: "Ajuda", icone: <FaQuestionCircle />, path: "/ajuda" },
  { nome: "Sair", icone: <FaSignOutAlt />, path: "/sair" },
  { nome: "Administrativo", icone: <FaUserShield />, path: "/admin" },
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
