import React from 'react';
import Table from 'components/molecules/Table';
const AllProjects = ({ projects }) => {
  const tableHeaders = [
    {
      heading: 'Name',
      key: 'name',
      order: 1,
      width: 1,
    },
    {
      heading: 'Status',
      key: 'status',
      order: 2,
      type: 'tag',
      width: 0.8,
    },
    {
      heading: 'Budget',
      key: 'budget',
      order: 3,
      width: 0.8,
      type: 'currency',
    },
    {
      heading: 'Tags',
      key: 'tags',
      type: 'tagArray',
      order: 4,
      width: 2,
    },
    {
      heading: 'Date of Creation',
      key: 'createdOn',
      order: 5,
      width: 1.2,
      type: 'dateString',
    },
    {
      heading: 'Completion',
      key: 'completion',
      order: 6,
      width: 1.5,
      type: 'progressPercentage',
    },
  ];
  return (
    <div className="Mt($3xl)">
      <Table tableHeaders={tableHeaders} rowData={projects} />
    </div>
  );
};

export default AllProjects;
