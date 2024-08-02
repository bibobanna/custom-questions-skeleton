import React from "react";
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Box minH="100vh" bg="white" px={3} py={3}>
      {/* Change padding and colors later */}
      <CodeEditor />
    </Box>
  );
}

export default App;
