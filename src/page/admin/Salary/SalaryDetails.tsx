import { useParams } from "react-router-dom";
import { SalaryServices } from "./SalaryService";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { Box, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import moment from "moment";

const SalaryDetails = () => {
  const salaryService = new SalaryServices();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>({});
  const id = useParams();

  useEffect(() => {
    setLoading(true);
    salaryService
      .singleSalaryList(id.id)
      .then((res) => {
        setData(res.data.salaryHistory);
        setCurrentData({
          ...res.data.currentSalary,
          username: res.data.username,
        });
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (value: any) => (
        <span>{moment(value.date).format("MMM,YYYY")}</span>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: () => <span>{currentData.username}</span>,
    },
    {
      field: "ctc",
      headerName: "Gross Monthly",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "totalEarning",
      headerName: "Net Monthly",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },

    {
      field: "updatedBy",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
  ];
  console.log(data);
  return (
    <div>
      {" "}
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <h6>
            <strong>Salary Structure Details</strong>
          </h6>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Box>
            <DataGrid
              style={{
                height: data.length > 0 ? "100%" : 200,
                width: "100%",
              }}
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: ConfigData.pageSize,
                  },
                },
              }}
              pageSizeOptions={ConfigData.pageRow}
              localeText={{ noRowsLabel: "No Data Available!!!" }}
              // checkboxSelection
              // disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SalaryDetails;
