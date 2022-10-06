import { useState, useEffect } from "react"
import initialOperations from "./assets/constants/operations";
import OperationsTable from "./components/OperationsTable";
import { Button, Modal, Box, Typography, Grid } from "@mui/material";
import Container from '@mui/material/Container';
import OperationForm from "./components/OperationForm";

function App() {

  const [operations, setOperations] = useState(initialOperations);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [operation, setOperation] = useState({
    name: "",
    type: "INCOME",
    amount: 0,
  });

  useEffect(() => {
    function calculateNewTotal() {
      let newTotal = 0;
      for (let i = 0; i < operations.length; i++) {
        if (operations[i].type == "INCOME") {
          newTotal += parseInt(operations[i].amount);
        } else {
          newTotal -= parseInt(operations[i].amount);
        }
      }
      setTotal(newTotal);
    }
    calculateNewTotal();
  }, [operations]);

  function handleChange(e) {
    setOperation(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Verify that each property of the state is setted up correctly.
    // Validation Logic
    let { name, type, amount } = operation;
    if (name == "" || type == "" || (amount == "" || amount <= 0)) {
      console.log("Cannot Submit Empty Values or Negative Values");
      return;
    }
    // Put ID of the operation before pushing it into the state;
    // Put Date of the operation before pushing it into the state

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    date = `${month}/${day}/${year}`;

    const dummy = { ...operation, date }

    setOperations(prevOperations => [...prevOperations, dummy]);
    setOperation({
      name: "",
      type: "INCOME",
      amount: 0
    });
    setIsOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container sx={{ height: "97vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{backgroundColor: "white", width: "80% "}}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }} align="center" marginTop={10} marginBottom={5} variant="h3">Total: ${total}</Typography>
          </Grid>
          <Grid item xs={12} justifyContent={"center"}>
            <Button fullWidth={true} variant="contained" color="success" onClick={() => setIsOpen(true)}>Add Operation</Button>
          </Grid>
        </Grid>

        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <OperationForm
              operation={operation}
              handleSetOperation={setOperation}
              handleInputChange={handleChange}
              handleFormSubmit={handleSubmit}
            />
          </Box>
        </Modal>

        <OperationsTable operations={operations} />
      </Box>



    </Container>

  )
}

export default App
