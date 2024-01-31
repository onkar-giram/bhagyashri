import React, { useState, useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Table } from "flowbite-react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home/users");

        const json = await response.json();
        console.log("Fetched Data:", json); //
        setData(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.map((item) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.username}
                </Table.Cell>
                <Table.Cell>{item.createdAt}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>
                  <span className="flex">
                    <CiSettings className="text-blue-500 size-5" />
                    <CiCircleRemove className="text-red-700 size-5" />
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
