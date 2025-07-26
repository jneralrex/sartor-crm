import React, { useState } from 'react';
import UserActionNav from '../components/UserActionNav';
import ProductsTable from '../dataset/tables/ProductsTable';


const Product = () => {
  const [activeTab, setActiveTab] = useState('All Employees');

  return (
    <>
      <nav className="outlet-frame">
        <h1 className="outlet-title">Products</h1>
        <div className="z-10">
          <UserActionNav />
        </div>
      </nav>
      <section className="p-6">
        <ProductsTable activeTab={activeTab}/>
      </section>
    </>
  );
};

export default Product;
