import React from "react";
import CodeEditor from "./components/CodeEditor";
import { View } from "@instructure/ui";

function App() {
  return (
    <View
      as="div"
      minHeight="100vh"
      padding="small"
      paddingX="medium"
      paddingY="medium"
    >
      <CodeEditor />
    </View>
  );
}

export default App;
