import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationProps } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Define the types for props
interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
  },
  ul: {
    '& .MuiPaginationItem-root': {
      border: '1px solid #ccc',
      borderRadius: '50%',
      margin: '0 5px',
      minWidth: '36px',
      height: '36px',
      fontSize: '16px',
      color: '#000',
      width: 'auto',
      flexShrink: 0
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#1976d2',
      color: '#fff',
      borderColor: '#1976d2'
    },
    '& .MuiPaginationItem-icon': {
      color: '#1976d2'
    }
  }
}));

const CustomPagination: React.FC<CustomPaginationProps> = ({ count, page, onChange }) => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
    const pages: number[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage < 5) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(-1, totalPages); // -1 represents ellipsis
    } else if (currentPage > totalPages - 4) {
      pages.push(1, -1);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, -1);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-1, totalPages);
    }
    return pages;
  };

  useEffect(() => {
    setVisiblePages(getVisiblePages(page, count));
  }, [page, count]);

  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape='rounded'
        variant='outlined'
        classes={{ ul: classes.ul }}
        renderItem={(item) => {
          if (item.page === -1) {
            return <PaginationItem {...item} disabled />;
          }
          return <PaginationItem {...item} />;
        }}
        siblingCount={isSmallScreen ? 1 : 4}
        boundaryCount={1}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default CustomPagination;
