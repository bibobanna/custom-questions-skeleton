import React from "react";
import { useState } from "react";
import { executeCode } from "../api";
import { Button, Text, View } from "@instructure/ui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const notifyError = (message) => {
    toast.error(message || "Unable to run code", {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    setIsLoading(true);
    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
      if (result.stderr) {
        notifyError("An error occurred in execution.");
      }
    } catch (error) {
      console.log(error);
      notifyError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Button isLoading={isLoading} onClick={runCode} display="flex">
        Run Code
      </Button>
      <Text fontSize="large">Output:</Text> <br />
      <View // TODO: Change to View
        as="div"
        color={isError ? "alert" : "inverse-primary"}
        borderColor={isError ? "alert" : "inverse-primary"}
        borderWidth="medium"
        withFocusOutline={true}
        focusPosition={"inset"}
        borderRadius="medium"
        height={"10rem"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </View>
    </View>
  );
};
export default Output;
