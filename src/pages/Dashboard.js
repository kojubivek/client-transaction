import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TransForm } from "../components/form/TransForm";

import { Layout } from "../components/layout/Layout";
import { TransTable } from "../components/table/TransTable";
import { fetchTrans } from "../utils/axiosHelper";

export const Dashboard = () => {
  const [trans, setTrans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTrans();
    const user = JSON.parse(sessionStorage.getItem("user"));
    !user && navigate("/");
  }, []);
  const getTrans = async () => {
    const { trans } = await fetchTrans();

    trans?.length && setTrans(trans);
  };
  return (
    <div>
      <Layout>
        <div className="form">
          <TransForm getTrans={getTrans} />
        </div>
        <div className="table">
          <TransTable trans={trans} getTrans={getTrans} />
        </div>
      </Layout>
    </div>
  );
};
