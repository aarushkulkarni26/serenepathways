import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Input,
  Button,
  IconButton,
  Spacer,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext.js";
import { ArrowRightIcon } from "@chakra-ui/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATmux-wHxEHvUdjzi_41kGqQ8p44nIeKs",
  authDomain: "serenepathways.firebaseapp.com",
  projectId: "serenepathways",
  storageBucket: "serenepathways.appspot.com",
  messagingSenderId: "167463619095",
  appId: "1:167463619095:web:71c68adf72fe8c8e716a52",
  measurementId: "G-N2DXR7F171",
};

firebase.initializeApp(firebaseConfig);

const ChatComponent = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  // Reference to the Firestore collection
  const messagesRef = firebase.firestore().collection("messages");
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    // Subscribe to real-time updates of the messages collection
    const unsubscribe = messagesRef
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(updatedMessages);
      });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, [messagesRef]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a message",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Create a new message document in Firestore
      await messagesRef.add({
        text: newMessage,
        sender: authUser.user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(authUser);

      // Clear the input field after sending the message
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message, make sure you sign in!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error sending message", error.message);
    }
  };

  return (
    <Center height="100vh">
      <Box width="90%" maxWidth="800px">
        <Box bg="transparent" p={4}>
          <Heading as="h1" style={{ fontSize: "60px" }} textAlign="center">
            Serenity Support
          </Heading>
        </Box>

        <Grid
          templateColumns="1fr"
          gap={4}
          bg="transparent"
          p={4}
          borderRadius="md"
          boxShadow="md"
        >
          <Box overflowY="auto" height="calc(100vh - 250px)">
            {messages.map((message) => (
              <Flex align="center" my={2}>
                <Avatar name={message.sender} size="sm" mr={2} />
                <Box>
                  <Text fontWeight="bold">{message.sender}</Text>
                  <Text>{message.text}</Text>
                </Box>
              </Flex>
            ))}
            <Flex align="center">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                textColor={"black"}
                borderRadius="30px"
                bg="whiteAlpha.900"
                _focus={{ bg: "whiteAlpha.900" }}
                _placeholder={{ color: "gray.500" }}
                size="md"
                mr={2}
              />
              <IconButton
                icon={<ArrowRightIcon />}
                onClick={handleSendMessage}
                colorScheme="teal"
                borderRadius="md"
                disabled={!newMessage}
                bg="teal.400"
                _hover={{ bg: "teal.500" }}
                _active={{ bg: "teal.600" }}
                aria-label="Send Message"
                size="md"
              />
            </Flex>
          </Box>
        </Grid>
      </Box>
    </Center>
  );
};

export default ChatComponent;
