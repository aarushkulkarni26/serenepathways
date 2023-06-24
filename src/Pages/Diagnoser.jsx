import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  Heading,
} from "@chakra-ui/react";

const DepressionDiagnoser = () => {
  const [answers, setAnswers] = useState({});
  const [depression, setdepression] = useState(false);
  const toast = useToast();
  let dep = 0;
  const handleSubmit = () => {
    // Perform diagnosis based on answers and additionalInfo
    const diagnosisResult =
      "You should consult a doctor about a mental health condition.";

    // Display diagnosis result
    toast({
      title: "Diagnosis Result",
      description: diagnosisResult,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="md" mx="auto" py={6}>
      <Heading as="h1" mb={4}>
        Depression Diagnoser
      </Heading>

      <form>
        <Question question="Have you been feeling down, sad, or hopeless most of the time for the past few weeks?" />
        <Question question="Do you often experience excessive worry, anxiety, or nervousness that is difficult to control?" />
        <Question question="Have you had any thoughts of self-harm or suicide?" />
        <Question question="Do you frequently have difficulty concentrating or making decisions?" />
        <Question question="Are you experiencing significant changes in appetite or weight?" />

        <Button colorScheme="blue" onClick={handleSubmit}>
          Diagnose
        </Button>
      </form>
    </Box>
  );
};

function Question({ question }) {
  return (
    <div>
      <FormControl id="question1" mb={4}>
        <FormLabel>{question}</FormLabel>
        <RadioGroup>
          <Stack direction="row">
            <Radio value="option1">Yes</Radio>
            <Radio value="option2">No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default DepressionDiagnoser;
