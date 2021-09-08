import * as React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Columns } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movietable.css";
import "./../moviecard/moviecard.css";
import MovieRow from "./MovieRow";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useTable, useSortBy, usePagination } from "react-table";
import Sidebar from "./../sidebar/Sidebar";

function MovieTable({ columns, data }) {
  // const columns = data[0] && Object.keys(data[0]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy, // This plugin Hook will help to sort our table columns
    usePagination
  );

  return (
    <>
      {/* <Sidebar/> */}
      <Table
        striped
        bordered
        hover
        responsive
        className="movieTable"
        {...getTableProps()}
      >
        <thead className="fixed-table-head">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </Th>
              ))}
            </div>
          ))}
        </thead>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Rating</Th>
            <Th>Genre</Th>
            <Th>Releas</Th>
            <Th>Actors</Th>
            <Th>Run time</Th>
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      <div className="clearfix"></div>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>

        {/* <tfoot>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </Table>

      <div className="pagination">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="pageButton"
        >
          {"<<"}
        </Button>{" "}
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="pageButton"
        >
          {"<"}
        </Button>{" "}
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="pageButton"
        >
          {">"}
        </Button>{" "}
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="pageButton"
        >
          {">>"}
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span></span>{" "}
        <>
          <Col sm="2">
            <Form.Control
              as="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Form.Control>
          </Col>
        </>
      </div>
    </>
  );
}

export default MovieTable;
