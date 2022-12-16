import { Pagination } from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Task } from "../../model/Task";

interface PaginationProps {
  setTasks: (tasks: Task[]) => void;
}

const PaginationItems = ({ setTasks }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = useRef<number>(5);
  const [total, setTotal] = useState<number>(0);

  // retrieve the total number of items
  // @ts-ignore
  useEffect(() => {
    handlePageChange(1);
    return () => {
      setTasks([]);
    };
  }, []);

  const handlePageChange = async (page: number) => {
    const { data } = await axios.get(`http://localhost:8000/todo`, {
      params: { offset: page, limit: limit.current },
    });
    if (page === 1) {
      setTotal(data.totalLength);
    }
    setTasks(data.todosList);
    setCurrentPage(page);
  };

  return (
    <Pagination
      current={currentPage}
      onChange={handlePageChange}
      total={total}
      pageSize={limit.current}
    />
  );
};

export default PaginationItems;
