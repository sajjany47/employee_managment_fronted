import { Box, Button, Grid, TextField } from "@mui/material";

const Attendance = () => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <h6>
                <strong>Attendance Details</strong>
              </h6>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Search"
                    id="outlined-size-small"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Button
                    variant="contained"
                    // startIcon={<AddIcon />}
                    // onClick={handleClickOpen}
                  >
                    Attendance
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
