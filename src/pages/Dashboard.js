import React from "react";
import { TransForm } from "../components/form/TransForm";

import { Layout } from "../components/layout/Layout";
import { TransTable } from "../components/table/TransTable";

export const Dashboard = () => {
  return (
    <div>
      <Layout>
        <div className="form">
          <TransForm />
        </div>
        <div className="table">
          <TransTable />
        </div>
      </Layout>
    </div>
  );
};
