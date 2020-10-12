import React from 'react';
import sortBy from 'lodash/sortBy';
import Th from './th';
import Row from './tr';
import reduce from 'lodash/reduce';

const Table = props => {
  const { tableHeaders, rowData = [] } = props;
  const sortedHeaders = sortBy(tableHeaders, 'order');
  const totalWidth = reduce(
    sortedHeaders,
    (sum, header) => sum + header.width,
    0,
  );

  return (
    <div className="Bgc(white) Bdrs($xxs)">
      <Th headers={sortedHeaders} totalWidth={totalWidth} />
      <div>
        {rowData.map((row, index) => (
          <div
            key={row.id}
            className={`D(f) Ai(c) P($lg) ${
              index === rowData.length - 1 ? '' : 'Bdb($bdcardGrey)'
            }`}
          >
            <Row row={row} headers={sortedHeaders} totalWidth={totalWidth} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
