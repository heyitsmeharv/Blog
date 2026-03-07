import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
`;

const StyledTableHeading = styled.th`
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};
  font-weight: bold;
  text-align: center;
  padding: 1rem;

`;

const StyledTableData = styled.td`
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};
  text-align: center;
  padding: 2rem;
`;

const Table = ({ columns, data, categoryValues }) => {
  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map(column => (
          <StyledTableHeading key={column}>{column}</StyledTableHeading>
        ))}
      </tr>
    );
  }

  const renderTableData = () => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          {columns.map(column => (
            <StyledTableData key={column}>{item[column]}</StyledTableData>
          ))}
        </tr>
      );
    });
  }

  return (
    <StyledTable className="table">
      <thead>{renderTableHeader()}</thead>
      <tbody>{renderTableData()}</tbody>
    </StyledTable>
  );
}

export default Table;