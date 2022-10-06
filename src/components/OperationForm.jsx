import { Button, Select, MenuItem, Box, TextField, FormControl, InputLabel } from "@mui/material";

export default function OperationForm({ operation, handleFormSubmit, handleInputChange }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <TextField id="outlined-basic"
        onChange={(e) => handleInputChange(e)}
        name="name"
        label="Operation Name"
        variant="outlined" />
      <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          name="type"
          value={operation.type}
          label="type"
          onChange={handleInputChange}
        >
          <MenuItem value={"INCOME"}>Income</MenuItem>
          <MenuItem value={"EXPENSE"}>Expense</MenuItem>
        </Select>
      </FormControl>
      <TextField onChange={(e) => handleInputChange(e)} id="outlined-basic" name="amount" label="Operation Amount" variant="outlined" />
      <div>
        <Button variant="contained" className="primary" type="submit">
          Enter Operation
        </Button>
      </div>
    </Box>
  )
}