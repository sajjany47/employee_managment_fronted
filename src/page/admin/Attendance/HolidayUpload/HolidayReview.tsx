import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { ConfigData } from "../../../../shared/ConfigData";

const HolidayReview = (props: any) => {
  const [rows, setRows] = React.useState<any>(props.data);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.holidayDate !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow: any = rows.find((row: any) => row.holidayDate === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.holidayDate !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row: any) =>
        row.holidayDate === newRow.holidayDate
          ? {
              holidayDate: newRow.holidayDate,
              reason: `${newRow.reason}`,
            }
          : row
      )
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "holidayDate", headerName: "Date", width: 250, type: "string" },
    {
      field: "reason",
      headerName: "Reason",
      type: "string",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 250,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

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
    },
  ];
  return (
    <>
      <Box
        sx={{
          height: 450,
          marginTop: 5,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          getRowId={(row) => row.holidayDate}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
                page: 1,
              },
            },
          }}
          pageSizeOptions={ConfigData.pageRow}
          localeText={{ noRowsLabel: "No Data Available!!!" }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          sx={{ mr: 1 }}
          onClick={() => props.handleBack()}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          onClick={() => {
            props.setData(rows);
            props.handleNext();
          }}
        >
          {"Next"}
        </Button>
      </Box>
    </>
  );
};

export default HolidayReview;
