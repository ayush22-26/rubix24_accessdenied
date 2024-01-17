import React, { useState, useContext } from "react";
import loader from '../assests/loader.gif';
import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase";
import { FaGoogle } from "react-icons/fa";
import { addUserToFirestore } from "../userFirestore";
import { UserContext } from "../App";
import '../App.css'

const Signup = () => {
    const localAuth = getAuth();
  const user = useContext(UserContext);
  console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const [formData, setFormData] = useState({
    signupName: "",
    signupEmail: "",
    signupPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoogleSignup = async (e) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result?.user;
        addUserToFirestore(user);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
  return (
    <>
      {!user ? (
        <Box
          bgImage={"/hand.jpg"}
          bgSize="cover"
          bgPosition="center"
          h="100vh"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Center h="100%" style={{ flex: 1 ,
            background:"linear-gradient(90deg, hsla(192, 95%, 50%, 1) 0%, hsla(225, 89%, 47%, 1) 100%)",
            borderEndEndRadius:"250px"
          }}>
            <Flex
              direction="column"
              bg="white"
              p="8"
              rounded="xl"
              shadow="lg"
              maxW="400px"
              w="100%"
            >
              <VStack spacing="4">
                <FormControl id="signupName" isRequired>
                  <FormLabel>Full Name </FormLabel>
                  <Input
                    type="text"
                    name="signupName"
                    value={formData.signupName}
                    onChange={handleInputChange}
                    placeholder="Eg. Shreyans Jain"
                  />
                </FormControl>
                <FormControl id="signupEmail" isRequired pb={2}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="signupEmail"
                    value={formData.signupEmail}
                    onChange={handleInputChange}
                    bg={"white"}
                    placeholder="Eg. shreyans@gmail.com"
                  />
                </FormControl>
                <FormControl id="signupPassword" isRequired pb={2}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="signupPassword"
                    value={formData.signupPassword}
                    onChange={handleInputChange}
                    bg={"white"}
                    placeholder="Min. 8 characters"
                  />
                </FormControl>
                <Button
                  bgColor="#3261ff"
                  color="white"
                  type="submit"
                  isLoading={isLoading}
                  width={"full"}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={handleGoogleSignup}
                  bgColor={"black"}
                  _hover={{ bgColor: "gray.800" }}
                  color={"white"}
                  leftIcon={<FaGoogle />}
                  width={"full"}
                >
                  Sign Up with Google
                </Button>
              </VStack>
              {signupMessage && (
                <Alert
                  status={
                    signupMessage.includes("successful") ? "success" : "error"
                  }
                  mt="4"
                >
                  <AlertIcon />
                  <AlertTitle mr={2}>
                    {signupMessage.includes("successful")
                      ? "Success!"
                      : "Error!"}
                  </AlertTitle>
                  <AlertDescription>{signupMessage}</AlertDescription>
                  <CloseButton
                    onClick={() => setSignupMessage("")}
                    position="absolute"
                    right="8px"
                    top="8px"
                  />
                </Alert>
              )}
            </Flex>
          </Center>
          <div className="left">
      <h1 style={{color:"#ffcf36", fontSize:"5.5rem",fontWeight:"bolder"}}>सह<span style={{color:"#3261ff"}}>AI</span>ता</h1>
      <img src={loader} alt="" style={{height:"350px" , width:"450px",marginTop:"10px"}} />
      </div>
          {/* <div
            style={{
              background: "linear-gradient(to bottom, blue, violet)",
              minHeight: "100vh",
              flex: 1,
              borderBottomLeftRadius: "15rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://imgs.search.brave.com/t6T_K2jQCMbz8q1W29jsrOec1J2QhnonZUv2ACDUAls/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9sb2dv/bWFzdGVyLmFpL2hz/LWZzL2h1YmZzL3do/aXRlLWxvZ28tY29j/YS1jb2xhLmpwZz93/aWR0aD0xNzAwJmhl/aWdodD0xMTQ4Jm5h/bWU9d2hpdGUtbG9n/by1jb2NhLWNvbGEu/anBn"
              alt=""
              style={{ width: "20rem" }}
            />
            <div style={{ fontSize: "3rem", fontWeight: 500 }}>Sahitya</div>
          </div> */}
        </Box>
      ) : (
        <button
        onClick={() => {
          localAuth.signOut(); 
          console.log("pressed");
        }}
      >
        LogOut
      </button>
      )}
    </>
  );
};

export default Signup;
