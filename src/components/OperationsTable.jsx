import {Table, TableBody, TableHead, TableRow, TableCell} from "@mui/material";

export default function OperationsTable({operations}){
    return(
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            operations.map((operation, i) => (
              <TableRow key={"Operation-Row-" + i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{operation.name}</TableCell>
                <TableCell>{operation.type == "EXPENSE" ? "-" : ""} {operation.amount}</TableCell>
                <TableCell>{operation.date}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
}