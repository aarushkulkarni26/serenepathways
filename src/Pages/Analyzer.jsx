import React, { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import ml5 from "ml5";
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

const EmotionRecognition = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        loadModel();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    requestCameraPermission();
  }, []);

  const loadModel = async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/i64UJrSF6/"; // Replace with your Teachable Machine model URL
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const loadedModel = await tmImage.load(modelURL, metadataURL);
    setModel(loadedModel);

    startPrediction();
  };

  const startPrediction = () => {
    if (model && videoRef.current) {
      const classify = async () => {
        const prediction = await model.predict(videoRef.current);
        setPrediction(prediction);
        requestAnimationFrame(classify);
      };

      classify();
    }
  };

  const getEmotionLabel = () => {
    if (prediction) {
      const labels = [
        "Happy",
        "You Have Signs Of Depression",
        "You Have Signs Of Depression",
        "You Have Signs Of Depression",
      ];
      const maxProbability = Math.max(...prediction.map((p) => p.probability));
      const maxIndex = prediction.findIndex(
        (p) => p.probability === maxProbability
      );
      return labels[maxIndex];
    }
    return "Loading...";
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" p={4}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Depression Recognition
          </Text>
          <Box w="640px" h="480px" borderRadius="md" overflow="hidden">
            <video
              ref={videoRef}
              style={{ transform: "scale(-1, 1)" }}
              height="400"
            />
          </Box>
          <Text fontSize="lg">Current Emotion: {getEmotionLabel()}</Text>
          <Button colorScheme="blue" onClick={startPrediction}>
            Start Prediction
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default EmotionRecognition;
