import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/attendance/details");
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={7}>
              <h6>
                <strong>Attendance Details</strong>
              </h6>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={7}>
                  <TextField
                    label="Search"
                    id="outlined-size-small"
                    size="small"
                    // className="w-full"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <Button
                    variant="contained"
                    // startIcon={<AddIcon />}
                    onClick={handleClick}
                  >
                    My Attendance
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Attendance;
