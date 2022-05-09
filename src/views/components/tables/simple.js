import { format } from 'date-fns';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  TablePagination,
  TableContainer
} from '@mui/material';
import { SeverityPill } from '../severity-pill';
import { strings } from '../../../i18n';
import { useState } from 'react';


export const SimpleTable = (props) => {
    const {strPrefix, columns, items} = props;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
      };
    
    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };    

    return(
        <Card>
          <CardHeader title={strings(`${strPrefix}.title`)} />
          <PerfectScrollbar>
          <TableContainer sx={{maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {Object.keys(columns).map((name, index) => {
                      if (name === "date") {
                        return <TableCell key={index} sortDirection="desc" style={{ minWidth: 50 }}>
                            <Tooltip
                              enterDelay={300}
                              title={strings(`${strPrefix}.sort`)}
                            >
                              <TableSortLabel
                                active
                                direction="desc"
                              >
                                {columns[name]}
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                      }
                      return  <TableCell key={index} style={{ minWidth: 50 }}> 
                        {columns[name]}
                      </TableCell>
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      hover
                      key={index}
                    >
                        {Object.keys(item).map((field, index) => {
                            switch(field) {
                                case "date":
                                    return <TableCell key={index}>
                                    {format(item[field], 'dd/MM/yyyy')}
                                  </TableCell>
                                case "status":
                                    return <TableCell key={index}>
                                    <SeverityPill
                                      color={(item[field] === 'Подписан' && 'success')
                                      || (item[field] === 'refunded' && 'error')
                                      || 'warning'}
                                    >
                                      {item[field]}
                                    </SeverityPill>
                                  </TableCell>
                                default: 
                                    return <TableCell key={index}>
                                    {item[field]}
                                  </TableCell>
                            }
                        })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={items.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      )
}