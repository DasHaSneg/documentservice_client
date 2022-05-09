import { Box, Button } from '@mui/material';
import {
    useGridApiRef,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { strings } from '../../../i18n';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    randomId,
} from '@mui/x-data-grid-generator';
import { useMemo, useRef } from 'react';


function EditToolbar(props) {
    const { apiRef } = props;
  
    const handleClick = () => {
      const id = randomId();
      console.log(apiRef)
      apiRef.current.updateRows([{ id, isNew: true }]);
      apiRef.current.startRowEditMode({ id });
  
      // Wait for the grid to render with the new row
      setTimeout(() => {
        apiRef.current.scrollToIndexes({
          rowIndex: apiRef.current.getRowsCount() - 1,
        });
  
        apiRef.current.setCellFocus(id, 'name');
      });
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
}

export const EditableTable = (props) => {
    const {strPrefix} = props;

    const columns = [
        { field: 'name', headerName: strings(`${strPrefix}.columns.name`), width: 180, editable: true },
        { field: 'amount', headerName: strings(`${strPrefix}.columns.amount`), width: 180, type: 'number', editable: true },
        { field: 'price', headerName: strings(`${strPrefix}.columns.price`), width: 180, type: 'number', editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
            //   const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
      
            //   if (isInEditMode) {
            //     return [
            //       <GridActionsCellItem
            //         icon={<SaveIcon />}
            //         label="Save"
            //         onClick={handleSaveClick(id)}
            //         color="primary"
            //       />,
            //       <GridActionsCellItem
            //         icon={<CancelIcon />}
            //         label="Cancel"
            //         className="textPrimary"
            //         onClick={handleCancelClick(id)}
            //         color="inherit"
            //       />,
            //     ];
            //   }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
        }
    ];  

    const apiRef = useGridApiRef();

    const rows = [
        {
          id: 1,
          name: "Карандаш",
          amount: 10,
          price: 100
        }
    ]

    // const totalColumns = columns.push({
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width: 100,
    //     cellClassName: 'actions',
    //     getActions: ({ id }) => {
    //       const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
  
    //       if (isInEditMode) {
    //         return [
    //           <GridActionsCellItem
    //             icon={<SaveIcon />}
    //             label="Save"
    //             onClick={handleSaveClick(id)}
    //             color="primary"
    //           />,
    //           <GridActionsCellItem
    //             icon={<CancelIcon />}
    //             label="Cancel"
    //             className="textPrimary"
    //             onClick={handleCancelClick(id)}
    //             color="inherit"
    //           />,
    //         ];
    //       }
  
    //       return [
    //         <GridActionsCellItem
    //           icon={<EditIcon />}
    //           label="Edit"
    //           className="textPrimary"
    //           onClick={handleEditClick(id)}
    //           color="inherit"
    //         />,
    //         <GridActionsCellItem
    //           icon={<DeleteIcon />}
    //           label="Delete"
    //           onClick={handleDeleteClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     },
    // })

    

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.startRowEditMode({ id });
    };

    const handleSaveClick = (id) => async (event) => {
        event.stopPropagation();
        await apiRef.current.stopRowEditMode({ id });
    };

    const handleDeleteClick = (id) => (event) => {
        event.stopPropagation();
        apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };

    const handleCancelClick = (id) => async (event) => {
        event.stopPropagation();
        await apiRef.current.stopRowEditMode({ id, ignoreModifications: true });

        const row = apiRef.current.getRow(id);
        if (row.isNew) {
            apiRef.current.updateRows([{ id, _action: 'delete' }]);
        }
    };

    const processRowUpdate = async (newRow) => {
        return { ...newRow, isNew: false };
    };

    return(
            <Box
        sx={{
            height: 500,
            width: '100%',
            '& .actions': {
            color: 'text.secondary',
            },
            '& .textPrimary': {
            color: 'text.primary',
            },
        }}
        >
        <DataGrid
            rows={rows}
            columns={columns}
            apiRef={apiRef}
            editMode="row"
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
                Toolbar: EditToolbar,
            }}
            componentsProps={{
                toolbar: { apiRef },
            }}
            experimentalFeatures={{ newEditingApi: true }}
        />
        </Box>
    )

}