import { useParams } from "react-router-dom";
import { SalaryServices } from "./SalaryService";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { Box, Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import moment from "moment";
import { useSelector } from "react-redux";

const SalaryDetails = () => {
  const salaryService = new SalaryServices();
  const [loading, setLoading] = useState(false);
  const userType = useSelector((state: any) => state.auth.auth.user);
  const [data, setData] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>({});
  const id = useParams();

  useEffect(() => {
    setLoading(true);
    salaryService
      .singleSalaryList(Object.keys(id).length > 0 ? id.id : userType.username)
      .then((res) => {
        if (res.data === null) {
          setData([]);
          setCurrentData({});
        } else {
          setData(res.data.salaryHistory);
          setCurrentData(res.data.currentSalary);
        }
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
        <span>{moment(value.date).format("DD MMM,YYYY")}</span>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: () => (
        <span>{Object.keys(id).length > 0 ? id.id : userType.username}</span>
      ),
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
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (value: any) => (
        <Chip
          color="success"
          label={value.value}
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },

    {
      field: "updatedBy",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
  ];

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
        <Grid item xs={12} sx={{ marginTop: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Basic Salary</strong>
              </h6>
              <small>{currentData.basicSalary}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>House Rent Allowance</strong>
              </h6>
              <small>{currentData.hra}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Travel Allowance</strong>
              </h6>
              <small>{currentData.travelAllowance}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Medical Allowance</strong>
              </h6>
              <small>{currentData.MedicalAllowance}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Leave Travel Allowance</strong>
              </h6>
              <small>{currentData.LeaveTravelAllowance}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Special Allowance</strong>
              </h6>
              <small>{currentData.SpecialAllowance}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Provident Fund</strong>
              </h6>
              <small>{currentData.providentFund}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Professional Tax</strong>
              </h6>
              <small>{currentData.professionalTax}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Income Tax</strong>
              </h6>
              <small>{currentData.incomeTax}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Health Insurance</strong>
              </h6>
              <small>{currentData.healthInsurance}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Net Monthly</strong>
              </h6>
              <small>{currentData.totalEarning}</small>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <h6>
                <strong>Gross Monthly</strong>
              </h6>
              <small>{currentData.ctc}</small>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 3 }}>
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
                    pageSize: 10,
                    page: 1,
                  },
                },
              }}
              pageSizeOptions={ConfigData.pageRow}
              localeText={{ noRowsLabel: "No Data Available!!!" }}
              // checkboxSelection
              //  disableRowSelectionOnClick
              onRowClick={(value) => {
                setCurrentData(value.row);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SalaryDetails;
