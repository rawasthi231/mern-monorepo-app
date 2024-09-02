import { useCallback, useEffect, useState } from "react";

import ReactSmartTableComponent from "react-smart-table-component";

import { User } from "./typings";

import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/users").then((res) =>
        res.json()
      );
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users", error);
      setUsers([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <ReactSmartTableComponent
        items={users}
        search
        searchableFields={["name", "email", "phone", "website"]}
        searchBoxPlaceholder="Search users"
        className="table"
        loading={loading}
        headings={[
          {
            fieldName: "name",
            title: "Name",
          },
          {
            fieldName: "email",
            title: "Email",
          },
          {
            fieldName: "phone",
            title: "Phone",
          },
          {
            fieldName: "website",
            title: "Website",
          },
          {
            fieldName: "company",
            title: "Company",
          },
          {
            fieldName: "address",
            title: "City",
          },
        ]}
        scopedFields={{
          company: (item) => <td>{item.company.name}</td>,
          address: (item) => <td>{item.address.street}</td>,
        }}
      />
    </>
  );
}

export default App;
