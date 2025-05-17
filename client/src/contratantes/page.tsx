import ContractorTable from "@/components/ContractorsTable/ContractorsTable";
import { useContractorData } from "@/hooks/useContractorData";
import "./Contratantes.css";

const ContractorsPage = () => {
  const { data } = useContractorData();
  return (
    <div className="contractors-table">
      {data && <ContractorTable data={data} />}
    </div>
  );
};

export default ContractorsPage;
