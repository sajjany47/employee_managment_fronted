import * as React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TableData from "../../../components/TableData";
import { Button, Grid, Typography, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// interface Column {
//   id: "name" | "code" | "population" | "size" | "action";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ActivationKey() {
  const [open, setOpen] = React.useState(false);
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
    },
    { id: "action", label: "Action", minWidth: 170, align: "right" },
  ];

  const rows = [
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "Aus", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
  ];
  const a = rows.map((item) => ({
    ...item,
    action: <EditNoteIcon onClick={() => handleCheck(item)} />,
  }));
  const handleCheck = (item: object) => {
    console.log(item);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid xs={12} className="mt-5 flex justify-end">
          <Button variant="outlined" onClick={handleClickOpen}>
            Generate Activation Key
          </Button>
        </Grid>
        <Grid xs={12} className="mt-2">
          <Typography variant="h6" className="text-sm">
            Activation Key List
          </Typography>
          <TableData columns={columns} rows={a} />
        </Grid>
      </Grid>

      {/* Dialog */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Generate Activation Key
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
