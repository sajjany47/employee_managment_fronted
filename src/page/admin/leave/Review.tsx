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

export default function Review() {
  const [rows, setRows] = React.useState<any>([
    { username: "sajjany47", year: "2024", leave: 24 },
    { username: "sajjany", year: "2024", leave: 16 },
    { username: "sajjany4", year: "2024", leave: 18 },
    { username: "sajjany7", year: "2024", leave: 22 },
    { username: "sajjan", year: "2024", leave: 20 },
    { username: "sajjany74", year: "2024", leave: 14 },
    { username: "ajjany47", year: "2024", leave: 24 },
    { username: "sjjany", year: "2024", leave: 16 },
    { username: "sajany4", year: "2024", leave: 18 },
    { username: "saany7", year: "2024", leave: 22 },
    { username: "sajjn", year: "2024", leave: 20 },
    { username: "sny74", year: "2024", leave: 14 },
  ]);
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
    setRows(rows.filter((row: any) => row.username !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow: any = rows.find((row: any) => row.username === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.username !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row: any) => (row.username === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 180, editable: true },
    {
      field: "year",
      headerName: "year",
      type: "string",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "leave",
      headerName: "Leave",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 180,
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
    <Box
      sx={{
        height: 500,
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
        getRowId={(row) => row.username}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
